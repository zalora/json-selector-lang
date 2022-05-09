// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import Lexer from './Lexer';
import Program from './AST/Program';
import Parser from './Parser';

// JSL parses raw JSL input and returns a program that can be evaluated.
class JSL {
  static async compile(input: string): Promise<Program> {
    const lexer = new Lexer(input);
    const parser = new Parser(lexer);

    return parser.parseProgram();
  }
}

export default JSL;
