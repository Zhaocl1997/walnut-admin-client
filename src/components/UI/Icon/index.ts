import { disableCache } from '@iconify/vue'
disableCache('all')

// import bundle start
import '/build/_generated/icon-bundle.ts'
// import bundle end

export * from './src/types'
export { default } from './src/index.vue'
