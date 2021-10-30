module.exports = {
  extends: ['rami'],
  ignorePatterns: ['/*config.js', '/*rc.js'],
  parserOptions: { project: './tsconfig.eslint.json' },
  overrides: [
    {
      files: ['src/models/*.ts'],
      rules: { 'func-names': 0, 'import/no-cycle': 0 }
    },
    {
      files: ['./*.ts', 'src/utils/TestUtils.ts'],
      rules: { 'import/no-extraneous-dependencies': 0 }
    },
    {
      files: ['*.test.ts'],
      rules: { 'max-lines-per-function': 0 }
    }
  ],
  rules: {
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'class-methods-use-this': 0,
    'max-lines-per-function': ['error', { max: 75, skipComments: true }],
    'no-underscore-dangle': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ]
  }
};
