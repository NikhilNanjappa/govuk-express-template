module.exports = {
  testResultsProcessor: "",
  coverageDirectory: ".coverage",
  setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
  coverageReporters: ["json", "lcov"],
  modulePathIgnorePatterns: ["<rootDir>/.*/__mocks__"],
};
