import type { SwitchProps } from 'naive-ui'

export interface ICompUISwitchPropsExtend {
  checkedText?: string
  uncheckedText?: string
}

export interface ICompUISwitchProps extends /* @vue-ignore */ SwitchProps, ICompUISwitchPropsExtend { }

export { default } from './index.vue'
