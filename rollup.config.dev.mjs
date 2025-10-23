import typescript from "rollup-plugin-typescript2";

export default [
  {
    input: "src/index.ts",
    output: [
      { file: "dist/scrype.cjs.js", format: "cjs", sourcemap: true },
      { file: "dist/scrype.esm.js", format: "es", sourcemap: true },
    ],
    watch: { include: "src/**" },
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        useTsconfigDeclarationDir: true,
      })
    ],
  },
];
