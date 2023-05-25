"use strict";

// src/vm/index.ts
var VirtualMachine = class {
  constructor() {
    this.stack = [];
    this.executePop = () => {
      const value = this.stack.pop();
      if (value || value === 0) {
        return value;
      } else {
        throw new Error("Stack underflow");
      }
    };
    this.executePush = (value) => {
      this.stack.push(value);
    };
    this.executeAdd = () => {
      const a = this.executePop();
      const b = this.executePop();
      const result = a + b;
      this.stack.push(result);
    };
    this.executeSub = () => {
      const a = this.executePop();
      const b = this.executePop();
      const result = b - a;
      this.stack.push(result);
    };
    this.executeMul = () => {
      const a = this.executePop();
      const b = this.executePop();
      const result = a * b;
      this.stack.push(result);
    };
    this.executeDiv = () => {
      const a = this.executePop();
      const b = this.executePop();
      const result = Math.floor(b / a);
      if (a === 0) {
        throw new Error("Division by zero");
      }
      this.stack.push(result);
    };
    this.executeMod = () => {
      const a = this.executePop();
      const b = this.executePop();
      const result = b % a;
      this.stack.push(result);
    };
    this.executePrint = () => {
      const a = this.executePop();
      return a;
    };
    /** スタックエラーを検出する */
    this.detectStackError = () => {
      switch (this.stack.length) {
        case 0:
          throw new Error("Stack is empty");
        case 1:
          break;
        default:
          throw new Error("Too many values in stack");
      }
    };
    this.execute = (input) => {
      var _a;
      this.stack = [];
      for (const char of input.split(" ")) {
        switch (char) {
          case ((_a = char.match(/[0-9]+/)) == null ? void 0 : _a[0]):
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
    };
  }
};

// src/main.ts
var inputElement = document.getElementById("input");
var outputElement = document.getElementById("output");
var historiesElement = document.getElementById("histories");
var virtualMachine = new VirtualMachine();
var useVirtualMachine = () => {
  try {
    const input = inputElement.value;
    const output = virtualMachine.execute(input);
    outputElement.value = String(output);
  } catch (e) {
    if (e instanceof Error) {
      outputElement.value = e.message;
      console.error(e.message);
    }
  }
};
var addHistory = () => {
  const input = inputElement.value;
  const output = outputElement.value;
  const li = document.createElement("li");
  li.textContent = `${input} ---> ${output}`;
  li.classList.add("list-group-item");
  historiesElement.appendChild(li);
  inputElement.value = "";
  outputElement.value = "";
};
window.addEventListener("load", () => {
  useVirtualMachine();
});
inputElement.addEventListener("input", () => {
  useVirtualMachine();
});
inputElement.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addHistory();
  }
});
