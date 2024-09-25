import type { SelectProps, TooltipProps } from 'naive-ui'

export { default } from './index.vue'

// TODO 000
export interface ICompUISelectProps extends /* @vue-ignore */ SelectProps {
  tooltip?: boolean
  tooltipProps?: TooltipProps
}
