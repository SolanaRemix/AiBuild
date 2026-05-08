/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testMatch: ["**/__tests__/**/*.test.ts", "**/__tests__/**/*.test.tsx"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
  },
  collectCoverageFrom: [
    "core/**/*.ts",
    "lib/**/*.ts",
    "app/api/**/*.ts",
    "!**/*.d.ts",
  ],
}

module.exports = config
