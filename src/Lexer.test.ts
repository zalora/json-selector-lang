// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import Lexer from './Lexer';
import { dot, int, ident, lbracket, rbracket, eof } from './tokens';

describe('Lexer', () => {
  it('tests with empty input', () => {
    const input = '';
    const testCase = { type: eof, literal: '' };
    const l = new Lexer(input);

    const token = l.nextToken();
    expect(token).toMatchObject(testCase);
  });

  it('tests with one key', () => {
    const input = '.data';
    const testCases = [
      { type: dot, literal: '.' },
      { type: ident, literal: 'data' },
      { type: eof, literal: '' },
    ];
    const l = new Lexer(input);

    testCases.forEach((testCase) => {
      const token = l.nextToken();
      expect(token).toMatchObject(testCase);
    });
  });

  it('tests with multiple keys', () => {
    const input = '.data.items[]';
    const testCases = [
      { type: dot, literal: '.' },
      { type: ident, literal: 'data' },
      { type: dot, literal: '.' },
      { type: ident, literal: 'items' },
      { type: lbracket, literal: '[' },
      { type: rbracket, literal: ']' },
      { type: eof, literal: '' },
    ];
    const l = new Lexer(input);

    testCases.forEach((testCase) => {
      const token = l.nextToken();
      expect(token).toMatchObject(testCase);
    });
  });

  it('tests with single digit indexed key', () => {
    const input = '.data.items[2].image';
    const testCases = [
      { type: dot, literal: '.' },
      { type: ident, literal: 'data' },
      { type: dot, literal: '.' },
      { type: ident, literal: 'items' },
      { type: lbracket, literal: '[' },
      { type: int, literal: '2' },
      { type: rbracket, literal: ']' },
      { type: dot, literal: '.' },
      { type: ident, literal: 'image' },
      { type: eof, literal: '' },
    ];
    const l = new Lexer(input);

    testCases.forEach((testCase) => {
      const token = l.nextToken();
      expect(token).toMatchObject(testCase);
    });
  });

  it('tests with multi digit indexed key', () => {
    const input = '.data.items[12].image';
    const testCases = [
      { type: dot, literal: '.' },
      { type: ident, literal: 'data' },
      { type: dot, literal: '.' },
      { type: ident, literal: 'items' },
      { type: lbracket, literal: '[' },
      { type: int, literal: '12' },
      { type: rbracket, literal: ']' },
      { type: dot, literal: '.' },
      { type: ident, literal: 'image' },
      { type: eof, literal: '' },
    ];
    const l = new Lexer(input);

    testCases.forEach((testCase) => {
      const token = l.nextToken();
      expect(token).toMatchObject(testCase);
    });
  });
});
