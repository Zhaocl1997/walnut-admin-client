import type { ButtonGroupProps } from 'naive-ui'
import type { ICompUIButtonProps } from '../Button'

export { default } from './index.vue'

export interface ICompUIButtonGroupProps extends /* @vue-ignore */ ButtonGroupProps {
  groups: ICompUIButtonProps[]
}
