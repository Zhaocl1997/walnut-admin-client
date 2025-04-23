import type { PopconfirmProps } from 'naive-ui'
import type { ICompUIButtonProps } from '../Button'

export { default } from './index.vue'

export interface ICompUIButtonConfirmProps extends /* @vue-ignore */ PopconfirmProps {
  confirmMsg?: string
  buttonProps?: ICompUIButtonProps
}
