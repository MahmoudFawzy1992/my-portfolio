import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tsParser from '@typescript-eslint/parser';
import globals from 'globals';
export default [
  { ignores: ['dist/**', 'node_modules/**', '.astro/**', 'tmp/**', 'output/**'] },
  js.configs.recommended,
  ...astro.configs['flat/recommended'],
  { files: ['**/*.{js,mjs,ts,astro}'], languageOptions: { globals: { ...globals.browser, ...globals.node }, parserOptions: { ecmaVersion: 'latest', sourceType: 'module' } }, rules: { 'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }] } },
  { files: ['**/*.ts'], languageOptions: { parser: tsParser } },
];
