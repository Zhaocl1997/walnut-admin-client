import type { WCheckboxProps } from '@/components/UI/Checkbox'
import type { WRadioProps } from '@/components/UI/Radio'
import type { WSelectProps } from '@/components/UI/Select'

export interface WFormItemDividerProps {
  titlePlacement?: 'left' | 'right' | 'center'
  dashed?: boolean
  prefix?: 'bar' | undefined
  type?: NaiveCompType
  title?: string
  helpMessage?: string | boolean
  foldable?: boolean
  startIndex?: number
  endIndex?: number
  index?: number
  titleClass?: string
}

export interface WFormItemQueryProps {
  countToFold?: number
  foldable?: boolean
  defaultFold?: boolean
}

interface WFormItemDictSelectProps {
  dictType: string
  dictRenderType?: 'select'
  renderComponentProps?: WSelectProps
}

interface WFormItemDictCheckboxProps {
  dictType: string
  dictRenderType?: 'checkbox'
  renderComponentProps?: WCheckboxProps
}

interface WFormItemDictRadioProps {
  dictType: string
  dictRenderType?: 'radio'
  renderComponentProps?: WRadioProps
}

export type WFormItemDictProps =
  | WFormItemDictSelectProps
  | WFormItemDictCheckboxProps
  | WFormItemDictRadioProps
