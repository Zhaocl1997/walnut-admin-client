export { default } from './index.vue'

export interface WVerifyInst {
  onOpenModal: Fn
}

export interface ICompExtraVerifyProps {
  canvasWidth?: number
  canvasHeight?: number
  // 拼图块的大小缩放比例
  puzzleScale?: number
  // 滑块的大小
  sliderSize?: number
  // 允许的偏差值
  range?: number
  imgs?: string[]
}
