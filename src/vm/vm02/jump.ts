import { LoopVirtualMachine } from "./loop_virtual_machine";

export class Jump extends LoopVirtualMachine {
  // private local = new Map<string, number>;
  private printData: string[] = [];

  public override execute(input: string): string {
    const instructions: string[][] = this.generateInstructionSet(input);

    /** 命令の行数 */
    let line = 0;

    while (line < instructions.length) {
      /** ${line}行目の命令 */
      const instruction = instructions[line]!; // whileの条件より必ず存在する

      switch (instruction[0]) {
        case "push":
          this._push(instruction[1]);
          break;
        case "pop":
          this._pop();
          break;
        case "add":
          this._add();
          break;
        case "sub":
          this._sub();
          break;
        case "mul":
          this._mul();
          break;
        case "div":
          this._div();
          break;
        case "mod":
          this._mod();
          break;
        case "set_global":
          this._setGlobal(instruction[1]);
          break;
        case "get_global":
          this._getGlobal(instruction[1]);
          break;
        case "print":
          this.printData.push(String(this._pop()));
          break;
        default:
          throw new Error(`Syntax error: ${instruction}`);
      }
      console.log(instruction);
      line++;
    }
    console.log(this.printData);
    return this.printData.join("\n");
  }
}
