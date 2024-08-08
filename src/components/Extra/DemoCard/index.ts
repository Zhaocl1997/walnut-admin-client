export { default } from './index.vue'

export interface ICompExtraDemoCardProps {
  title: string
  description: string | string[]
}

export type ICompExtraDemoCardPropsPartial = Partial<ICompExtraDemoCardProps>
