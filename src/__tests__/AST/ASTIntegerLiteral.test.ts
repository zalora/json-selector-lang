// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import ASTIntegerLiteral from '../../AST/ASTIntegerLiteral';
import { int } from '../../tokens';

describe('ASTIntegerLiteral', () => {
  const token = { type: int, literal: '2' };

  it('tests instance with token input', () => {
    const astInt = new ASTIntegerLiteral(token, parseInt(token.literal));
    expect(astInt).toMatchSnapshot();
  });

  it('tests toNumber returns value of the identifier', () => {
    const astInt = new ASTIntegerLiteral(token, parseInt(token.literal));
    expect(astInt.toNumber()).toMatchSnapshot();
  });

  it('tests tokenLiteral returns literal of the token', () => {
    const astInt = new ASTIntegerLiteral(token, parseInt(token.literal));
    expect(astInt.tokenLiteral()).toMatchSnapshot();
  });
});
