import { disableCache, enableCache } from '@iconify/vue'
import { IconBundleConfig } from '/build/icon/src/config.ts'
import '/build/_generated/icon-bundle.ts'

if (!IconBundleConfig.cache)
  disableCache('all')
else
  enableCache('local')

export * from './src/types'
export { default } from './src/index.vue'
