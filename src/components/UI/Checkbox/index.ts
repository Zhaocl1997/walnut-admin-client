import type { CheckboxGroupProps, CheckboxProps } from 'naive-ui'

export { default } from './index.vue'

// TODO 000
export interface ICompUICheckboxProps extends /* @vue-ignore */ CheckboxGroupProps {
  options: CheckboxProps[]
}
