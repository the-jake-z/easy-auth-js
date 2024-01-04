module.exports = {
    transform: {'^.+\\.ts?$': 'ts-jest'},
    testEnvironment: 'node',
    collectCoverage: true,
    coverageReporters: ["json", "html"],
    testRegex: '.*\\.(test|spec)?\\.(ts|tsx)$',
    testPathIgnorePatterns: ["sample", "node_modules"],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};