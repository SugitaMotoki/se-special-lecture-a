/**
 * ブラウザを使わずにVMを検証する
 */

import {
  // vm01,
  vm02,
} from "./vm";

const jump = new vm02.Jump();
/*
 * console.log(
 *   jump.execute(`\
 * push 10
 * jump foo
 * push 20
 * add
 * set_global x
 * push 30
 * push 40
 * add
 * set_global y
 * get_global x
 * get_global y
 * add
 * label foo
 * print\
 * `),
 * );
 */
console.log(
  jump.execute(`\
push 0
set_global i
label CHECK
get_global i
push 10
equal
jump_if END
get_global i
print
get_global i
push 1
add
set_global i
jump CHECK
label END\
`),
);
