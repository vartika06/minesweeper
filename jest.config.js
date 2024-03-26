module.exports = {
    displayName: "MINESWEEPER TESTS",
    testEnvironment: "jsdom",
    moduleFileExtensions: ["tsx", "js", "jsx", "ts"],
    transform: {
        "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
    },
    testPathIgnorePatterns: ["/node_modules/", "/build/"],
    coverageReporters: ["text", "html", "json-summary"],
    reporters: ["default", "jest-junit"],
    moduleDirectories: ["node_modules", "src"],
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"]
};
