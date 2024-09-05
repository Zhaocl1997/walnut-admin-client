export { default } from './index.vue'

export interface ICompExtraFlipperProps {
  width: string
  height: string
  duration: string
  transitionTimingFunction: string
  trigger: 'click' | 'hover'
  defaultFace: boolean
}

export type ICompExtraFlipperPropsPartial = Partial<ICompExtraFlipperProps>
