module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        // Mocks CSS imports (so imports like 'import "./App.css"' don't break tests)
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        // Mocks images
        '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
    transform: {
        // Use babel-jest to compile JS/JSX files
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
};