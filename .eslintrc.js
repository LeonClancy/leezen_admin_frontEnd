module.exports = {
    root: true,
    extends: ['plugin:nuxt/recommended', 'plugin:vue/vue3-essential', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: '@typescript-eslint/parser'
    },
     plugins: [
        'vue',
        '@typescript-eslint'
    ],
    rules: {
        'vue/multi-word-component-names': 'off',
        'vue/no-reserved-component-names': 'off',
    }
}