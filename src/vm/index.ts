"use strict";

import { Input, Output } from "./type";

export class VirtualMachine {
  private stack: number[] = [];

  private executePop = () => {
    const value = this.stack.pop();
    if (value || value === 0) {
      return value;
    } else {
      throw new Error("Stack underflow");
    }
  }

  private executePush = (value: number) => {
    this.stack.push(value);
  }

  private executeAdd = () => {
    const a = this.executePop();
    const b = this.executePop();
    const result = a + b;
    this.stack.push(result);
  }

  private executeSub = () => {
    const a = this.executePop();
    const b = this.executePop();
    const result = b - a;
    this.stack.push(result);
  }

  private executeMul = () => {
    const a = this.executePop();
    const b = this.executePop();
    const result = a * b;
    this.stack.push(result);
  }

  private executeDiv = () => {
    const a = this.executePop();
    const b = this.executePop();
    const result = Math.floor(b / a);
    if (a === 0) {
      throw new Error("Division by zero");
    }
    this.stack.push(result);
  }

  private executeMod = () => {
    const a = this.executePop();
    const b = this.executePop();
    const result = b % a;
    this.stack.push(result);
  }

  private executePrint = () => {
    const a = this.executePop();
    return a;
  }

  /** スタックエラーを検出する */
  private detectStackError = () => {
    switch (this.stack.length) {
      case 0:
        throw new Error("Stack is empty");
      case 1:
        break; // 正常
      default:
        throw new Error("Too many values in stack");
    }
  }

  public execute = (input: Input): Output => {
    // stackを初期化
    this.stack = [];

    for (const char of input.split(" ")) {
      switch (char) {
        case char.match(/[0-9]+/)?.[0]:
          this.executePush(Number(char));
          break;
        case "+":
          this.executeAdd();
          break;
        case "-":
          this.executeSub();
          break;
        case "*":
          this.executeMul();
          break;
        case "/":
          this.executeDiv();
          break;
        case "%":
          this.executeMod();
          break;
        case "":
          break;
        default:
          throw new Error(`Syntax error: ${char}`);
      }
    }

    this.detectStackError();

    return this.executePrint();
  }
}

export * from "./type"
