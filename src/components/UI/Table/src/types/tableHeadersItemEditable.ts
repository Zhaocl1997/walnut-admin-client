import type { WInputProps } from '../../../Input'
import type { WInputNumberProps } from '../../../InputNumber'
import type { WSelectProps } from '../../../Select'
import type { WSwitchProps } from '../../../Switch'
import { WTableEditCellEmitParams } from './tableContext'

/**
 * @description custom editable column type
 */
type WTableEditableColumnCustomProp<E, P> = {
  editType: E
  editTypeComponentProps: P
}

export type WTableEditableColumnInput = WTableEditableColumnCustomProp<
  'input',
  WInputProps
>

export type WTableEditableColumnInputNumber = WTableEditableColumnCustomProp<
  'inputNumber',
  WInputNumberProps
>

export type WTableEditableColumnSelect = WTableEditableColumnCustomProp<
  'select',
  WSelectProps
>

export type WTableEditableColumnSwitch = WTableEditableColumnCustomProp<
  'switch',
  // override `beforeChange` prop
  Omit<WSwitchProps, 'beforeChange'> & {
    beforeChange: (val: WTableEditCellEmitParams) => Promise<boolean> | boolean
  }
>

/**
 * @description extend type for `type='editable'` column
 */
export type WTableEditableColumnProps =
  | WTableEditableColumnInput
  | WTableEditableColumnSelect
  | WTableEditableColumnInputNumber
  | WTableEditableColumnSwitch
