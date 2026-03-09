const typescriptParser = require('@typescript-eslint/parser');
const eslintConfigPrettier = require('eslint-config-prettier');
const prettierPlugin = require('eslint-plugin-prettier');
const simpleImportSort = require('eslint-plugin-simple-import-sort');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = [
    {
        files: ['**/*.js', '**/*.ts'],
        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                sourceType: 'module',
                ecmaVersion: 2017
            },
            globals: {
                pendo: 'readonly',
                vi: 'readonly'
            }
        },
        plugins: {
            prettier: prettierPlugin,
            'simple-import-sort': simpleImportSort,
            'unused-imports': unusedImports
        },
        rules: {
            ...eslintConfigPrettier.rules,
            'prettier/prettier': ['warn', { endOfLine: 'auto' }],
            'no-console': 'off',
            'no-redeclare': 'off',
            'import/no-anonymous-default-export': 'off',
            'no-unused-vars': 'off',
            'simple-import-sort/imports': [
                'warn',
                {
                    groups: [
                        ['^(@|components)(/.*|$)'],
                        ['^\\u0000'],
                        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                        ['^.+\\.?(css)$']
                    ]
                }
            ],
            'simple-import-sort/exports': 'warn',
            'unused-imports/no-unused-imports': 'warn',
            'padding-line-between-statements': [
                'warn',
                { blankLine: 'always', prev: 'import', next: ['const', 'let', 'var', 'expression'] },
                { blankLine: 'always', prev: '*', next: ['class', 'function', 'return', 'block-like'] }
            ]
        }
    }
];
