import { VirtualMachine03, Instruction } from "./abstract_vm";

export class ArrayVM extends VirtualMachine03 {
  /* eslint max-lines-per-function: "off" */
  /* eslint no-continue: "off" */
  public override execute(input: string): string {
    // データを初期化する
    this.clean();

    /**
     * 命令が格納された2次元配列
     * @example [["push", "1"], ["push", "2"], ["add"], ["print"]]
     */
    const instructionSet: string[][] = this.parse(input);

    // 行数をリセット
    this.line = 0;

    while (this.line < instructionSet.length) {
      /** ${line}行目の命令 */
      const instruction = instructionSet[this.line];

      if (!instruction) {
        this.line++;
        continue;
      }

      switch (instruction[0]) {
        case Instruction.debugShowStack:
          this._showStack();
          break;
        case Instruction.push:
          this._push(instruction[1]);
          break;
        case Instruction.pop:
          this._pop();
          break;
        case Instruction.add:
          this._add();
          break;
        case Instruction.sub:
          this._sub();
          break;
        case Instruction.mul:
          this._mul();
          break;
        case Instruction.div:
          this._div();
          break;
        case Instruction.mod:
          this._mod();
          break;
        case Instruction.equal:
          this._equal();
          break;
        case Instruction.setGlobal:
          this._setGlobal(instruction[1]);
          break;
        case Instruction.getGlobal:
          this._getGlobal(instruction[1]);
          break;
        case Instruction.jump:
          this._jump(instruction[1]);
          break;
        case Instruction.jumpIf:
          this._jumpIf(instruction[1]);
          break;
        case Instruction.jumpIfZero:
          this._jumpIfZero(instruction[1]);
          break;
        case Instruction.print:
          this.printData.push(String(this._pop()));
          break;
        default:
          throw new Error(`Syntax error: ${instruction}`);
      }
      this.line++;
    }
    return this.printData.join("\n");
  }
}
