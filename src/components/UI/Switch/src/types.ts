import type { SwitchProps } from 'naive-ui'

export interface ICompUISwitchPropsExtend {
  checkedText: string
  uncheckedText: string
}

export interface ICompUISwitchProps extends SwitchProps, ICompUISwitchPropsExtend {}

export type ICompUISwitchPropsPartial = Partial<ICompUISwitchProps>
