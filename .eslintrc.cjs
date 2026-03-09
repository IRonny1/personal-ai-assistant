module.exports = {
    env: {
        browser: true,
        es6: true,
        node: true
    },
    extends: ['prettier'],
    plugins: ['prettier', 'simple-import-sort', 'unused-imports'],
    overrides: [
        {
            files: ['*.js', '*.ts'],
            rules: {
                'import/no-anonymous-default-export': 'off',
                'no-unused-vars': 'off',
                'simple-import-sort/imports': [
                    'warn',
                    {
                        groups: [
                            // Internal packages.
                            ['^(@|components)(/.*|$)'],
                            // Side effect imports.
                            ['^\\u0000'],
                            // Parent imports. Put `..` last.
                            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                            // Other relative imports. Put same-folder imports and `.` last.
                            ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                            // Style imports.
                            ['^.+\\.?(css)$']
                        ]
                    }
                ]
            }
        }
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: '8',
        requireConfigFile: false
    },
    globals: {
        pendo: true,
        vi: true
    },
    rules: {
        'prettier/prettier': [
            'warn',
            {
                endOfLine: 'auto'
            }
        ],
        'no-console': ['warn'],
        'no-redeclare': 'off',
        'simple-import-sort/imports': 'warn',
        'simple-import-sort/exports': 'warn',
        'unused-imports/no-unused-imports': 'warn',
        'padding-line-between-statements': [
            'warn',
            { blankLine: 'always', prev: 'import', next: ['const', 'let', 'var', 'expression'] },
            { blankLine: 'always', prev: '*', next: ['class', 'function', 'return', 'block-like'] }
        ]
    }
};
