import js from '@eslint/js';
import tseslint from 'typescript-eslint';

const nodeGlobals = {
  Buffer: 'readonly',
  console: 'readonly',
  process: 'readonly',
  URL: 'readonly',
};

export default tseslint.config(
  { ignores: ['dist/**', '.astro/**', 'public/**', '**/*.astro'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.mjs'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: nodeGlobals,
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
);
