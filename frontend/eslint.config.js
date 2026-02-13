import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'eslint/config';
import prettier from 'eslint-config-prettier/flat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([
  {
    files: ['**/*.ts', '**/*.js', '**/*.tsx', '**/*.jsx'],
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'node_modules/**',
      'next-env.d.ts',
      'src/components/ui/**',
      'src/components/primitives/**',
    ],
    languageOptions: {
      parser: (await import('@typescript-eslint/parser')).default,
      parserOptions: {
        project: ['./tsconfig.json', './tsconfig.node.json'],
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { legacyDecorators: true },
      },
    },
    plugins: {
      '@typescript-eslint': (await import('@typescript-eslint/eslint-plugin')).default,
      import: (await import('eslint-plugin-import')).default,
      'unused-imports': (await import('eslint-plugin-unused-imports')).default,
      // custom: {
      //   rules: {
      //     'require-with-schema': requireWithSchemaRule,
      //   },
      // },
    },
    rules: {
      'no-console': 'warn',
      eqeqeq: 'error',
      semi: ['error', 'always'],
      'no-var': 'error',
      'prefer-const': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      'no-duplicate-imports': 'error',
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector:
            "JSXOpeningElement[name.type='JSXIdentifier'][name.name=/^(div|span|p|h1|h2|h3|h4|h5|h6|section|article|main|aside|header|footer|nav|form|label|input|textarea|select|option|button|a|ul|ol|li|table|thead|tbody|tr|th|td)$/]",
          message:
            'Nao use tags HTML diretas no app. Use componentes de UI/primitives (ex: Box, Text, Stack, Button, Input, AppLink, Field).',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      //! 'custom/require-with-schema': 'error', // Nova regra customizada
    },
  },
  prettier,
]);
