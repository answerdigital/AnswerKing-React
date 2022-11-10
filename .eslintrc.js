module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-no-bind': [0],
    'react/require-default-props': [0],
    'react/function-component-definition': [0],

    '@typescript-eslint/explicit-function-return-type': [
      2,
      {
        allowExpressions: true,
      },
    ],
    'import/no-unresolved': [0],

    'react/prop-types': 'off',
    indent: ['error', 2],
    'linebreak-style': ['error', 'windows'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'max-len': [
      'error',
      {
        code: 120,
      },
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: { multiline: true },
        ObjectPattern: { multiline: true },
        ImportDeclaration: 'never',
        ExportDeclaration: { multiline: true, minProperties: 3 },
      },
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
