// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import ASTExpression from './ASTExpression';
import { Token } from '../Lexer';

class ASTIntegerLiteral implements ASTExpression {
  token: Token;
  value: string;

  constructor(token: Token, value: string) {
    this.token = token;
    this.value = value;
  }

  getDescription(): string {
    return this.value || '';
  }

  tokenLiteral(): string {
    const { literal = '' } = this.token || {};

    return literal;
  }
}

export default ASTIntegerLiteral;
