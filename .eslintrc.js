module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: ['gbx', 'gbx/react', 'gbx/typescript'],
  rules: {
    'react/jsx-no-bind': [0],
    'react/require-default-props': [0],
    'react/function-component-definition': [0],
    'simple-import-sort/imports': [
      'error',
      {
        // The default grouping, but with no blank lines.
        groups: [['^\\u0000', '^@?\\w', '^', '^\\.']],
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      2,
      {
        allowExpressions: true,
      },
    ],
    'import/no-unresolved': [0],
  },
};
