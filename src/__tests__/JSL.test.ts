// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import JSL from '../JSL';
import { JSLParserError, ParserError } from '../Parser';

describe('JSL', () => {
  it('tests with valid jsl input', () => {
    const input = '.data[224].width';
    try {
      const program = JSL.compile(input);
      expect(program).toMatchSnapshot();
    } catch (e) {
      console.log(e);
      fail();
    }
  });

  it('tests with invalid jsl input', () => {
    const input = '..[]';
    let returnedError: Array<ParserError> = [];

    try {
      JSL.compile(input);
    } catch (e) {
      returnedError = (e as JSLParserError).getErrors();
    }

    if (returnedError.length < 0) {
      fail();
    }

    expect(returnedError.length).toEqual(4);
    const testCases = [
      new ParserError('expected next token to be Symbol(ident), got Symbol(.) instead'),
      new ParserError('expected next token to be Symbol(ident), got Symbol([) instead'),
      new ParserError('expected next token to be Symbol(int), got Symbol(]) instead'),
      new ParserError('prefix parse func for ] not found'),
    ];
    testCases.forEach((testCase, idx) => {
      expect(returnedError[idx].getMessage()).toEqual(testCase.getMessage());
    });
  });
});
