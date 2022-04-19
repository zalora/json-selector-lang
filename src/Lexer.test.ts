// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import Lexer, { Token } from './Lexer';
import { dot, int, ident, lbracket, rbracket, illegal } from './Tokens';

describe('Lexer', () => {
  it('tests with empty input', () => {
    const input = '';
    const testCase = { type: illegal, literal: '' };
    const l = Lexer(input);

    const token = l.next().value;
    expect(token).toMatchObject(testCase);
  });

  it('tests with one key', () => {
    const input = '.data';
    const testCases = [
      { type: dot, literal: '.' },
      { type: ident, literal: 'data' },
    ];
    const l = Lexer(input);

    testCases.forEach((testCase) => {
      const token = l.next().value;
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
    ];
    const l = Lexer(input);

    testCases.forEach((testCase) => {
      const token = l.next().value;
      expect(token).toMatchObject(testCase);
    });
  });

  it('tests with indexed keys', () => {
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
    ];
    const l = Lexer(input);

    testCases.forEach((testCase) => {
      const token = l.next().value;
      expect(token).toMatchObject(testCase);
    });
  });
});
