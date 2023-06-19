import { vm02 } from "../vm";
import { source01 } from "./ex01";
import { source02 } from "./ex02";

const jumpVm = new vm02.Jump();
console.log(jumpVm.execute(source01));

const forVm = new vm02.For();
console.log(forVm.execute(source02));
