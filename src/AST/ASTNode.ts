// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

interface ASTNode {
  tokenLiteral(): string;
  description?: string;
}

export default ASTNode;
