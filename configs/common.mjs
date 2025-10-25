import typescript from "rollup-plugin-typescript2";
import copy from "rollup-plugin-copy";

// import { globSync } from "glob";
// import path from "node:path";
// import { fileURLToPath, URL } from "node:url";

export const tsPlugin = typescript({
  tsconfig: "./tsconfig.json",
  useTsconfigDeclarationDir: true,
});

export const copyPlugin = copy({
  targets: [
    {
      src: "node_modules/highlight.js/styles/**/*.min.css",
      dest: "dist/themes",
    },
  ],
});

export default [
  // Replacer modules build
  // {
  //   input: Object.fromEntries(
  //     globSync("src/replacer/**/*.ts").map((file) => [
  //       // This removes `src/` as well as the file extension from each
  //       // file, so e.g. src/nested/foo.js becomes nested/foo
  //       path.relative(
  //         "src",
  //         file.slice(0, file.length - path.extname(file).length),
  //       ),
  //       // This expands the relative paths to absolute paths, so e.g.
  //       // src/nested/foo becomes /project/src/nested/foo.js
  //       fileURLToPath(new URL(file, import.meta.url)),
  //     ]),
  //   ),
  //   output: {
  //     dir: "dist",
  //     format: "es",
  //   },
  //   plugins: [tsPlugin],
  // },
  {
    input: "src/index.ts",
    output: [
      { file: "dist/scrype.cjs.js", format: "cjs", sourcemap: true },
      { file: "dist/scrype.esm.js", format: "es", sourcemap: true },
    ],
    watch: { include: "src/**" },
    plugins: [tsPlugin, copyPlugin],
  },
];
