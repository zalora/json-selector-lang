// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import { Token } from '../tokens';
import ASTExpression from './ASTExpression';

class ASTIndexExpression implements ASTExpression {
  token: Token;
  left?: ASTExpression;
  index?: ASTExpression;

  constructor(token: Token, left?: ASTExpression, index?: ASTExpression) {
    this.token = token;
    this.left = left;
    this.index = index;
  }

  toString(): string {
    return `(${this.left?.toString()}[${this.index?.toString()}])`;
  }

  tokenLiteral(): string {
    return this.token.literal;
  }
}

export default ASTIndexExpression;
