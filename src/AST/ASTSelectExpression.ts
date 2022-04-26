// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import ASTExpression from './ASTExpression';
import { Token } from '../Lexer';

class ASTSelectExpression implements ASTExpression {
  token: Token;
  key: string;

  constructor(token: Token, key: string) {
    this.token = token;
    this.key = key;
  }

  getDescription(): string {
    return `${this.token.literal} ${this.key}`;
  }

  tokenLiteral(): string {
    const { literal = '' } = this.token || {};

    return literal;
  }
}

export default ASTSelectExpression;
