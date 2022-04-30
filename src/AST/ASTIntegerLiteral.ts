// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import { IToken as Token } from '../tokens';
import ASTExpression from './ASTExpression';

class ASTIntegerLiteral implements ASTExpression {
  token: Token;
  value: number;

  constructor(token: Token, value: number) {
    this.token = token;
    this.value = value;
  }

  toNumber(): number {
    return this.value;
  }

  tokenLiteral(): string {
    return this.token.literal;
  }
}

export default ASTIntegerLiteral;
