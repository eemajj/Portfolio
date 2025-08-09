module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'react-app',
    'react-app/jest'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
    // Disable unused vars warning for React import (common with JSX Transform)
    'no-unused-vars': ['warn', { 
      'varsIgnorePattern': '^React$',
      'argsIgnorePattern': '^_'
    }],
    // Allow console statements in development
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    // Prefer const over let when possible
    'prefer-const': 'error',
    // Ensure consistent spacing
    'object-curly-spacing': ['error', 'always'],
    'array-bracket-spacing': ['error', 'never'],
    // Semicolon rules
    'semi': ['error', 'always'],
    // Quote consistency
    'quotes': ['error', 'single', { 'avoidEscape': true }],
    // Trailing comma
    'comma-dangle': ['error', 'never'],
    // Consistent function declarations
    'func-style': ['error', 'declaration', { 'allowArrowFunctions': true }]
  }
};