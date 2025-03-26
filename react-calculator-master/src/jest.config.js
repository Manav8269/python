module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["lcov", "text-summary"],
  coveragePathIgnorePatterns: ["/node_modules/", "/test/"],
};
