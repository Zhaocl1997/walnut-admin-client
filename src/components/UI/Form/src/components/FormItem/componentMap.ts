import { NDynamicInput, NSlider, NTreeSelect } from 'naive-ui'
import { BUILTIN_FORM_TYPE } from '../../types'

/**
 * @description Generate all usable components through `BUILTIN_FORM_TYPE`.
 * Problems:
 *  1. Need to have same structure as examples if want to add new component
 *  2. Need to add corresponding `TYPE` to `BUILTIN_FORM_TYPE`
 */
function getAllComponents(type: typeof BUILTIN_FORM_TYPE) {
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
    () => import('../../../../../Extra/IconPicker/index'),
  ),
)
componentMap.set(
  'TransitionSelect',
  createAsyncComponent(
    () => import('../../../../../Extra/TransitionSelect/index'),
  ),
)
componentMap.set(
  'RoleSelect',
  createAsyncComponent(
    () => import('../../../../../Advanced/RoleSelect/index'),
  ),
)
componentMap.set(
  'Tinymce',
  createAsyncComponent(
    () => import('../../../../../Vendor/Tinymce/index'),
  ),
)
componentMap.set(
  'AreaCascader',
  createAsyncComponent(
    () => import('../../../../../Advanced/AreaCascader/index'),
  ),
)
componentMap.set(
  'Dict',
  createAsyncComponent(
    () => import('../Extend/Dict.vue'),
  ),
)
componentMap.set(
  'LocaleSelect',
  createAsyncComponent(
    () => import('../../../../../Extra/LocaleSelect/index'),
  ),
)
componentMap.set(
  'Password',
  createAsyncComponent(
    () => import('../../../../../Extra/Password/index'),
  ),
)
componentMap.set(
  'SMSInput',
  createAsyncComponent(
    () => import('../../../../../Extra/SMSInput/index'),
  ),
)
componentMap.set(
  'PhoneNumberInput',
  createAsyncComponent(
    () => import('../../../../../Extra/PhoneNumberInput/index'),
  ),
)
componentMap.set(
  'EmailInput',
  createAsyncComponent(
    () => import('../../../../../Extra/EmailInput/index'),
  ),
)

BUILTIN_FORM_TYPE.forEach((key) => {
  componentMap.set(key, allComponents[key])
})

export { componentMap }
