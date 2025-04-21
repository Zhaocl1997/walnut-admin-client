import { disableCache, enableCache } from '@iconify/vue'
import '/build/_generated/icon-bundle.ts'
import { IconBundleConfig } from '/build/icon/src/config.ts'

if (!IconBundleConfig.cache)
  disableCache('all')
else
  enableCache('local')

export { default } from './index.vue'
