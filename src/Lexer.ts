// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import { dot, int, ident, lbracket, rbracket, eof } from './Tokens';

interface Token {
  type: Symbol;
  literal: string;
}

// Lexer represents the lexical analyzer for JSON Selector Language
class Lexer {
  private input: Array<string> = [];
  private position: number = 0;
  private readPosition: number = 0;
  private currentCharacter: string = '';

  constructor(input: string) {
    this.input = Array.from(input);
    this.readChar();
  }

  //  nextToken returns the next lexed token for the given input
  public nextToken(): Token {
    const ch = this.currentCharacter;
    if (!ch) {
      return { type: eof, literal: '' };
    }

    let token: Token;

    switch (ch) {
      case '.':
        token = { type: dot, literal: ch };
        break;
      case '[':
        token = { type: lbracket, literal: ch };
        break;
      case ']':
        token = { type: rbracket, literal: ch };
        break;
      default:
        if (this.isNumeric(ch)) {
          const num = this.readNumber();
          return { type: int, literal: num };
        }
        return this.readIdentifier();
    }

    this.readChar();

    return token;
  }

  /**
   * readChar reads one character
   * Note that only ASCII is supported.
   */
  private readChar() {
    if (this.readPosition >= this.input.length) {
      this.currentCharacter = '';
    } else {
      this.currentCharacter = this.input[this.readPosition];
    }

    this.position = this.readPosition;
    this.readPosition += 1;
  }

  // isNumeric helps identify if the given string is a number or not
  private isNumeric = (n: string): boolean => {
    const num: number = parseFloat(n);

    return !isNaN(num) && isFinite(num);
  };

  // readIdentifier returns a token with an identifier as the literal
  private readIdentifier(): Token {
    let startIdx = this.position;
    while (this.isIdent(this.currentCharacter)) {
      this.readChar();
    }

    const identfier: Array<string> = this.input.slice(startIdx, this.position);
    const identStr: string = identfier.join('');

    return { type: ident, literal: identStr };
  }

  // readNumber returns a token with a numeric literal
  private readNumber(): string {
    let startIdx = this.position;
    while (this.isNumeric(this.currentCharacter)) {
      this.readChar();
    }

    const number: Array<string> = this.input.slice(startIdx, this.position);

    return number.join('');
  }

  // isIdent returns true if a character is not one of the other tokens
  private isIdent = (ch: string | null): boolean => {
    if (!ch) {
      return false;
    }

    return ch !== '.' && ch !== '[' && ch !== ']';
  };
}

export default Lexer;
