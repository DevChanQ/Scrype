import eslint from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  prettier,
  {
    ignores: ["dist/**", "node_modules/**"],
  },
]);
