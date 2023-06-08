"use strict";

const esbuild = require("esbuild");

const options = {
  outdir: "./docs",
  bundle: true,
  format: "cjs",
  treeShaking: false,
  minify: false,
  sourcemap: false,
  tsconfig: "tsconfig.json",
  entryPoints: [
    "src/main.ts",
    "src/vm/vm02/test_vm.ts"
  ],
}

async function build() {
  if (process.env.WATCH) {
    const ctx = await esbuild.context(options);
    await ctx.watch();
    console.log("Watching...")
  } else {
    esbuild.build(options);
    console.log("The Build has been completed.")
  }
}

build();
