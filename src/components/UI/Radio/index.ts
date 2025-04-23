import type { RadioGroupProps, RadioProps } from 'naive-ui'

import { WithValue } from '@/components/HOC/WithValue'
import RawWRadio from './index.vue'

export default WithValue(RawWRadio)

// TODO 000
export interface ICompUIRadioProps extends /* @vue-ignore */ RadioGroupProps {
  options: RadioProps[]
  button?: boolean
}
