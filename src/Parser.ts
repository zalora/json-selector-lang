// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import Lexer from './Lexer';
import ASTExpression from './AST/ASTExpression';
import { IToken as Token, lbracket, dot, ident, int, rbracket, eof } from './tokens';
import ASTStatement from './AST/ASTStatement';
import ASTExpressionStatement from './AST/ASTExpressionStatement';
import ASTSelectExpression from './AST/ASTSelectExpression';
import ASTIndexExpression from './AST/ASTIndexExpression';
import ASTIntegerLiteral from './AST/ASTIntegerLiteral';
import ASTIdentifier from './AST/ASTIdentifier';
import Program from './AST/Program';

enum Precedence {
  lowest,
  prefix, // -x or !x
  index, // arr[index]
}

type PrefixParser = () => ASTExpression | null;

type InfixParser = (arg: ASTExpression) => ASTExpression;

interface ParserCollection<Parser> {
  [key: symbol]: Parser;
}

class Parser {
  private lexer: Lexer;
  private errors: Array<string> = [];

  private curToken!: Token;
  private peekToken!: Token;

  private prefixParseFuncs: ParserCollection<PrefixParser>;
  private infixParseFuncs: ParserCollection<InfixParser>;

  private precedenceMap: {
    [key: symbol]: Precedence;
  } = {
    [lbracket]: Precedence.index,
  };

  constructor(lexer: Lexer) {
    this.lexer = lexer;
    this.prefixParseFuncs = {};
    this.infixParseFuncs = {};

    this.registerPrefix(this.parseSelectExpression, dot);
    this.registerPrefix(this.parseIdentifier, ident);
    this.registerPrefix(this.parseIntegerLiteral, int);

    this.registerInfix(this.parseIndexExpression, lbracket);

    this.nextToken();
    this.nextToken();
  }

  public parseProgram(): Program {
    let program = new Program();

    while (!this.isCurToken(eof)) {
      const stmt = this.parseStatement();
      if (!stmt) {
        this.nextToken();
        continue;
      }

      program.statements.push(stmt);

      this.nextToken();
    }

    if (this.errors.length >= 0) {
      this.errors.forEach((err) => {
        throw new Error(err);
      });
    }

    return program;
  }

  // -- Token Handling --

  private nextToken() {
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

  private peekError(type: symbol) {
    this.errors.push(
      `expected next token to be ${type.toString()}, got ${this.peekToken.type.toString()} instead`,
    );
  }

  noPrefixParseFuncErr(type: String) {
    this.errors.push(`prefix parse func for ${type.toString()} not found`);
  }

  // -- Precedence --

  private peekPrecedence(): Precedence {
    const precedence = this.precedenceMap[this.peekToken.type];
    if (!precedence) {
      return Precedence.lowest;
    }

    return precedence;
  }

  private curPrecedence(): Precedence {
    const precedence = this.precedenceMap[this.curToken.type];
    if (!precedence) {
      return Precedence.lowest;
    }

    return precedence;
  }

  // -- Parsing --

  private parseStatement(): ASTStatement | null {
    // JSL only has one type of statement right now.
    return this.parseExpressionStatement();
  }

  private parseExpressionStatement(): ASTExpressionStatement | null {
    return new ASTExpressionStatement(this.curToken, this.parseExpression(Precedence.lowest));
  }

  private parseExpression(precedence: Precedence): ASTExpression | null {
    const fn = this.prefixParseFuncs[this.curToken.type];
    if (!fn) {
      this.noPrefixParseFuncErr(this.curToken.literal);

      return null;
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

  private parsePrefixExpression(): ASTExpression | null {
    const tok = this.curToken;
    const lit = this.curToken.literal;

    this.nextToken();

    return new ASTPrefixExpression(tok, lit, this.parseExpression(Precedence.prefix));
  }

  private parseInfixExpression(left: ASTExpression): ASTExpression | null {
    const tok = this.curToken;
    const op = this.curToken.literal;
    const prec = this.curPrecedence();

    this.nextToken();

    return new ASTInfixExpression(tok, left, op, this.parseExpression(prec));
  }

  /// A select expression is represented by the following grammar
  /// .<identifier>
  private parseSelectExpression(): ASTExpression | null {
    const tok = this.curToken;
    if (!this.expectPeek(ident)) {
      return null;
    }

    return new ASTSelectExpression(tok, this.curToken.literal);
  }

  /// An index expression is represented by the following grammar
  /// [<integer literal>]
  private parseIndexExpression(left: ASTExpression | null): ASTExpression | null {
    const tok = this.curToken;
    if (!left) {
      return null;
    }

    if (!this.expectPeek(int)) {
      return null;
    }

    let idx = this.parseExpression(Precedence.lowest);
    if (!this.expectPeek(rbracket)) {
      return null;
    }

    return new ASTIndexExpression(tok, left, idx);
  }

  private parseIntegerLiteral(): ASTExpression | null {
    const value = parseInt(this.curToken.literal);
    if (!value) {
      this.errors.push(`could not parse ${this.curToken.literal} as integer`);

      return null;
    }

    return new ASTIntegerLiteral(this.curToken, value);
  }

  private parseIdentifier(): ASTExpression | null {
    return new ASTIdentifier(this.curToken, this.curToken.literal);
  }

  private registerPrefix(fn: PrefixParser, type: symbol) {
    this.prefixParseFuncs[type] = fn;
  }

  private registerInfix(fn: InfixParser, type: symbol) {
    this.infixParseFuncs[type] = fn;
  }
}

export default Parser;
