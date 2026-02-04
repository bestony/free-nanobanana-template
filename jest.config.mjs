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
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "hooks/**/*.{ts,tsx}",
    "lib/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/components/ui/**",
    "!app/api/**",
    "!app/\\(payload\\)/**",
  ],
  coveragePathIgnorePatterns: [
    "<rootDir>/components/ui/",
    "<rootDir>/app/api/",
    "<rootDir>/app/\\(payload\\)/",
  ],
  coverageThreshold: {
    global: {
      statements: 90,
      branches: 90,
      functions: 90,
      lines: 90,
    },
  },
  coverageReporters: ["text", "text-summary", "lcov"],
};

export default createJestConfig(customJestConfig);
