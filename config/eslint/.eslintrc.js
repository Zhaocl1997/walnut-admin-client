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
  },
}
