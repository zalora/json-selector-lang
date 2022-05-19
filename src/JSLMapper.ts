// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import Program from './AST/Program';
import JSL from './JSL';
import JSLEvaluator from './JSLEvaluator';

class JSLMapper {
  static select(jsl: string, json: any) {
    const program: Program = JSL.compile(jsl);
    if (program.statements.length <= 0) {
      throw 'JSL string generates empty statements';
    }

    const evaluator = new JSLEvaluator();
    return evaluator.evaluate(json, program);
  }
}

export default JSLMapper;
