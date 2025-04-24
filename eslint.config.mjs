// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    unocss: true,
    rules: {
      // LINK reasonable https://stackoverflow.com/a/78566802
      'ts/no-namespace': 'off',
      'no-console': 'off',
    },
  },
)
