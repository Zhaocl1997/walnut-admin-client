export { default } from './index.vue'

export interface ICompUIFormItemExtendDividerProps {
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
