// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import { IToken as Token } from '../tokens';
import ASTExpression from './ASTExpression';

class ASTIndexExpression implements ASTExpression {
  token: Token;
  left: ASTExpression | null;
  index: ASTExpression | null;

  constructor(token: Token, left: ASTExpression | null, index: ASTExpression | null) {
    this.token = token;
    this.left = left;
    this.index = index;
  }

  toString(): string {
    if (!this.left || !this.index) {
      return '';
    }

    return `(${JSON.stringify(this.left, null, 2)}[${JSON.stringify(this.index, null, 2)}])`;
  }

  tokenLiteral(): string {
    return this.token.literal;
  }
}

export default ASTIndexExpression;
