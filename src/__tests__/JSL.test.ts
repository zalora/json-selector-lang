// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import JSL from '../JSL';

describe('JSL', () => {
  it('tests with valid & complex jsl input', () => {
    const input = '.data[224].width';
    const data = [];
    data.length = 230;
    data[224] = { width: 20 };
    const json = { data };

    try {
      const program = JSL.compile(input);
      const width = JSL.evaluate(json, program);

      expect(program).toMatchSnapshot();
      expect(width).toMatchSnapshot();
    } catch (e: any) {
      console.log(e);
      fail();
    }
  });

  it('tests with valid jsl input', () => {
    const input = '.data[2].width';
    const json = { data: [{}, {}, { width: 200 }] };

    try {
      const program = JSL.compile(input);
      const width = JSL.evaluate(json, program);

      expect(program).toMatchSnapshot();
      expect(width).toMatchSnapshot();
    } catch (e: any) {
      console.log(e);
      fail();
    }
  });

  it('tests with invalid jsl input', () => {
    const input = '..[]';
    let returnedError: Array<string> = [];

    try {
      JSL.compile(input);
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
