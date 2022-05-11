// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import ASTExpressionStatement from '../../AST/ASTExpressionStatement';
import ASTIndexExpression from '../../AST/ASTIndexExpression';
import ASTIntegerLiteral from '../../AST/ASTIntegerLiteral';
import ASTSelectExpression from '../../AST/ASTSelectExpression';
import { dot, int, lbracket } from '../../tokens';

describe('ASTExpressionStatement', () => {
  const token = { type: dot, literal: '.' };
  const selectExpr = new ASTSelectExpression(token, 'data');
  const astExpSelect = new ASTExpressionStatement(token, selectExpr);

  it('tests with token input as select expression', () => {
    expect(astExpSelect).toMatchSnapshot();
  });

  it('tests if tokenLiteral returns literal of the token as select expression', () => {
    expect(astExpSelect.tokenLiteral()).toMatchSnapshot();
  });

  it('tests if toString returns returns a stringified select expression', () => {
    expect(astExpSelect.toString()).toMatchSnapshot();
  });

  const tokenDot = { type: dot, literal: '.' };
  const tokenLbracket = { type: lbracket, literal: '[' };
  const tokenInt = { type: int, literal: '2' };
  const lExpr = new ASTSelectExpression(tokenDot, 'data');
  const rExpr = new ASTIntegerLiteral(tokenInt, 2);
  const indexExpr = new ASTIndexExpression(tokenLbracket, lExpr, rExpr);
  const astExpIndex = new ASTExpressionStatement(tokenLbracket, indexExpr);

  it('tests with token input as index expression', () => {
    expect(astExpIndex).toMatchSnapshot();
  });

  it('tests if tokenLiteral returns literal of the token as index expression', () => {
    expect(astExpIndex.tokenLiteral()).toMatchSnapshot();
  });

  it('tests if toString returns returns a stringified index expression', () => {
    expect(astExpIndex.toString()).toMatchSnapshot();
  });
});
