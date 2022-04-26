// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import ASTIndexExpression from '../AST/ASTIndexExpression';
import { lbracket } from '../tokens';

// Need to be completed
describe('ASTIndexExpression', () => {
  it('tests with token input', () => {
    const token = { type: lbracket, literal: '[' };
    const integerLiteral = 2;
    const astI = new ASTIndexExpression(token, token.type);
    expect(astI).toMatchInlineSnapshot();
  });

  it('tests if tokenLiteral returns literal of the token', () => {
    const astI = new ASTIndexExpression(token, token.literal);
    expect(astI.tokenLiteral()).toMatchInlineSnapshot();
  });
});
