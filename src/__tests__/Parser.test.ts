// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import Lexer from '../Lexer';
import Parser from '../Parser';
import ASTExpressionStatement from '../AST/ASTExpressionStatement';
import ASTSelectExpression from '../AST/ASTSelectExpression';
import ASTIndexExpression from '../AST/ASTIndexExpression';
import ASTIntegerLiteral from '../AST/ASTIntegerLiteral';
import { dot, int } from '../tokens';

describe('Parser', () => {
  it('tests with one statement', () => {
    const input = '.data';
    const l = new Lexer(input);
    const p = new Parser(l);
    const subject = p.parseProgram();
    expect(subject?.statements.length).toEqual(1);

    const exprStmt = subject?.statements[0] as ASTExpressionStatement;
    if (!exprStmt) {
      fail('first statement not ASTExpressionStatement');
    }
    expect(exprStmt.tokenLiteral()).toEqual('.');
    const expr = exprStmt.expression as ASTSelectExpression;
    if (!expr) {
      fail(`ExpressionStatement's expression is not SelectExpression`);
    }

    expect(expr.token.literal).toEqual('.');
    expect(expr.key).toEqual('data');
  });

  it('tests with two statements', () => {
    const input = '.data.images';
    const l = new Lexer(input);
    const p = new Parser(l);
    const subject = p.parseProgram();
    expect(subject?.statements.length).toEqual(2);

    const testCases = [
      ['.', 'data'],
      ['.', 'images'],
    ];
    testCases.forEach((testCase, idx) => {
      const exprStmt = subject?.statements[idx] as ASTExpressionStatement;
      if (!exprStmt) {
        fail('first statement not ASTExpressionStatement');
      }
      expect(exprStmt.tokenLiteral()).toEqual('.');
      const expr = exprStmt.expression as ASTSelectExpression;
      if (!expr) {
        fail(`ExpressionStatement's expression is not SelectExpression`);
      }

      expect(expr.token.literal).toEqual(testCase[0]);
      expect(expr.key).toEqual(testCase[1]);
    });
  });

  it('tests with errors', () => {
    const input = '..[]';
    const l = new Lexer(input);
    const p = new Parser(l);
    let returnedError: Array<string> = [];

    try {
      p.parseProgram();
    } catch (error: any) {
      returnedError = error;
    }

    if (returnedError.length < 0) {
      fail();
    }

    expect(returnedError.length).toEqual(4);
    const testCases = [
      'expected next token to be Symbol(ident), got Symbol(.) instead',
      'expected next token to be Symbol(ident), got Symbol([) instead',
      'expected next token to be Symbol(int), got Symbol(]) instead',
      'prefix parse func for ] not found',
    ];
    testCases.forEach((testCase, idx) => {
      expect(returnedError[idx]).toEqual(testCase);
    });
  });

  it('tests with index expression', () => {
    const input = '.images[224]';
    const l = new Lexer(input);
    const p = new Parser(l);
    const subject = p.parseProgram();

    const exprStmt = subject?.statements[0] as ASTExpressionStatement;
    if (!exprStmt) {
      fail('first statement not ASTExpressionStatement');
    }
    expect(exprStmt.tokenLiteral()).toEqual('.');
    const expr = exprStmt.expression as ASTIndexExpression;
    if (!expr) {
      fail(`ExpressionStatement's expression is not IndexExpression`);
    }
    const sel = expr.left as ASTSelectExpression;
    if (!sel) {
      fail(`index's left isn't ASTSelectExpression`);
    }
    const idx = expr.index as ASTIntegerLiteral;
    if (!idx) {
      fail(`index's index isn't ASTIntegerLiteral`);
    }

    expect(sel.key).toEqual('images');
    expect(sel.token.type).toEqual(dot);
    expect(idx.value).toEqual(224);
    expect(idx.token.type).toEqual(int);
  });

  it('tests with index expression complex', () => {
    const input = '.images[224].id';
    const l = new Lexer(input);
    const p = new Parser(l);
    const subject = p.parseProgram();

    const exprStmt = subject?.statements[0] as ASTExpressionStatement;
    if (!exprStmt) {
      fail('first statement not ASTExpressionStatement');
    }
    expect(exprStmt.tokenLiteral()).toEqual('.');
    const expr = exprStmt.expression as ASTIndexExpression;
    if (!expr) {
      fail(`ExpressionStatement's expression is not IndexExpression`);
    }
    const sel = expr.left as ASTSelectExpression;
    if (!sel) {
      fail(`index's left isn't ASTSelectExpression`);
    }
    const idx = expr.index as ASTIntegerLiteral;
    if (!idx) {
      fail(`index's index isn't ASTIntegerLiteral`);
    }
    const exprStmt2 = subject?.statements[1] as ASTExpressionStatement;
    if (!exprStmt2) {
      fail('first statement not ASTExpressionStatement');
    }
    expect(exprStmt2.tokenLiteral()).toEqual('.');
    const expr2 = exprStmt2.expression as ASTSelectExpression;
    if (!expr2) {
      fail(`ExpressionStatement's expression is not IndexExpression`);
    }

    expect(sel.key).toEqual('images');
    expect(sel.token.type).toEqual(dot);
    expect(idx.value).toEqual(224);
    expect(idx.token.type).toEqual(int);
    expect(expr2.token.literal).toEqual('.');
    expect(expr2.key).toEqual('id');
  });

  it('tests with index expression complex with zeroth index as input', () => {
    const input = '.images[0].id';
    const l = new Lexer(input);
    const p = new Parser(l);
    const subject = p.parseProgram();

    const exprStmt = subject?.statements[0] as ASTExpressionStatement;
    if (!exprStmt) {
      fail('first statement not ASTExpressionStatement');
    }
    expect(exprStmt.tokenLiteral()).toEqual('.');
    const expr = exprStmt.expression as ASTIndexExpression;
    if (!expr) {
      fail(`ExpressionStatement's expression is not IndexExpression`);
    }
    const sel = expr.left as ASTSelectExpression;
    if (!sel) {
      fail(`index's left isn't ASTSelectExpression`);
    }
    const idx = expr.index as ASTIntegerLiteral;
    if (!idx) {
      fail(`index's index isn't ASTIntegerLiteral`);
    }
    const exprStmt2 = subject?.statements[1] as ASTExpressionStatement;
    if (!exprStmt2) {
      fail('first statement not ASTExpressionStatement');
    }
    expect(exprStmt2.tokenLiteral()).toEqual('.');
    const expr2 = exprStmt2.expression as ASTSelectExpression;
    if (!expr2) {
      fail(`ExpressionStatement's expression is not IndexExpression`);
    }

    expect(sel.key).toEqual('images');
    expect(sel.token.type).toEqual(dot);
    expect(idx.value).toEqual(0);
    expect(idx.token.type).toEqual(int);
    expect(expr2.token.literal).toEqual('.');
    expect(expr2.key).toEqual('id');
  });

  it('tests with invalid index expression', () => {
    const input = '.data.images[something]';
    const l = new Lexer(input);
    const p = new Parser(l);
    let returnedError: Array<string> = [];

    try {
      p.parseProgram();
    } catch (error: any) {
      returnedError = error;
    }

    if (returnedError.length < 0) {
      fail();
    }

    expect(returnedError.length).toEqual(2);
    expect(returnedError[0]).toEqual(
      'expected next token to be Symbol(int), got Symbol(ident) instead',
    );
    expect(returnedError[1]).toEqual('prefix parse func for ] not found');
  });
});
