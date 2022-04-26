// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import ASTIdentifier from '../AST/ASTIdentifier';
import { ident } from '../tokens';

describe('ASTIdentifier', () => {
  const token = { type: ident, literal: 'data' };

  it('tests with token input', () => {
    const astI = new ASTIdentifier(token, token.literal);
    expect(astI).toMatchInlineSnapshot(`
      ASTIdentifier {
        "token": Object {
          "literal": "data",
          "type": Symbol(ident),
        },
        "value": "data",
      }
    `);
  });

  it('tests if tokenLiteral returns literal of the token', () => {
    const astI = new ASTIdentifier(token, token.literal);
    expect(astI.tokenLiteral()).toMatchInlineSnapshot(`"data"`);
  });
});
