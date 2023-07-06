/* eslint @typescript-eslint/no-non-null-assertion: off */

import { vm02, vm03, vm04 } from "../vm";

import { source00 } from "./ex00";
import { source01 } from "./ex01";
import { source02 } from "./ex02";
import { source03 } from "./ex03";
import { source04 } from "./ex04";
import { source05 } from "./ex05";
import { source06 } from "./ex06";
import { source07 } from "./ex07";

const jumpVm = new vm02.Jump();
const forVm = new vm02.For();
const cVmProto = new vm03.CVMProtoType();
const cVmProto2 = new vm04.CVMProtoType2();

const samples = [
  { source: source00, vm: jumpVm },
  { source: source01, vm: forVm },
  { source: source02, vm: cVmProto },
  { source: source03, vm: cVmProto },
  { source: source04, vm: cVmProto },
  { source: source05, vm: cVmProto },
  { source: source06, vm: cVmProto },
  { source: source07, vm: cVmProto2 },
];

const num = 7;
const sample = samples[num];
console.log(sample!.vm.execute(sample!.source));
