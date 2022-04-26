// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import ASTExpression from './ASTExpression';
import { Token } from '../Lexer';

class ASTIndexExpression implements ASTExpression {
  token: Token;
  left: ASTExpression;
  index: ASTExpression;

  constructor(token: Token, left: ASTExpression, index: ASTExpression) {
    this.token = token;
    this.left = left;
    this.index = index;
  }

  getDescription(): string {
    const { description: leftDesc = '' } = this.left || {};
    const { description: indexDesc = '' } = this.index || {};

    if (!leftDesc || !indexDesc) {
      return '';
    }

    return `(${this.left.description}[${this.index.description}])`;
  }

  tokenLiteral(): string {
    const { literal = '' } = this.token || {};

    return literal;
  }
}

export default ASTIndexExpression;
