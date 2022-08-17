import { BUILTIN_FORM_TYPE } from '../../types'

import { NSlider, NDynamicInput, NTreeSelect } from 'naive-ui'

/**
 * @description Generate all usable components through `BUILTIN_FORM_TYPE`.
 * Problems:
 *  1. Need to have same structure as examples if want to add new component
 *  2. Need to add corresponding `TYPE` to `BUILTIN_FORM_TYPE`
 */
const getAllComponents = (type: typeof BUILTIN_FORM_TYPE) => {
  const ret: any = {}

  type.map((key) => {
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
    // @ts-ignore
    () => import('../../../../../Extra/IconPicker/index.ts')
  )
)
componentMap.set(
  'TransitionSelect',
  createAsyncComponent(
    // @ts-ignore
    () => import('../../../../../Extra/TransitionSelect/index.tsx')
  )
)
componentMap.set(
  'RoleSelect',
  createAsyncComponent(
    // @ts-ignore
    () => import('../../../../../Advanced/RoleSelect/index.ts')
  )
)
componentMap.set(
  'Tinymce',
  createAsyncComponent(
    // @ts-ignore
    () => import('../../../../../Vendor/Tinymce/index.ts')
  )
)
componentMap.set(
  'AreaCascader',
  createAsyncComponent(
    // @ts-ignore
    () => import('../../../../../Advanced/AreaCascader/index.ts')
  )
)
componentMap.set(
  'Dict',
  createAsyncComponent(
    // @ts-ignore
    () => import('../Extend/Dict.vue')
  )
)
componentMap.set(
  'Locale',
  createAsyncComponent(
    // @ts-ignore
    () => import('../../../../../Advanced/LocaleSelect/index.ts')
  )
)
componentMap.set(
  'Password',
  createAsyncComponent(
    // @ts-ignore
    () => import('../../../../../Extra/Password/index.ts')
  )
)
componentMap.set(
  'SMSInput',
  createAsyncComponent(
    // @ts-ignore
    () => import('../../../../../Extra/SMSInput/index.ts')
  )
)

BUILTIN_FORM_TYPE.map((key) => {
  componentMap.set(key, allComponents[key])
})

export { componentMap }
