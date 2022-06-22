// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import Lexer from './Lexer';
import ASTExpression from './AST/ASTExpression';
import { lbracket, dot, ident, int, rbracket, eof, Token } from './tokens';
import ASTStatement from './AST/ASTStatement';
import ASTExpressionStatement from './AST/ASTExpressionStatement';
import ASTSelectExpression from './AST/ASTSelectExpression';
import ASTIndexExpression from './AST/ASTIndexExpression';
import ASTIntegerLiteral from './AST/ASTIntegerLiteral';
import ASTIdentifier from './AST/ASTIdentifier';
import Program from './AST/Program';

enum Precedence {
  lowest,
  index,
}

type PrefixParser = () => ASTExpression | undefined;

type InfixParser = (arg?: ASTExpression) => ASTExpression | undefined;

class Parser {
  private lexer: Lexer;
  private errors: string[] = [];

  private curToken!: Token;
  private peekToken!: Token;

  private prefixParseFuncs: Record<symbol, PrefixParser>;
  private infixParseFuncs: Record<symbol, InfixParser>;

  private precedenceMap: Record<symbol, Precedence> = {
    [lbracket]: Precedence.index,
  };

  constructor(lexer: Lexer) {
    this.lexer = lexer;
    this.prefixParseFuncs = {};
    this.infixParseFuncs = {};

    this.registerPrefix(this.parseSelectExpression.bind(this), dot);
    this.registerPrefix(this.parseIdentifier.bind(this), ident);
    this.registerPrefix(this.parseIntegerLiteral.bind(this), int);

    this.registerInfix(this.parseIndexExpression.bind(this), lbracket);

    this.nextToken();
    this.nextToken();
  }

  parseProgram(): Program {
    const program = new Program();

    while (!this.isCurToken(eof)) {
      const stmt = this.parseStatement();
      if (!stmt) {
        this.nextToken();
        continue;
      }

      program.statements.push(stmt);

      this.nextToken();
    }

    if (this.errors.length > 0) {
      throw this.errors;
    }

    return program;
  }

  // -- Token Handling --

  private nextToken(): void {
    this.curToken = this.peekToken;
    this.peekToken = this.lexer.nextToken();
  }

  private isCurToken(type: symbol): boolean {
    return this.curToken.type === type;
  }

  private isPeekToken(type: symbol): boolean {
    return this.peekToken.type === type;
  }

  private expectPeek(type: symbol): boolean {
    if (this.isPeekToken(type)) {
      this.nextToken();

      return true;
    } else {
      this.peekError(type);

      return false;
    }
  }

  private peekError(type: symbol): void {
    this.errors.push(
      `expected next token to be ${type.toString()}, got ${this.peekToken.type.toString()} instead`,
    );
  }

  private noPrefixParseFuncErr(type: string): void {
    this.errors.push(`prefix parse func for ${type} not found`);
  }

  // -- Precedence --

  private peekPrecedence(): Precedence {
    const precedence = this.precedenceMap[this.peekToken.type];
    if (!precedence) {
      return Precedence.lowest;
    }

    return precedence;
  }

  // -- Parsing --

  private parseStatement(): ASTStatement {
    return this.parseExpressionStatement();
  }

  private parseExpressionStatement(): ASTExpressionStatement {
    return new ASTExpressionStatement(this.curToken, this.parseExpression(Precedence.lowest));
  }

  private parseExpression(precedence: Precedence): ASTExpression | undefined {
    const fn = this.prefixParseFuncs[this.curToken.type];
    if (!fn) {
      this.noPrefixParseFuncErr(this.curToken.literal);

      return;
    }

    let leftExpr = fn();
    while (!this.isPeekToken(dot) && precedence < this.peekPrecedence()) {
      const infix = this.infixParseFuncs[this.peekToken.type];
      if (!infix) {
        return leftExpr;
      }

      this.nextToken();
      leftExpr = infix(leftExpr);
    }

    return leftExpr;
  }

  /**
   * A select expression is represented by the following grammar
   * .<identifier>
   */
  private parseSelectExpression(): ASTExpression | undefined {
    const tok = this.curToken;
    if (!this.expectPeek(ident)) {
      return;
    }

    return new ASTSelectExpression(tok, this.curToken.literal);
  }

  /**
   * An index expression is represented by the following grammar
   * [<integer literal>]
   */
  private parseIndexExpression(left?: ASTExpression): ASTExpression | undefined {
    const tok = this.curToken;

    if (!this.expectPeek(int)) {
      return;
    }

    const idx = this.parseExpression(Precedence.lowest);
    if (!this.expectPeek(rbracket)) {
      return;
    }

    return new ASTIndexExpression(tok, left, idx);
  }

  private parseIntegerLiteral(): ASTExpression | undefined {
    const value = parseInt(this.curToken.literal, 10);
    if (isNaN(value)) {
      this.errors.push(`could not parse ${this.curToken.literal} as integer`);

      return;
    }

    return new ASTIntegerLiteral(this.curToken, value);
  }

  private parseIdentifier(): ASTExpression {
    return new ASTIdentifier(this.curToken, this.curToken.literal);
  }

  private registerPrefix(fn: PrefixParser, type: symbol): void {
    this.prefixParseFuncs[type] = fn;
  }

  private registerInfix(fn: InfixParser, type: symbol): void {
    this.infixParseFuncs[type] = fn;
  }
}

export default Parser;
