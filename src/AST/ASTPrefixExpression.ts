// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import { IToken as Token } from '../tokens';
import ASTExpression from './ASTExpression';

class ASTPrefixExpression implements ASTExpression {
  token: Token;
  oper: String;
  right: ASTExpression | null;

  constructor(token: Token, oper: String, right: ASTExpression | null = null) {
    this.token = token;
    this.oper = oper;
    this.right = right;
  }

  toString(): string {
    if (!this.right) {
      return '';
    }

    return `${this.oper}${JSON.stringify(this.right, null, 2)}`;
  }

  tokenLiteral(): string {
    return this.token.literal;
  }
}

export default ASTPrefixExpression;
