import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import js from "@eslint/js"

/** @type {Record<string, true>} */
const nodeGlobals = {
  process: true,
  console: true,
  require: true,
  module: true,
  exports: true,
  __dirname: true,
  __filename: true,
  Buffer: true,
  setTimeout: true,
  clearTimeout: true,
  setInterval: true,
  clearInterval: true,
  setImmediate: true,
  clearImmediate: true,
  Promise: true,
  URL: true,
  URLSearchParams: true,
}

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: nodeGlobals,
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      // Relax rules that conflict with existing code patterns
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-unused-vars": "off",
      "no-undef": "off",
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "postcss.config.js",
      "tailwind.config.ts",
      "jest.config.js",
    ],
  },
]
