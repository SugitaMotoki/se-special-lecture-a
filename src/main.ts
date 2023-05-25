"use strict";

import { virtualMachine, Instruction } from "./vm";

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
