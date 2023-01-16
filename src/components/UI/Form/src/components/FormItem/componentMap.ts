import { NDynamicInput, NSlider, NTreeSelect } from 'naive-ui'
import { BUILTIN_FORM_TYPE } from '../../types'

/**
 * @description Generate all usable components through `BUILTIN_FORM_TYPE`.
 * Problems:
 *  1. Need to have same structure as examples if want to add new component
 *  2. Need to add corresponding `TYPE` to `BUILTIN_FORM_TYPE`
 */
const getAllComponents = (type: typeof BUILTIN_FORM_TYPE) => {
  const ret: any = {}

  type.forEach((key) => {
    // https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
    // Below for prod, no alias and must point to file with extension
    ret[key] = createAsyncComponent(() => import(`../../../../${key}/index.ts`))
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
componentMap.set(
  'IconPicker',
  createAsyncComponent(
    // @ts-expect-error
    () => import('../../../../../Extra/IconPicker/index.ts'),
  ),
)
componentMap.set(
  'TransitionSelect',
  createAsyncComponent(
    // @ts-expect-error
    () => import('../../../../../Extra/TransitionSelect/index.tsx'),
  ),
)
componentMap.set(
  'RoleSelect',
  createAsyncComponent(
    // @ts-expect-error
    () => import('../../../../../Advanced/RoleSelect/index.ts'),
  ),
)
componentMap.set(
  'Tinymce',
  createAsyncComponent(
    // @ts-expect-error
    () => import('../../../../../Vendor/Tinymce/index.ts'),
  ),
)
componentMap.set(
  'AreaCascader',
  createAsyncComponent(
    // @ts-expect-error
    () => import('../../../../../Advanced/AreaCascader/index.ts'),
  ),
)
componentMap.set(
  'Dict',
  createAsyncComponent(
    // @ts-expect-error
    () => import('../Extend/Dict.vue'),
  ),
)
componentMap.set(
  'LocaleSelect',
  createAsyncComponent(
    // @ts-expect-error
    () => import('../../../../../Extra/LocaleSelect/index.ts'),
  ),
)
componentMap.set(
  'Password',
  createAsyncComponent(
    // @ts-expect-error
    () => import('../../../../../Extra/Password/index.ts'),
  ),
)
componentMap.set(
  'SMSInput',
  createAsyncComponent(
    // @ts-expect-error
    () => import('../../../../../Extra/SMSInput/index.ts'),
  ),
)

BUILTIN_FORM_TYPE.forEach((key) => {
  componentMap.set(key, allComponents[key])
})

export { componentMap }
