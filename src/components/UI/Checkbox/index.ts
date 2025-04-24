import type { CheckboxProps } from 'naive-ui'

import { WithValue } from '@/components/HOC/WithValue'
import RawWCheckBox from './index.vue'

export default WithValue<ICompUICheckboxProps>(RawWCheckBox)

// TODO 000
export interface ICompUICheckboxProps extends /* @vue-ignore */ CheckboxProps {
  options: CheckboxProps[]
}
