import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/components/ui/"],
  coveragePathIgnorePatterns: ["<rootDir>/components/ui/"],
  coverageReporters: ["text", "text-summary", "lcov"],
};

export default createJestConfig(customJestConfig);
