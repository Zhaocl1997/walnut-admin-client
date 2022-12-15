process.env.ESLINT_TSCONFIG = 'tsconfig.json'

module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    // 'plugin:vue/vue3-recommended',
    // 'plugin:@typescript-eslint/recommended',
    '@antfu',
  ],
  rules: {
    // "off" or 0 - turn the rule off
    // "warn" or 1 - turn the rule on as a warning (doesn't affect exit code)
    // "error" or 2 - turn the rule on as an error (exit code will be 1)
    // '@typescript-eslint/no-explicit-any': 0,
    // '@typescript-eslint/ban-ts-comment': 0,
    // '@typescript-eslint/no-empty-function': 0,
    // '@typescript-eslint/no-unused-vars': 0,
    // '@typescript-eslint/ban-types': 0,
    // '@typescript-eslint/no-namespace': 0,
    // '@typescript-eslint/no-non-null-asserted-optional-chain': 1,
  },
}
