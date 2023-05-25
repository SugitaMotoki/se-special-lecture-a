"use strict";

type Instruction = {
  name: string,
  value?: number,
}

type Value = number;

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

const virtualMachine = (instructions: Instruction[]) => {
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

(() => {
  const instructions: Instruction[] = [
    { name: "push", value: 1 },
    { name: "push", value: 2 },
    { name: "add" },
    { name: "push", value: 3 },
    { name: "push", value: 4 },
    { name: "add" },
    { name: "mul" },
    { name: "print" },
  ]
  virtualMachine(instructions);
})();
