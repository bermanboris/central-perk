module.exports = function(wallaby) {
  return {
    files: [
      'jest/setup-tests.js',
      '.env.test',
      'tsconfig.json',
      'src/**/*.ts',
      '!src/**/__tests__/*.ts',
    ],
    tests: ['src/**/__tests__/*.ts'],
    env: {
      type: 'node',
      runner: 'node',
    },
    testFramework: 'jest',
    compilers: {
      '**/*.js?(x)': wallaby.compilers.babel(),
      '**/*.ts?(x)': wallaby.compilers.babel(),
    },
    preprocessors: {
      '**/*.js?(x)': file =>
        require('@babel/core').transform(file.content, {
          sourceMap: true,
          // compact: false,
          filename: file.path,
          presets: ['@babel/preset-env', 'babel-preset-jest'],
          plugins: ['jest-hoist'],
        }),
    },
  };
};
