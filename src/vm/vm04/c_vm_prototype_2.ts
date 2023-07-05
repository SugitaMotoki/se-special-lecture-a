import { FunctionState } from "./modules";
import { VirtualMachineError, Address, Variable, Instruction } from "./types";

export * from "./modules";
export * from "./types";

/* eslint max-lines: off */
/* eslint max-lines-per-function: off */

/** デバッグ時に環境変数として与えられる文字列 */
const DEBUG = "DEBUG";

/**
 * 第4回発表のVM
 * - 課題は第3回までのVMの高速化
 * - C言語の動作を想定
 */
export class CVMProtoType2 {
  /** スタック */
  private stack: number[] = [];

  /** メモリ */
  private memory: Variable[] = [];

  /** 命令の行数（プログラムカウンタ） */
  private line = 0;

  /** 関数 */
  private functions: FunctionState[] = [];

  /** ラベル（関数名も含む） */
  private label = new Map<string, number>();

  /** グローバル変数を登録する辞書 */
  private globalAddressMap = new Map<string, number>();

  /** 出力するデータ */
  private printData: string[] = [];

  /** スタックの状態を確認する */
  public _showStack = () => {
    console.log("=== show stack ===");
    console.log(this.stack);
    console.log("==================");
  };

  /** スタックから値を取り出す */
  private _pop = () => {
    const value = this.stack.pop();
    if (value || value === 0) {
      return value;
    }
    throw new Error("Stack underflow");
  };

  /** スタックに値を積む */
  private _push = (value: number | string | undefined) => {
    switch (typeof value) {
      case "undefined":
        throw new Error("push requires an argument");
      case "string":
        this.stack.push(this.toNumber(value));
        break;
      default:
        this.stack.push(value);
    }
  };

  /** 加算 */
  private _add = () => {
    const a = this._pop();
    const b = this._pop();
    this.stack.push(a + b);
  };

  /** 減算 */
  private _sub = () => {
    const a = this._pop();
    const b = this._pop();
    this.stack.push(b - a);
  };

  /** 乗算 */
  private _mul = () => {
    const a = this._pop();
    const b = this._pop();
    this.stack.push(a * b);
  };

  /** 除算 */
  private _div = () => {
    const a = this._pop();
    const b = this._pop();
    if (a === 0) {
      throw new Error("Division by zero");
    }
    this.stack.push(Math.floor(b / a));
  };

  /** 剰余 */
  private _mod = () => {
    const a = this._pop();
    const b = this._pop();
    if (a === 0) {
      throw new Error("Division by zero");
    }
    this.stack.push(b % a);
  };

  /** 等価 */
  private _equal = () => {
    const a = this._pop();
    const b = this._pop();
    this.stack.push(a === b ? 1 : 0);
  };

  /**
   * ローカル変数の定義
   * 指定された名前の変数が現在の関数にあれば代入、なければ新規作成
   */
  private _setLocal = (name: string | undefined) => {
    if (!name) {
      throw new Error("set_local requires an argument");
    }
    const currentFunction = this.getCurrentFunction();
    const value = this._pop();
    const currentAddress = currentFunction.localAddressMap.get(name);
    if (currentAddress) {
      if (typeof currentAddress[0] === "undefined") {
        throw new Error("Invalid address");
      }
      this.memory[currentAddress[0]] = value;
    } else {
      const lengthOfMemory = this.memory.push(value);
      const newAddress: Address = [lengthOfMemory - 1];
      currentFunction.localAddressMap.set(name, newAddress);
    }
  };

  /** ローカル変数の取得 */
  private _getLocal = (name: string | undefined) => {
    if (!name) {
      throw new Error("get_local requires an argument");
    }
    const currentFunction = this.getCurrentFunction();
    const address = currentFunction.localAddressMap.get(name);
    if (typeof address === "undefined") {
      throw new Error(`Undefined local variable: ${name}`);
    }

    // 実装途中

    const addressLengthOfVariable = 1;
    const addressLengthOfArray = 2;

    if (typeof address[0] === "undefined") {
      throw new Error("Invalid address");
    } else if (address.length === addressLengthOfVariable) {
      const variable = this.memory[address[0]];
      if (typeof variable === "undefined") {
        throw new Error(`Undefined local variable: ${name}`);
      }
      if (typeof variable === "number") {
        this.stack.push(variable);
      }
    } else if (address.length === addressLengthOfArray) {
      if (typeof address[1] === "undefined") {
        throw new Error("Invalid address");
      }
      const array = this.memory[address[0]];
      if (typeof array === "undefined") {
        throw new Error(`Undefined local variable: ${name}`);
      }
      if (typeof array === "number") {
        throw new Error(`Undefined local variable: ${name}`);
      }
      const variable = array[address[1]];
      if (typeof variable === "undefined") {
        throw new Error(`Undefined local variable: ${name}`);
      }
      if (typeof variable === "number") {
        this.stack.push(variable);
      }
    }
  };

  /** グローバル変数の定義 */
  private _setGlobal = (name: string | undefined) => {
    if (!name) {
      throw new Error("set_global requires an argument");
    }
    const a = this._pop();
    this.globalAddressMap.set(name, a);
  };

  /** グローバル変数の取得 */
  private _getGlobal = (name: string | undefined) => {
    if (!name) {
      throw new Error("get_global requires an argument");
    }
    const value = this.globalAddressMap.get(name);
    if (value || value === 0) {
      this.stack.push(value);
    } else {
      throw new Error(`Undefined global variable: ${name}`);
    }
  };

  /** ラベルで指定された行へジャンプ */
  private _jump = (label: string | undefined) => {
    if (!label) {
      throw new Error("jump requires an argument");
    }
    const line = this.label.get(label);
    if (typeof line === "undefined") {
      throw new Error(`Undefined label: ${label}`);
    }
    // 命令後にthis.lineが1足されるので1引いておく
    this.line = line - 1;
  };

  /** popした値が0以外ならジャンプ */
  private _jumpIf = (label: string | undefined) => {
    if (!label) {
      throw new Error("jump_if requires an argument");
    }
    const a = this._pop();
    if (a !== 0) {
      const line = this.label.get(label);
      if (typeof line === "undefined") {
        throw new Error(`Undefined label: ${label}`);
      }
      this.line = line - 1;
    }
  };

  /** popした値が0ならジャンプ */
  private _jumpIfZero = (label: string | undefined) => {
    if (!label) {
      throw new Error("jump_if_zero requires an argument");
    }
    const a = this._pop();
    if (a === 0) {
      const line = this.label.get(label);
      if (typeof line === "undefined") {
        throw new Error(`Undefined label: ${label}`);
      }
      this.line = line - 1;
    }
  };

  /** 関数を呼び出す */
  private _call(functionName: string | undefined) {
    if (!functionName) {
      throw new Error(`Undefined label name: ${functionName}`);
    } else if (functionName === "MAIN") {
      throw new Error(`MAIN function is not callable`);
    }

    this.functions.push(new FunctionState(functionName, this.line));
    this._jump(functionName);
  }

  /** 関数での処理を終えて呼び出した位置へ戻る */
  private _return() {
    const returnedFunction = this.functions.pop();
    if (!returnedFunction) {
      throw new VirtualMachineError(this.line, "No function to return");
    }
    this.line = returnedFunction.returnAddress;
  }

  /** 今いる関数を取得する */
  private getCurrentFunction = (): FunctionState => {
    const currentFunction = this.functions[this.functions.length - 1];
    if (!currentFunction) {
      // 関数に入っていないことを示すエラー
      throw new Error("This instruction must be called in a function");
    }
    return currentFunction;
  };

  /**
   * プログラムのパース
   * 入力文字列を命令セットに変換する
   * @param {string} input 入力文字列
   * @returns {Instruction[]} 命令セット
   */
  private parse = (input: string): string[][] => {
    this.line = 0;
    const lines = input.split("\n");
    const instructionSet: string[][] = [];
    let lineOfInput = 0;
    try {
      while (lineOfInput < lines.length) {
        const line = lines[lineOfInput];

        if (!line) {
          lineOfInput++;
          continue;
        }

        /** 前後の空白を削除 */
        const trimmed = line.trim();

        // 空行、コメント行はスキップ
        if (this.isSkip(trimmed)) {
          /* eslint no-continue: "off" */
          lineOfInput++;
          continue;
        }

        // 行を空白で分割して配列化
        const instruction = trimmed.split(" ");

        // ラベルの場合はラベルを登録してスキップ
        if (instruction[0]?.endsWith(":")) {
          const label = instruction[0].slice(0, -1);
          this.setLabel(this.line, label);
          lineOfInput++;
          continue;
        }

        // 命令セットに追加
        instructionSet.push(instruction);
        // 命令を追加したので
        this.line++;
        lineOfInput++;
      }
    } catch (error) {
      throw new Error(`Syntax error: ${error}`);
    }
    return instructionSet;
  };

  /** スキップすべき行かを判定する */
  private isSkip = (line: string): boolean => {
    return line === "" || line.startsWith("//") || line.startsWith("#");
  };

  /**
   * 与えられた文字列が数字であればnumber型にして返す
   * 数字でなければエラーを投げる
   * @param {string} value 文字列
   * @returns {number} 数字
   */
  private toNumber = (value: string): number => {
    if (!Number.isNaN(Number(value))) {
      return Number(value);
    }
    throw new Error(`push requires a number: ${value} isn't allowed`);
  };

  /** ラベルの定義 */
  private setLabel = (line: number, name: string | undefined) => {
    if (!name) {
      throw new Error("set_label requires an argument");
    }
    if (this.label.has(name)) {
      throw new Error(`Duplicated label: ${name}`);
    }
    this.label.set(name, line);
  };

  private clean = () => {
    this.stack = [];
    this.globalAddressMap.clear();
    this.label.clear();
    this.line = 0;
    this.printData = [];
  };

  public execute(input: string): string {
    // データを初期化する
    this.clean();

    /**
     * 命令が格納された2次元配列
     * @example [["push", "1"], ["push", "2"], ["add"], ["print"]]
     */
    const instructionSet: string[][] = this.parse(input);

    /** MAINへ飛ぶ */
    this.functions.push(new FunctionState("MAIN", instructionSet.length - 1));
    this._jump("MAIN");
    this.line++;

    if (process.env[DEBUG]) {
      console.log("=== input =====");
      console.log(input);
      console.log("\n=== label =====");
      console.log(this.label);
      console.log("\n=== flow =====");
    }

    while (this.line < instructionSet.length) {
      /** ${line}行目の命令 */
      const instruction = instructionSet[this.line];

      if (process.env[DEBUG]) {
        console.log(`${String(this.line).padStart(3, " ")}, ${instruction}`);
      }

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
        case Instruction.eq:
          this._equal();
          break;
        case Instruction.setLocal:
          this._setLocal(instruction[1]);
          break;
        case Instruction.getLocal:
          this._getLocal(instruction[1]);
          break;
        case Instruction.setGlobal:
          this._setGlobal(instruction[1]);
          break;
        case Instruction.getGlobal:
          this._getGlobal(instruction[1]);
          break;
        /*
         * case Instruction.defineArray:
         *   this._defineArray(instruction[1]);
         *   break;
         * case Instruction.setArray:
         *   this._setArray(instruction[1]);
         *   break;
         * case Instruction.getArray:
         *   this._getArray(instruction[1]);
         *   break;
         */
        case Instruction.jump:
          this._jump(instruction[1]);
          break;
        case Instruction.jumpIf:
          this._jumpIf(instruction[1]);
          break;
        case Instruction.jumpIfZero:
          this._jumpIfZero(instruction[1]);
          break;
        case Instruction.call:
          this._call(instruction[1]);
          break;
        case Instruction.return:
          this._return();
          break;
        case Instruction.print:
          this.printData.push(String(this._pop()));
          break;
        default:
          throw new Error(`Syntax error: ${instruction}`);
      }
      this.line++;
    }

    if (process.env[DEBUG]) {
      console.log("\n=== result =====");
    }
    return this.printData.join("\n");
  }
}
