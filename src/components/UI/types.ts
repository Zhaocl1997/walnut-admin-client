import type { MaybeRef } from '/~/utils'

export type ValueFormatType = 'string' | 'number'

/**
 * @description Multiple type component like `Checkbox`/`Select` etc shared props
 */
export interface MultiTypeCompSharedPropType {
  /**
   * @description Options to render.Make sure item in options have same structure.
   * @default []
   */
  options: MaybeRef<BaseOptionItemType>[]

  /**
   * @description Option's real value filed. Default 'value'.
   * @default value
   */
  optionValue: MaybeRef<string>

  /**
   * @description Option's display label field. Default 'label'.
   * @default label
   */
  optionLabel: MaybeRef<string>

  /**
   * @description v-model value type to specific.
   * If got modelValue like [1, 2, 3], it will convert into arr like ['1', '2', '3'].
   * It's used for some cases when feedback would fail just because of value type does not match the `value` field in `options`.
   * @default string
   */
  // TODO
  // valueType: ValueFormatType

  /**
   * @description v-model value structure to specific.
   * It's used for some cases multiple value need to format into string which like separated by `,`.
   * @example valueFormat => ','  modelValue: [1,2,3] => '1,2,3'
   */
  // TODO
  // valueFormat: string

  /**
   * @description Fit for same structured API.
   * @default false
   */
  multiple: boolean
}
