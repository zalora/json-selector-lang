// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import ASTExpression from './ASTExpression';
import ASTStatement from './ASTStatement';
import { Token } from '../Lexer';

/**
 * ASTExpressionStatement is the base node for expression statements.
 * The "Select Expression" (e.g. `.<identifier>`) is an expression statement.
 */
class ASTExpressionStatement implements ASTStatement {
  token: Token;
  expression: ASTExpression;

  constructor(token: Token, expression: ASTExpression) {
    this.token = token;
    this.expression = expression;
  }

  getDescription(): string {
    const { description = '' } = this.expression || {};

    return description;
  }

  tokenLiteral(): string {
    const { literal = '' } = this.token || {};

    return literal;
  }
}

export default ASTExpressionStatement;
