const path = require('path')
module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    settings: {
        'import/resolver': {
            alias: {
                map: [ [ '@/*', path.resolve(__dirname, 'src') ] ],
            },
        },
    },
    overrides: [ {
        files: [ '**/src/**/*.{test,stories}.{ts,tsx}' ],
        rules: {
            'max-len': 'off',
        },
    } ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
    },
    plugins: [ 'react', '@typescript-eslint', 'react-hooks' ],
    rules: {
        indent: [ 'error', 4, { 'SwitchCase': 1 } ],
        '@typescript-eslint/indent': [ 'error', 4 ],
        '@typescript-eslint/no-var-requires': 'warn',
        '@typescript-eslint/ban-ts-comment': 'warn',
        'react/jsx-indent': [ 2, 4 ],
        'react/jsx-filename-extension': [ 2, {
            extensions: [ '.js', '.jsx', '.tsx' ],
        } ],
        'import/no-unresolved': 'off',
        'no-unused-vars': 'warn',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'no-undef': 'off',
        'quotes': [ 'error', 'single' ],
        'max-len': [ 'error', {
            ignoreComments: true,
            code: 120,
        } ],
        'comma-dangle': [ 'error', {
            arrays: 'always-multiline',
            objects: 'always-multiline',
            imports: 'always-multiline',
            exports: 'always-multiline',
            functions: 'never',
        } ],
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'react/display-name': 'off',
        'no-underscore-dangle': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'object-curly-spacing': [ 'error', 'always' ],
        'array-bracket-spacing': [ 'error', 'always' ],
    },
    globals: {
        __IS_DEV__: true,
        __API__: true,
        __PROJECT__: true,
    },
}
