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

  it('tests with valid jsl input and all falsy values as the output', () => {
    const testCases = [
      { input: '.data[0].width', output: false },
      { input: '.data[1].width', output: null },
      { input: '.data[2].width', output: undefined },
      { input: '.data[3].width', output: NaN },
      { input: '.data[4].width', output: 0 },
      { input: '.data[5].width', output: '' },
    ];
    const json = {
      data: [
        { width: false },
        { width: null },
        { width: undefined },
        { width: NaN },
        { width: 0 },
        { width: '' },
      ],
    };

    testCases.forEach(({ input, output }) => {
      try {
        const program = JSL.compile(input);
        if (program.statements.length <= 0) {
          throw 'JSL string generates empty statements';
        }

        const evaluator = new JSLEvaluator();
        const e = evaluator.evaluate(json, program);
        expect(e).toEqual(output);
      } catch (e: any) {
        console.log(e);
        fail();
      }
    });
  });

  it(`tests with valid jsl input and no data in the input object`, () => {
    const input = '.data[2].width';
    const json = { data: [{}, {}, {}] };
    let returnedError: string = '';

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

    if (!returnedError) {
      fail();
    }

    const testCase = new Error('Key not found in the json: width');
    expect(returnedError).toEqual(testCase);
  });

  it('tests with invalid jsl input', () => {
    const input = '..[]';
    const json = { data: [{}, {}, { width: 200 }] };
    let returnedError: string[] = [];

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

  it('tests with valid jsl input', () => {
    const input = '';
    const json = { data: [{}, {}, { width: 200 }] };
    try {
      const program = JSL.compile(input);
      const evaluator = new JSLEvaluator();
      const e = evaluator.evaluate(json, program);

      expect(e).toBeNull();
    } catch (e: any) {
      console.log(e);
      fail();
    }
  });
});
