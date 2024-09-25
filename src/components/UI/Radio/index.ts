import type { RadioGroupProps, RadioProps } from 'naive-ui'

export { default } from './index.vue'

// TODO 000
export interface ICompUIRadioProps extends /* @vue-ignore */ RadioGroupProps {
  options: RadioProps[]
  button?: boolean
}
