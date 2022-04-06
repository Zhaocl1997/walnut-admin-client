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
}

export interface WFormItemQueryProps {
  countToFold?: number
  foldable?: boolean
  defaultFold?: boolean
}
