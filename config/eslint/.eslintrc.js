process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  extends: [
    '@antfu',
  ],
  rules: {
    // "off" or 0 - turn the rule off
    // "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
    // "error" or 2 - turn the rule on as an error (exit code will be 1)

    // fix https://github.com/vuejs/eslint-plugin-vue/issues/1577#issuecomment-1152534096
    'import/first': 'off',
    'no-console': 'off',
    'no-lone-blocks': 'off',
    'import/no-mutable-exports': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-unsafe-member-access': 'off',
    '@typescript-eslint/no-unsafe-return': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
  },
}
