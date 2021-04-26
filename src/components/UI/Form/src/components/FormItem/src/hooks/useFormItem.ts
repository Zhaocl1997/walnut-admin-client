import type { WFormItemProp, WFormSchemaItem } from '../../../../types'
import { isBoolean, isFunction, isUndefined } from 'easy-fns-ts'
import { componentMap } from '../utils/componentMap'

export const useFormItem = (props: WFormItemProp, ctx: any) => {
  const { item } = props

  const component = componentMap.get(item.type)
  const propName = item.formProp && item.formProp.prop
  const componentProps = item.componentProp || {}

  console.log(ctx)

  const calcVisible = (item: WFormSchemaItem) => {
    const { visible } = item

    if (isUndefined(visible)) {
      return true
    }

    if (isFunction(visible)) {
      // @ts-ignore
      // TODO ts error
      return visible!({ formData: ctx.modelValue })
    }

    if (isBoolean(visible)) {
      return visible
    }
  }

  return {
    component,
    propName,
    componentProps,
    calcVisible,
  }
}
