/* global module */

module.exports = {
    setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
    reporters: [
        'default',
        'jest-junit',
    ],
    coverageDirectory: 'artifacts/coverage',
    testEnvironment: 'jsdom',
    collectCoverageFrom: [
        'src/**/*.js',
    ],
};
