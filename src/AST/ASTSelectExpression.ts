// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import { Token } from '../tokens';
import ASTExpression from './ASTExpression';

class ASTSelectExpression implements ASTExpression {
  token: Token;
  key: string;

  constructor(token: Token, key: string) {
    this.token = token;
    this.key = key;
  }

  toString(): string {
    return `${this.token.literal.toString()}${this.key.toString()}`;
  }

  tokenLiteral(): string {
    return this.token.literal;
  }
}

export default ASTSelectExpression;
