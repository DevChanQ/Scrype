import typescript from "rollup-plugin-typescript2";
import terser from "@rollup/plugin-terser";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const tsPlugin = typescript({
  tsconfig: "./tsconfig.json",
  useTsconfigDeclarationDir: true,
});

const commonPlugins = [tsPlugin];

export default [
  // CommonJS & ESM build - externalize dependencies
  {
    input: "src/index.ts",
    output: [
      { file: "dist/scrype.cjs.js", format: "cjs" },
      { file: "dist/scrype.esm.js", format: "es" },
    ],
    watch: { include: "src/**" },
    plugins: commonPlugins,
  },

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
      ...commonPlugins,
      nodeResolve({ browser: true, preferBuiltins: false }),
      commonjs(),
      terser(),
    ],
  },
];
