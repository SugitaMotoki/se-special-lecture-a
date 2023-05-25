"use strict";

import { Input, Output } from "./type";

let stack: number[] = []

const executePush = (value: number) => {
  stack.push(value);
}

const executeAdd = () => {
  const a = stack.pop()!;
  const b = stack.pop()!;
  const result = a + b;
  stack.push(result);
}

const executeSub = () => {
  const a = stack.pop()!;
  const b = stack.pop()!;
  const result = b - a;
  stack.push(result);
}

const executeMul = () => {
  const a = stack.pop()!;
  const b = stack.pop()!;
  const result = a * b;
  stack.push(result);
}

const executeDiv = () => {
  const a = stack.pop()!;
  const b = stack.pop()!;
  const result = Math.floor(b / a);
  stack.push(result);
}

const executeMod = () => {
  const a = stack.pop()!;
  const b = stack.pop()!;
  const result = b % a;
  stack.push(result);
}

const executePrint = () => {
  const a = stack.pop()!;
  return a;
}

export const virtualMachine = (input: Input): Output => {
  // スタックを初期化
  stack = [];

  for (const ctx of input.split(" ")) {
    switch (ctx) {
      case ctx.match(/[0-9]+/)?.[0]:
        executePush(Number(ctx));
        break;
      case "+":
        executeAdd();
        break;
      case "-":
        executeSub();
        break;
      case "*":
        executeMul();
        break;
      case "/":
        executeDiv();
        break;
      case "%":
        executeMod();
        break;
      case "":
        break;
      default:
        throw new Error(`Unknown character: ${ctx}`);
    }
  }
  if (stack.length !== 1) {
    throw new Error("Stack is not empty");
  }
  return executePrint();
}

export * from "./type"
