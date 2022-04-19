// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import { dot, int, ident, lbracket, rbracket, eof, illegal } from './Tokens';

interface Token {
  type: Symbol;
  literal: string;
}

let position: number;

// Performs lexical analysis on raw string input.
function* Lexer(input: string) {
  const inputAsArr: Array<string> = Array.from(input);
  inputAsArr.push(eof.toString());

  for (position = 0; position < inputAsArr.length; position++) {
    const str: string = inputAsArr[position];
    const token = identifyLiteral(str, inputAsArr);

    yield token;
  }
}

// identifyLiteral helps to identify literals i.e either the token, number or identifier
const identifyLiteral = (str: string, inputAsArr: Array<string>): Token => {
  let token = { type: illegal, literal: '' };

  switch (str) {
    case '.':
      token = { type: dot, literal: str };
      break;
    case '[':
      token = { type: lbracket, literal: str };
      break;
    case ']':
      token = { type: rbracket, literal: str };
      break;
    default:
      if (isNumeric(str)) {
        const num = readNumber(inputAsArr);
        num && (token = { type: int, literal: num });
      } else {
        const identifier = readIdentifier(inputAsArr);
        identifier && (token = { type: ident, literal: identifier });
      }
  }

  return token;
};

// isNumeric helps identify if the given string is a number or not
const isNumeric = (n: string): boolean => {
  const num: number = parseFloat(n);

  return !isNaN(num) && isFinite(num);
};

// readNumber reads the integer next to the token
const readNumber = (srcInput: Array<string>): string => {
  let num: string = '';
  const prevToken: string = srcInput[position - 1];

  for (; position < srcInput.length; position++) {
    if (prevToken === '[' && srcInput[position] === ']') {
      break;
    }
    num += srcInput[position];
  }
  position--;

  return num;
};

// readIdentifier reads the identfier next to the token
const readIdentifier = (srcInput: Array<string>): string => {
  let identifier: string = '';

  for (; position < srcInput.length; position++) {
    if (!isIdent(srcInput[position])) {
      break;
    } else if (srcInput[position] === eof.toString()) {
      break;
    }
    identifier += srcInput[position];
  }
  position--;

  return identifier;
};

// isIdent returns true if a character is not one of the other tokens
const isIdent = (ch: string): boolean => ch != '.' && ch != '[' && ch != ']';

export { Token };
export default Lexer;
