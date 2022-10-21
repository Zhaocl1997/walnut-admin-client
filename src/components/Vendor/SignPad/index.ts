export * from './types'

export default createAsyncComponent(() => import('./index.vue'))
