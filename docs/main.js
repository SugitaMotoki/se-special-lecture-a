"use strict";

// src/vm/index.ts
var stack = [];
var executePush = (value) => {
  stack.push(value);
};
var executeAdd = () => {
  const a = stack.pop();
  const b = stack.pop();
  const result = a + b;
  stack.push(result);
};
var executeSub = () => {
  const a = stack.pop();
  const b = stack.pop();
  const result = b - a;
  stack.push(result);
};
var executeMul = () => {
  const a = stack.pop();
  const b = stack.pop();
  const result = a * b;
  stack.push(result);
};
var executeDiv = () => {
  const a = stack.pop();
  const b = stack.pop();
  const result = Math.floor(b / a);
  stack.push(result);
};
var executeMod = () => {
  const a = stack.pop();
  const b = stack.pop();
  const result = b % a;
  stack.push(result);
};
var executePrint = () => {
  const a = stack.pop();
  console.log(a);
};
var virtualMachine = (instructions2) => {
  for (const instruction of instructions2) {
    switch (instruction.name) {
      case "push":
        executePush(instruction.value);
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
};

// src/main.ts
var instructions = [
  { name: "push", value: 1 },
  { name: "push", value: 2 },
  { name: "add" },
  { name: "push", value: 3 },
  { name: "push", value: 4 },
  { name: "add" },
  { name: "mul" },
  { name: "print" }
];
virtualMachine(instructions);
