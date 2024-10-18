import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 2021, // Use the latest ECMAScript version
        sourceType: 'module', // Enable ES6 modules
      },
    },
    rules: {
      quotes: ['error', 'single'], // Enforce single quotes
      semi: ['error', 'always'], // Enforce semicolons
      // Add more rules as needed
    },
  },
  pluginJs.configs.recommended,
];
