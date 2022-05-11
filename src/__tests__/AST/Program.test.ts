// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import Lexer from '../../Lexer';
import Program from '../../AST/Program';
import ASTSelectExpression from '../../AST/ASTSelectExpression';
import ASTIntegerLiteral from '../../AST/ASTIntegerLiteral';
import ASTIndexExpression from '../../AST/ASTIndexExpression';

describe('Program', () => {
  const inputSelect = '.data';
  const lSelect = new Lexer(inputSelect);
  const pSelect = new Program();
  const tokenFirst = lSelect.nextToken();
  const tokenSecond = lSelect.nextToken();
  const selectExpr = new ASTSelectExpression(tokenFirst, tokenSecond.literal);
  pSelect.statements.push(selectExpr);

  it('tests with token input as select expression', () => {
    expect(pSelect).toMatchSnapshot();
  });

  it('tests if tokenLiteral returns literal for token input as select expression', () => {
    expect(pSelect.tokenLiteral()).toMatchSnapshot();
  });

  it('tests if toString returns all the list of statements for token input as select expression', () => {
    expect(pSelect.toString()).toMatchSnapshot();
  });

  const inputIndex = '.images[2]';
  const lIndex = new Lexer(inputIndex);
  const pIndex = new Program();
  const tokenDot = lIndex.nextToken();
  const tokenIdent = lIndex.nextToken();
  const tokenLbracket = lIndex.nextToken();
  const tokenInt = lIndex.nextToken();
  const lExpr = new ASTSelectExpression(tokenDot, tokenIdent.literal);
  const rExpr = new ASTIntegerLiteral(tokenInt, 2);
  const indexExpr = new ASTIndexExpression(tokenLbracket, lExpr, rExpr);
  pIndex.statements.push(indexExpr);

  it('tests with token input as index expression', () => {
    expect(pIndex).toMatchSnapshot();
  });

  it('tests if tokenLiteral returns literal for token input as index expression', () => {
    expect(pIndex.tokenLiteral()).toMatchSnapshot();
  });

  it('tests if toString returns all the list of statements for token input as index expression', () => {
    expect(pIndex.toString()).toMatchSnapshot();
  });
});
