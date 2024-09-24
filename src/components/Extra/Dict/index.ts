import type { WCheckboxProps } from '@/components/UI/Checkbox'
import type { WRadioProps } from '@/components/UI/Radio'
import type { WSelectProps } from '@/components/UI/Select'

export type IDictType = 'select' | 'checkbox' | 'radio'

export interface IDictProps {
  dictType: string
  dictRenderType?: IDictType
  renderComponentProps?: WSelectProps | WCheckboxProps | WRadioProps
}

export { default } from './index.vue'
