// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import ASTSelectExpression from '../../AST/ASTSelectExpression';
import { ident } from '../../tokens';

describe('ASTSelectExpression', () => {
  const token = { type: ident, literal: 'data' };

  it('tests instance with token input', () => {
    const astSelectExp = new ASTSelectExpression(token, token.literal);
    expect(astSelectExp).toMatchSnapshot();
  });

  it('tests toString returns value of the identifier', () => {
    const astSelectExp = new ASTSelectExpression(token, token.literal);
    expect(astSelectExp.toString()).toMatchSnapshot();
  });

  it('tests if tokenLiteral returns literal of the token', () => {
    const astSelectExp = new ASTSelectExpression(token, token.literal);
    expect(astSelectExp.tokenLiteral()).toMatchSnapshot();
  });
});
