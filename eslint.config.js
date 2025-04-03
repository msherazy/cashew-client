import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tsEslint from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';
import eslintImport from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tsEslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tsEslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    ignores: [
      'dist',
      'node_modules',
      'build',
      'logs',
      '*.log',
      'npm-debug.log*',
      'pnpm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      'lerna-debug.log*',
      '.DS_Store',
      'coverage',
      '.nyc_output',
      '.idea',
      '.project',
      '.classpath',
      '.c9/',
      '*.launch',
      '.settings/',
      '*.sublime-workspace',
      '.vscode/*',
      '!.vscode/settings.json',
      '!.vscode/tasks.json',
      '!.vscode/launch.json',
      '!.vscode/extensions.json',
      '.history',
      '.env',
      '.env.development.local',
      '.env.test.local',
      '.env.production.local',
      '.env.local',
      '.temp',
      '.tmp',
      'pids',
      '*.pid',
      '*.seed',
      '*.pid.lock',
      'report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json',
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier,
      import: eslintImport,
      react,
      'jsx-a11y': jsxA11y,
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          project: './tsconfig.json',
        },
        alias: {
          map: [['@', './src']],
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'prettier/prettier': 'error', // Prettier rule applied
      'import/prefer-default-export': 'off',
      'react/jsx-props-no-spreading': 'off',
      'no-underscore-dangle': 'off',
      'react/require-default-props': 'off',
      'react-refresh/only-export-components': 'off',
      'import/no-useless-path-segments': [
        'error',
        {
          noUselessIndex: true,
        },
      ],
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'sibling',
            'parent',
            'index',
          ],
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: './*.js',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '../*.js',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'no-eval': 'off',
      'no-await-in-loop': 'off',
      'no-restricted-syntax': 'off',
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
          unnamedComponents: 'arrow-function',
        },
      ],
      'react/jsx-uses-react': 'off',
      'react/jsx-filename-extension': [
        1,
        {
          extensions: ['.jsx', '.tsx'],
        },
      ],
      'jsx-a11y/label-has-associated-control': [
        2,
        {
          controlComponents: ['Select'],
          depth: 3,
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
    },
  },
);
