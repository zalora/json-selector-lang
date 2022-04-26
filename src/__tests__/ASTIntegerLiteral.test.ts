// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import ASTIntegerLiteral from '../AST/ASTIntegerLiteral';
import { int } from '../tokens';

describe('ASTIntegerLiteral', () => {
  const token = { type: int, literal: '2' };

  it('tests with token input', () => {
    const astI = new ASTIntegerLiteral(token, token.literal);
    expect(astI).toMatchInlineSnapshot(`
      ASTIntegerLiteral {
        "token": Object {
          "literal": "2",
          "type": Symbol(int),
        },
        "value": "2",
      }
    `);
  });

  it('tests if tokenLiteral returns literal of the token', () => {
    const astI = new ASTIntegerLiteral(token, token.literal);
    expect(astI.tokenLiteral()).toMatchInlineSnapshot(`"2"`);
  });

  it('tests if getDescription returns value', () => {
    const astI = new ASTIntegerLiteral(token, token.literal);
    expect(astI.getDescription()).toMatchInlineSnapshot(`"2"`);
  });
});
