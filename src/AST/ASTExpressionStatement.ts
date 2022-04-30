// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import { IToken as Token } from '../tokens';
import ASTExpression from './ASTExpression';
import ASTStatement from './ASTStatement';

/**
 * ASTExpressionStatement is the base node for expression statements.
 * The "Select Expression" (e.g. `.<identifier>`) is an expression statement.
 */
class ASTExpressionStatement implements ASTStatement {
  token: Token;
  expression: ASTExpression | null;

  constructor(token: Token, expression: ASTExpression | null = null) {
    this.token = token;
    this.expression = expression;
  }

  toString(): string {
    if (!this.expression) {
      return '';
    }

    return JSON.stringify(this.expression, null, 2);
  }

  tokenLiteral(): string {
    return this.token.literal;
  }
}

export default ASTExpressionStatement;
