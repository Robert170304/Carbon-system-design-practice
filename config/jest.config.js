module.exports = {
  rootDir: "../",
  setupFilesAfterEnv: ["./config/jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx)$": ["babel-jest", { configFile: "./config/.babelrc" }],
  },
  transformIgnorePatterns: ["/node_modules/(?!string-width|cliui)"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
  },
  verbose: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ["<rootDir>/test/test-utils.js"],
  testEnvironment: "jest-environment-jsdom",
};
