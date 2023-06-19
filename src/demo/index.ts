import {
  // vm02,
  vm03,
} from "../vm";
/*
 * import { source01 } from "./ex01";
 * import { source02 } from "./ex02";
 */
import { source03 } from "./ex03";

/*
 * const jumpVm = new vm02.Jump();
 * console.log(jumpVm.execute(source01));
 */

/*
 * const forVm = new vm02.For();
 * console.log(forVm.execute(source02));
 */

const arrayVm = new vm03.ArrayVM();
console.log(arrayVm.execute(source03));
