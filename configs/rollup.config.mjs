import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

import defaultConfig, { tsPlugin } from "./common.mjs";

export default [
  ...defaultConfig,

  // Browser build - bundle everything (include nodeResolve + commonjs + polyfills)
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/scrype.browser.js",
        format: "iife",
        name: "QuickWallet",
      },
      {
        file: "dist/scrype.browser.esm.js",
        format: "es",
      },
    ],
    plugins: [
      tsPlugin,
      nodeResolve({ browser: true, preferBuiltins: false }),
      commonjs(),
      terser(),
    ],
  },
];
