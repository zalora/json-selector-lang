// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import ASTExpressionStatement from '../AST/ASTExpressionStatement';
import ASTIndexExpression from '../AST/ASTIndexExpression';
import ASTIntegerLiteral from '../AST/ASTIntegerLiteral';
import ASTSelectExpression from '../AST/ASTSelectExpression';
import { dot, int, lbracket } from '../tokens';

describe('ASTExpressionStatement', () => {
  it('tests with token input as select expression', () => {
    const token = { type: dot, literal: '.' };
    const selectExpr = new ASTSelectExpression(token, 'data');
    const astExp = new ASTExpressionStatement(token, selectExpr);
    expect(astExp).toMatchInlineSnapshot(`
      ASTExpressionStatement {
        "expression": ASTSelectExpression {
          "key": "data",
          "token": Object {
            "literal": ".",
            "type": Symbol(.),
          },
        },
        "token": Object {
          "literal": ".",
          "type": Symbol(.),
        },
      }
    `);
  });

  it('tests if tokenLiteral returns literal of the token as select expression', () => {
    const token = { type: dot, literal: '.' };
    const selectExpr = new ASTSelectExpression(token, 'data');
    const astExp = new ASTExpressionStatement(token, selectExpr);
    expect(astExp.tokenLiteral()).toMatchInlineSnapshot(`"."`);
  });

  it('tests if toString returns returns a stringified select expression', () => {
    const token = { type: dot, literal: '.' };
    const selectExpr = new ASTSelectExpression(token, 'data');
    const astExp = new ASTExpressionStatement(token, selectExpr);
    expect(astExp.toString()).toMatchInlineSnapshot(`
      "{
        \\"token\\": {
          \\"literal\\": \\".\\"
        },
        \\"key\\": \\"data\\"
      }"
    `);
  });

  it('tests with token input as index expression', () => {
    const tokenDot = { type: dot, literal: '.' };
    const tokenLbracket = { type: lbracket, literal: '[' };
    const tokenInt = { type: int, literal: '2' };
    const lExpr = new ASTSelectExpression(tokenDot, 'data');
    const rExpr = new ASTIntegerLiteral(tokenInt, 2);
    const selectExpr = new ASTIndexExpression(tokenLbracket, lExpr, rExpr);
    const astExp = new ASTExpressionStatement(tokenLbracket, selectExpr);
    expect(astExp).toMatchInlineSnapshot(`
      ASTExpressionStatement {
        "expression": ASTIndexExpression {
          "index": ASTIntegerLiteral {
            "token": Object {
              "literal": "2",
              "type": Symbol(int),
            },
            "value": 2,
          },
          "left": ASTSelectExpression {
            "key": "data",
            "token": Object {
              "literal": ".",
              "type": Symbol(.),
            },
          },
          "token": Object {
            "literal": "[",
            "type": Symbol([),
          },
        },
        "token": Object {
          "literal": "[",
          "type": Symbol([),
        },
      }
    `);
  });

  it('tests if tokenLiteral returns literal of the token as index expression', () => {
    const tokenDot = { type: dot, literal: '.' };
    const tokenLbracket = { type: lbracket, literal: '[' };
    const tokenInt = { type: int, literal: '2' };
    const lExpr = new ASTSelectExpression(tokenDot, 'data');
    const rExpr = new ASTIntegerLiteral(tokenInt, 2);
    const selectExpr = new ASTIndexExpression(tokenLbracket, lExpr, rExpr);
    const astExp = new ASTExpressionStatement(tokenLbracket, selectExpr);
    expect(astExp.tokenLiteral()).toMatchInlineSnapshot(`"["`);
  });

  it('tests if toString returns returns a stringified index expression', () => {
    const tokenDot = { type: dot, literal: '.' };
    const tokenLbracket = { type: lbracket, literal: '[' };
    const tokenInt = { type: int, literal: '2' };
    const lExpr = new ASTSelectExpression(tokenDot, 'data');
    const rExpr = new ASTIntegerLiteral(tokenInt, 2);
    const selectExpr = new ASTIndexExpression(tokenLbracket, lExpr, rExpr);
    const astExp = new ASTExpressionStatement(tokenLbracket, selectExpr);
    expect(astExp.toString()).toMatchInlineSnapshot(`
      "{
        \\"token\\": {
          \\"literal\\": \\"[\\"
        },
        \\"left\\": {
          \\"token\\": {
            \\"literal\\": \\".\\"
          },
          \\"key\\": \\"data\\"
        },
        \\"index\\": {
          \\"token\\": {
            \\"literal\\": \\"2\\"
          },
          \\"value\\": 2
        }
      }"
    `);
  });
});
