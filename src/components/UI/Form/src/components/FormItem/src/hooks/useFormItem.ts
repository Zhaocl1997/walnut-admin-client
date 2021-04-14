import { WFormItemProp } from '../../../../types'
import { componentMap } from '../utils/componentMap'

export const useFormItem = (props: WFormItemProp) => {
  const { item } = props

  const component = componentMap.get(item.type)
  const propName = item.formProp && item.formProp.prop
  const componentProps = item.componentProp || {}

  return {
    component,
    propName,
    componentProps,
  }
}
