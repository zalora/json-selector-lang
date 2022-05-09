// Copyright (c) ZALORA
//
// This source code is licensed under the MIT license found in the
// LICENSE file in the root directory of this source tree.

import ASTNode from './AST/ASTNode';
import Program from './AST/Program';
import ASTExpressionStatement from './AST/ASTExpressionStatement';
import ASTIndexExpression from './AST/ASTIndexExpression';
import ASTIntegerLiteral from './AST/ASTIntegerLiteral';
import ASTSelectExpression from './AST/ASTSelectExpression';
import { ParserError } from './Parser';

interface JSLEvaluating {
  evaluate(json: any, node: ASTNode): any;
}

class JSLEvaluator implements JSLEvaluating {
  evaluate(json: any, node: ASTNode): any {
    switch (node.constructor) {
      case Program:
        return this.evaluateProgram(node as Program, json);
      case ASTExpressionStatement:
        return this.evaluateExpressionStatement(node as ASTExpressionStatement, json);
      case ASTSelectExpression:
        return this.evaluateSelectExpression(node as ASTSelectExpression, json);
      case ASTIndexExpression:
        return this.evaluateIndexExpression(node as ASTIndexExpression, json);
      case ASTIntegerLiteral:
        return this.evaluateIntegerExpression(node as ASTIntegerLiteral);
      default:
        throw new ParserError(`${node.tokenLiteral()} node evaluation not supported`);
    }
  }

  // -- Program evaluation --

  private evaluateProgram(program: Program, json: any): any {
    let val = json;
    program.statements.forEach((statement) => {
      val = this.evaluate(val, statement);
    });

    return val;
  }

  // -- Expression Statement evaluation --

  private evaluateExpressionStatement(statement: ASTExpressionStatement, json: any): any {
    const expression = statement.expression;
    if (!expression) {
      throw new ParserError(`expression: ${statement.toString()} not found`);
    }

    return this.evaluate(json, expression);
  }

  // -- Expressions evaluation --

  private evaluateSelectExpression(expression: ASTSelectExpression, json: any): any {
    if (typeof json !== 'object') {
      throw new ParserError(`invalid nested key sequence ${expression.key}`);
    }

    const key: string = expression.key;
    const selectedValue: any = json[key];
    if (!selectedValue) {
      throw new ParserError(`value not found for key: ${expression.key}`);
    }

    return selectedValue;
  }

  private evaluateIndexExpression(expression: ASTIndexExpression, json: any): any {
    const left = expression.left;
    const index = expression.index;
    if (!left || !index) {
      throw new ParserError(`expression not found, ${expression.toString()}`);
    }

    const arr: any = this.evaluate(json, left);
    const idx: number = this.evaluate(json, index);
    if (Array.isArray(arr) && (idx === 0 || idx) && arr.length > idx) {
      return arr[idx];
    }

    throw new ParserError('invalid JSON');
  }

  private evaluateIntegerExpression(expression: ASTIntegerLiteral): number {
    return expression.value;
  }
}

export default JSLEvaluator;
