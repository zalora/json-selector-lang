// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import ASTIndexExpression from '../../AST/ASTIndexExpression';
import ASTIntegerLiteral from '../../AST/ASTIntegerLiteral';
import ASTSelectExpression from '../../AST/ASTSelectExpression';
import { dot, int, lbracket } from '../../tokens';

describe('ASTIndexExpression', () => {
  const tokenDot = { type: dot, literal: '.' };
  const tokenLbracket = { type: lbracket, literal: '[' };
  const tokenInt = { type: int, literal: '2' };
  const lExpr = new ASTSelectExpression(tokenDot, 'data');
  const rExpr = new ASTIntegerLiteral(tokenInt, 2);
  const indexExpr = new ASTIndexExpression(tokenLbracket, lExpr, rExpr);

  it('tests with token input', () => {
    expect(indexExpr).toMatchSnapshot();
  });

  it('tests if tokenLiteral returns literal of the token', () => {
    expect(indexExpr.tokenLiteral()).toMatchSnapshot();
  });

  it('tests if toString returns returns a stringified index expression', () => {
    expect(indexExpr.toString()).toMatchSnapshot();
  });
});
