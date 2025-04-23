import type { ButtonProps } from 'naive-ui'

export { default } from './index.vue'

// TODO 000
export interface ICompUIButtonProps extends /* @vue-ignore */ ButtonProps {
  icon?: string
  textProp?: string | Fn<VNodeChild>
  debounce?: number
  onClick?: (e: MouseEvent) => void
}
