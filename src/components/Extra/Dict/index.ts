import type { ICompUICheckboxProps } from '@/components/UI/Checkbox'
import type { ICompUIRadioProps } from '@/components/UI/Radio'
import type { ICompUISelectProps } from '@/components/UI/Select'

export type ICompExtraDictRenderType = 'select' | 'checkbox' | 'radio'

interface ICompExtraDictSelect {
  dictType: string
  dictRenderType?: 'select'
  renderComponentProps?: ICompUISelectProps
}

interface ICompExtraDictCheckbox {
  dictType: string
  dictRenderType?: 'checkbox'
  renderComponentProps?: ICompUICheckboxProps
}

interface ICompExtraDictRadio {
  dictType: string
  dictRenderType?: 'radio'
  renderComponentProps?: ICompUIRadioProps
}

export type ICompExtraDictProps = ICompExtraDictSelect | ICompExtraDictCheckbox | ICompExtraDictRadio

export { default } from './index.vue'
