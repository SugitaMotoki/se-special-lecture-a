"use strict";

import { Instruction, Value } from "./type";

const stack: Value[] = []

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
  console.log(a);
}

export const virtualMachine = (instructions: Instruction[]) => {
  for (const instruction of instructions) {
    switch (instruction.name) {
      case "push":
        executePush(instruction.value!);
        break;
      case "add":
        executeAdd();
        break;
      case "sub":
        executeSub();
        break;
      case "mul":
        executeMul();
        break;
      case "div":
        executeDiv();
        break;
      case "mod":
        executeMod();
        break;
      case "print":
        executePrint();
        break;
      default:
        throw new Error(`Unknown instruction: ${instruction.name}`);
    }
  }
}

export * from "./type"