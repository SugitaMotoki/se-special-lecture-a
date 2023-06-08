/** ループを実現するためのVMの抽象クラス */
export abstract class LoopVirtualMachine {
  /** VMのスタック */
  private stack: number[] = [];

  /** グローバル変数 */
  private global = new Map<string, number>();

  /** スタックから値を取り出す */
  protected _pop = () => {
    const value = this.stack.pop();
    if (value || value === 0) {
      return value;
    }
    throw new Error("Stack underflow");
  };

  /** スタックに値を積む */
  protected _push = (value: number | string | undefined) => {
    if (value === undefined) {
      throw new Error("push requires an argument");
    }
    if (typeof value === "string") {
      if (value.match(/^[0-9]+$/)) {
        value = Number(value);
      } else {
        throw new Error(`push requires a number: ${value} isn't allowed`);
      }
    }
    this.stack.push(value);
  };

  /** 加算 */
  protected _add = () => {
    const a = this._pop();
    const b = this._pop();
    this.stack.push(a + b);
  };

  /** 減算 */
  protected _sub = () => {
    const a = this._pop();
    const b = this._pop();
    this.stack.push(b - a);
  };

  /** 乗算 */
  protected _mul = () => {
    const a = this._pop();
    const b = this._pop();
    this.stack.push(a * b);
  };

  /** 除算 */
  protected _div = () => {
    const a = this._pop();
    const b = this._pop();
    if (a === 0) {
      throw new Error("Division by zero");
    }
    this.stack.push(Math.floor(b / a));
  };

  /** 剰余 */
  protected _mod = () => {
    const a = this._pop();
    const b = this._pop();
    if (a === 0) {
      throw new Error("Division by zero");
    }
    this.stack.push(b % a);
  };

  /** グローバル変数の定義 */
  protected _setGlobal = (name: string | undefined) => {
    if (!name) {
      throw new Error("get_global requires an argument");
    }
    const a = this._pop();
    this.global.set(name, a);
  };

  /** グローバル変数の取得 */
  protected _getGlobal = (name: string | undefined) => {
    if (!name) {
      throw new Error("get_global requires an argument");
    }
    const value = this.global.get(name);
    if (value || value === 0) {
      this.stack.push(value);
    } else {
      throw new Error(`Undefined global variable: ${name}`);
    }
  };

  /** 値を出力する */
  protected _print = () => {
    const a = this._pop();
    return a;
  };

  /**
   * スタックのエラーを検知する
   * @returns {boolean} エラーが無ければtrue
   */
  protected hasStackError = (): boolean => {
    switch (this.stack.length) {
      case 0:
        throw new Error("Stack is empty");
      case 1:
        return true;
      default:
        throw new Error("Too many values in stack");
    }
  };

  /**
   * 命令セットの生成
   * @param {string} input 入力文字列
   * @returns {Instruction[]} 命令セット
   */
  protected generateInstructionSet = (input: string): string[][] => {
    const lines = input.split("\n");
    const instructions: string[][] = [];
    try {
      for (const line of lines) {
        if (line.trim() !== "") {
          instructions.push(line.split(" "));
        }
      }
    } catch (error) {
      throw new Error(`Syntax error: ${error}`);
    }
    return instructions;
  };

  /** VMを実行する */
  abstract execute(input: string): string;
}
