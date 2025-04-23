import type { ButtonProps } from 'naive-ui'

export { default } from './index.vue'

export interface ICompUIButtonProps extends /* @vue-ignore */ ButtonProps {
  icon?: string
  textProp?: string | Fn<VNodeChild>
  debounce?: number
  onClick?: (e: MouseEvent) => void
}
