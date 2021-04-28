import { FORM_TYPE } from '/@/components/UI/Form/src/types'
import { createAsyncComponent } from '/@/utils/factory/asyncComponent'

/**
 * @description Generate all usable components through `FORM_TYPE`.
 * Problems:
 *  1. Need to have same structure as examples if want to add new component
 *  2. Need to add corresponding `TYPE` to `FORM_TYPE`
 */
const getAllComponents = (type: typeof FORM_TYPE) => {
  const ret: any = {}
  Object.entries(type).map(([key, value]) => {
    // Below for prod, no alias and must point to index.vue but not index.ts
    ret[value] = createAsyncComponent(
      () => import(`../../../../../../../components/UI/${value}/src/index.vue`)
    )
  })
  return ret
}

/**
 * @description Form component map
 */
const componentMap = new Map()
const allComponents = getAllComponents(FORM_TYPE)

/**
 * @description Common component
 */
Object.values(FORM_TYPE).map((value) => {
  componentMap.set(value, allComponents[value])
})

export { componentMap }
