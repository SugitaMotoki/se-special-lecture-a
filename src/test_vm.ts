"use strict";
/**
 * ブラウザを使わずにVMを検証する
 */

import { vm01, vm02 } from "./vm";

const postfixCalculator = new vm01.PostfixCalculator();
console.log(postfixCalculator.execute("1 2 + 3 * 4 -"));

const jump = new vm02.Jump();
console.log(
  jump.execute(`\
push 10
push 20
add
print\
`),
);
