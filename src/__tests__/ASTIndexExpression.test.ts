// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import ASTIndexExpression from '../AST/ASTIndexExpression';
import ASTIntegerLiteral from '../AST/ASTIntegerLiteral';
import ASTSelectExpression from '../AST/ASTSelectExpression';
import { dot, int, lbracket } from '../tokens';

describe('ASTIndexExpression', () => {
  const tokenDot = { type: dot, literal: '.' };
  const tokenLbracket = { type: lbracket, literal: '[' };
  const tokenInt = { type: int, literal: '2' };
  const lExpr = new ASTSelectExpression(tokenDot, 'data');
  const rExpr = new ASTIntegerLiteral(tokenInt, 2);
  const selectExpr = new ASTIndexExpression(tokenLbracket, lExpr, rExpr);

  it('tests with token input', () => {
    expect(selectExpr).toMatchInlineSnapshot(`
      ASTIndexExpression {
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
      }
    `);
  });

  it('tests if tokenLiteral returns literal of the token', () => {
    expect(selectExpr.tokenLiteral()).toMatchInlineSnapshot(`"["`);
  });

  it('tests if toString returns returns a stringified index expression', () => {
    expect(selectExpr.toString()).toMatchInlineSnapshot(`
      "({
        \\"token\\": {
          \\"literal\\": \\".\\"
        },
        \\"key\\": \\"data\\"
      }[{
        \\"token\\": {
          \\"literal\\": \\"2\\"
        },
        \\"value\\": 2
      }])"
    `);
  });
});
