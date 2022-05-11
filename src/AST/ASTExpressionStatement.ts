// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import { Token } from '../tokens';
import ASTExpression from './ASTExpression';
import ASTStatement from './ASTStatement';

/**
 * ASTExpressionStatement is the base node for expression statements.
 * The "Select Expression" (e.g. `.<identifier>`) is an expression statement.
 */
class ASTExpressionStatement implements ASTStatement {
  token: Token;
  expression?: ASTExpression;

  constructor(token: Token, expression?: ASTExpression) {
    this.token = token;
    this.expression = expression;
  }

  toString(): string {
    return this.expression?.toString() || '';
  }

  tokenLiteral(): string {
    return this.token.literal;
  }
}

export default ASTExpressionStatement;
