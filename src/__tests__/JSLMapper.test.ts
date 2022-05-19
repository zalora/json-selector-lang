// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import JSLMapper from '../JSLMapper';
import JSL from '../JSL';
import JSLEvaluator from '../JSLEvaluator';

describe('JSL', () => {
  it('tests with valid complex jsl input', () => {
    const input = '.data[2].width';
    const json = { data: [{}, {}, { width: 200 }] };
    try {
      const width = JSLMapper.select(input, json);
      expect(width).toEqual(200);
    } catch (e: any) {
      console.log(e);
      fail();
    }
  });

  it('tests with valid simple jsl input', () => {
    const input = '.data.image.width';
    const json = { data: { image: { width: 500 } } };
    try {
      const width = JSLMapper.select(input, json);
      expect(width).toEqual(500);
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
