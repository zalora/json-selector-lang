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

class JSLEvaluator {
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
        throw new Error(`${node.tokenLiteral()} node evaluation not supported`);
    }
  }

  // -- Program evaluation --

  private evaluateProgram(program: Program, json: any): any {
    return program.statements.reduce((prev, statement) => this.evaluate(prev, statement), json);
  }

  // -- Expression Statement evaluation --

  private evaluateExpressionStatement(statement: ASTExpressionStatement, json: any): any {
    const expression = statement.expression;
    if (!expression) {
      throw new Error(`Expression: ${statement.toString()} not found`);
    }

    return this.evaluate(json, expression);
  }

  // -- Expressions evaluation --

  private evaluateSelectExpression(expression: ASTSelectExpression, json: any): any {
    if (typeof json !== 'object') {
      throw new Error(`Invalid nested key sequence ${expression.key}`);
    }

    const key: string = expression.key;
    if (!json.hasOwnProperty(key)) {
      throw new Error(`Key not found in the json: ${expression.key}`);
    }

    return json[key];
  }

  private evaluateIndexExpression(expression: ASTIndexExpression, json: any): any {
    const left = expression.left;
    const index = expression.index;
    if (!left || !index) {
      throw new Error(`Expression: ${expression.toString()} not found`);
    }

    const arr: any = this.evaluate(json, left);
    const idx: number = this.evaluate(json, index);
    if (Array.isArray(arr) && arr.length > idx) {
      return arr[idx];
    }

    throw new Error(`cannot subscript at ${expression.toString()}[${idx}]`);
  }

  private evaluateIntegerExpression(expression: ASTIntegerLiteral): number {
    return expression.value;
  }
}

export default JSLEvaluator;
