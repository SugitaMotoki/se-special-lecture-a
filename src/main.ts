"use strict";

import { virtualMachine, Output} from "./vm";

const inputElement = document.getElementById("input") as HTMLInputElement;
const outputElement = document.getElementById("output") as HTMLInputElement;

/** VMを呼び出す */
const useVirtualMachine = () => {
  try {
    const input = inputElement.value;
    const output: Output = virtualMachine(input);
    outputElement.value = String(output);
  } catch (e) {
    if (e instanceof Error) {
      outputElement.value = e.message;
      console.error(e.message);
    }
  }
}

/** ページ読み込み時に実行 */
window.addEventListener("load", () => {
  useVirtualMachine();
});

/** 入力欄への入力時に実行 */
inputElement.addEventListener("input", () => {
  useVirtualMachine();
});
