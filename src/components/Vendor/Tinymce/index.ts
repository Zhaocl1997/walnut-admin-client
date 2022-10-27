export * from './src/types'

export default createAsyncComponent(() => import('./src/index.vue'))
