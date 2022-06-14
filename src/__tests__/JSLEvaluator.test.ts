// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import JSL from '../JSL';
import JSLEvaluator from '../JSLEvaluator';

describe('JSLEvaluator', () => {
  it('tests with valid jsl input', () => {
    const input = '.data[2].width';
    const json = { data: [{}, {}, { width: 200 }] };
    try {
      const program = JSL.compile(input);
      if (program.statements.length <= 0) {
        throw 'JSL string generates empty statements';
      }

      const evaluator = new JSLEvaluator();
      const e = evaluator.evaluate(json, program);
      expect(e).toEqual(200);
    } catch (e: any) {
      console.log(e);
      fail();
    }
  });

  it('tests with invalid jsl input', () => {
    const input = '..[]';
    const json = { data: [{}, {}, { width: 200 }] };
    let returnedError: Array<string> = [];

    try {
      const program = JSL.compile(input);
      if (program.statements.length <= 0) {
        throw 'JSL string generates empty statements';
      }

      const evaluator = new JSLEvaluator();
      const e = evaluator.evaluate(json, program);
    } catch (e: any) {
      returnedError = e;
    }

    if (returnedError.length < 0) {
      fail();
    }

    expect(returnedError.length).toEqual(4);
    const testCases = [
      'expected next token to be Symbol(ident), got Symbol(.) instead',
      'expected next token to be Symbol(ident), got Symbol([) instead',
      'expected next token to be Symbol(int), got Symbol(]) instead',
      'prefix parse func for ] not found',
    ];
    testCases.forEach((testCase, idx) => {
      expect(returnedError[idx]).toEqual(testCase);
    });
  });
});
