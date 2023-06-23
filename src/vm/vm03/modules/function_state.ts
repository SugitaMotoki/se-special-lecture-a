import { Address, VirtualMachineError, UndefinedAddressError } from "../types";

/**
 * 関数の状態を表すクラス
 */
export class FunctionState {
  /** 関数名 */
  public readonly name: string;

  /** returnする行数 */
  public readonly returnAddress: number;

  /** 現在の行数の参照 */
  private lineRef: { line: number };

  /** 変数のアドレスの辞書 */
  private addressMap = new Map<string, Address>();

  public constructor(
    name: string,
    returnAddress: number,
    lineRef: { line: number },
  ) {
    if (name === "") {
      throw new VirtualMachineError(lineRef.line, "Function name is empty");
    }
    this.name = name;
    this.returnAddress = returnAddress;
    this.lineRef = lineRef;
  }

  /**
   * 変数のアドレスを登録する
   * @param name 関数名
   * @param address アドレス
   */
  public setAddress(name: string, address: Address): void {
    this.addressMap.set(name, address);
  }

  /**
   * 変数のアドレスを取得する
   * @param name 関数名
   * @param line 行数
   * @returns {Address} アドレス
   */
  public getAddress(name: string): Address {
    const address = this.addressMap.get(name);
    if (typeof address === "undefined") {
      throw new UndefinedAddressError(this.name, name, this.lineRef.line);
    }
    return address;
  }
}
