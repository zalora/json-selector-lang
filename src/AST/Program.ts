// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import ASTNode from './ASTNode';

// Program is the root node of the abstract syntax tree representing the JSL input.
class Program implements ASTNode {
  statements: Array<ASTNode>;

  constructor() {
    this.statements = [];
  }

  tokenLiteral(): string {
    if (this.statements.length <= 0) {
      return '';
    }

    return this.statements[0]?.tokenLiteral() || '';
  }

  toString(): string {
    return this.statements.reduce((prev, next) => prev + `${next.toString()}`, '');
  }
}

export default Program;
