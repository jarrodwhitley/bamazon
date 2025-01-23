import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import typescriptParser from '@typescript-eslint/parser'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import stylisticJs from '@stylistic/eslint-plugin-js'

export default [
    {
        files: ['src/*.ts', 'src/*.tsx', 'src/**/*.ts', 'src/**/*.tsx'],
        languageOptions: {
            parser: typescriptParser,
            ecmaVersion: 2020,
            sourceType: 'module',
        },
        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            '@typescript-eslint': typescriptPlugin,
            '@stylistic/js': stylisticJs,
        },
        rules: {
            'react/jsx-no-target-blank': 'off',
            'no-unused-vars': 'off',
            'react-refresh/only-export-components': ['warn', {allowConstantExport: true}],
            '@typescript-eslint/explicit-function-return-type': 'warn',
            '@typescript-eslint/no-explicit-any': 'warn',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', {argsIgnorePattern: '^_'}],
            '@stylistic/js/object-curly-spacing': ['error', 'always'],
        },
    },
]
