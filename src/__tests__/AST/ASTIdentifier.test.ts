// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import ASTIdentifier from '../../AST/ASTIdentifier';
import { ident } from '../../tokens';

describe('ASTIdentifier', () => {
  const token = { type: ident, literal: 'data' };

  it('tests instance with token input', () => {
    const astIdent = new ASTIdentifier(token, token.literal);
    expect(astIdent).toMatchSnapshot();
  });

  it('tests toString returns value of the identifier', () => {
    const astIdent = new ASTIdentifier(token, token.literal);
    expect(astIdent.toString()).toMatchSnapshot();
  });

  it('tests tokenLiteral returns literal of the token', () => {
    const astIdent = new ASTIdentifier(token, token.literal);
    expect(astIdent.tokenLiteral()).toMatchSnapshot();
  });
});
