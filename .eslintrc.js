module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'next/core-web-vitals',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': ['warn', {
      'varsIgnorePattern': '^React$',
      'argsIgnorePattern': '^_'
    }],
    'no-console': 'warn',
    'prefer-const': 'error',
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    'semi': ['error', 'always'],
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    'comma-dangle': ['error', 'never'],
    'func-style': ['error', 'declaration', { 'allowArrowFunctions': true }]
  }
};
