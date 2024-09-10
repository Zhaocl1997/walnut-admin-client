export * from './src/types'

export { default } from './src/index.vue'

export interface ICompExtraTextScrollProps {
  texts?: string[]
  speed?: number
  mode?: 'vertical' | 'horizontal'
}
