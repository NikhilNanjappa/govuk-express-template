module.exports = {
  root: true,
  globals: {
    cy: true,
  },
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    '@dwp/eslint-config-base',
    'plugin:cypress/recommended',
  ],
  overrides: [
    {
      files: [
        '**/*.test.js',
        '**/*.test.jsx',
      ],
      env: {
        jest: true,
      },
    },
  ],
  rules: {
    'no-restricted-exports': 0,
    'no-nested-ternary': 'off',
    'prefer-promise-reject-errors': 'off',
    'import/no-import-module-exports': 0,
    'no-param-reassign': [2, { props: false }],
  },
  parserOptions: {
    ecmaVersion: '2020',
  },
};
