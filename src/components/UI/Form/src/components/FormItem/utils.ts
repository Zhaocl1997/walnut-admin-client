import { BUILTIN_FORM_TYPE } from '../../types'
import { createAsyncComponent } from '/@/utils/factory/asyncComponent'

import { NSlider, NDynamicInput, NTreeSelect, NTree } from 'naive-ui'
import WIconPicker from '/@/components/Extra/IconPicker'

/**
 * @description Generate all usable components through `BUILTIN_FORM_TYPE`.
 * Problems:
 *  1. Need to have same structure as examples if want to add new component
 *  2. Need to add corresponding `TYPE` to `BUILTIN_FORM_TYPE`
 */
const getAllComponents = (type: typeof BUILTIN_FORM_TYPE) => {
  const ret: any = {}
  Object.entries(type).map(([key, value]) => {
    // Below for prod, no alias and must point to index.vue but not index.ts
    ret[value] = createAsyncComponent(
      () => import(`../../../../${value}/src/index.vue`)
    )
  })
  return ret
}

// Form component map
const componentMap = new Map()
const allComponents = getAllComponents(BUILTIN_FORM_TYPE)

// set extra component here
componentMap.set('Slider', NSlider)
componentMap.set('DynamicInput', NDynamicInput)
componentMap.set('TreeSelect', NTreeSelect)
componentMap.set('Tree', NTree)
componentMap.set('IconPicker', WIconPicker)

Object.values(BUILTIN_FORM_TYPE).map((value) => {
  componentMap.set(value, allComponents[value])
})

export { componentMap }
