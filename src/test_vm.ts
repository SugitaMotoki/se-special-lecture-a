/**
 * ブラウザを使わずにVMを検証する
 */

import {
  // vm01,
  vm02,
} from "./vm";

const loop = 10 ** 1;

const jumpVm = new vm02.Jump();
const forVm = new vm02.For();

const printWithJump = `\
push 0
set_global i
label CHECK
get_global i
push ${loop}
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
`;

const printWithFor = `\
push 0
set_global i
get_global i
push ${loop}
start_for COUNT
get_global i
print
get_global i
push 1
add
set_global i
end_for COUNT\
`;

console.log("Jump");
console.time("Jump");
// console.log(jumpVm.execute(printWithJump));
jumpVm.execute(printWithJump);
console.timeEnd("Jump");

console.log("For");
console.time("For");
// console.log(forVm.execute(printWithFor));
forVm.execute(printWithFor);
console.timeEnd("For");
