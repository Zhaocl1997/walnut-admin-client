import type { ComputedRef } from '@vue/reactivity'
import type { WFormProps } from './formProps'

/**
 * @description WForm context type definition
 */
export interface WFormContext {
  formProps: ComputedRef<WFormProps>
}
