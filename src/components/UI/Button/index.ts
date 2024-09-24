export { default } from './index.vue'

export interface ICompUIButtonProps {
  icon?: string
  textProp?: string | Fn<VNodeChild>
  debounce?: number
}
