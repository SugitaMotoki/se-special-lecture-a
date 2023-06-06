import { Input, Output } from "./types";
import { VirtualMachine } from "./abstract_class";

export class PostfixCalculator extends VirtualMachine {
  public execute = (input: Input): Output => {
    for (const char of input.split(" ")) {
      switch (char) {
        case char.match(/[0-9]+/u)?.[0]:
          this._push(Number(char));
          break;
        case "+":
          this._add();
          break;
        case "-":
          this._sub();
          break;
        case "*":
          this._mul();
          break;
        case "/":
          this._div();
          break;
        case "%":
          this._mod();
          break;
        case "":
          break;
        default:
          throw new Error(`Syntax error: ${char}`);
      }
    }

    this.hasStackError();
    return this._pop();
  };
}

export * from "./types";
