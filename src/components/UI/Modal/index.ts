import type { ModalProps } from 'naive-ui'

export { default } from './src/index.vue'

export interface ICompUIModalProps extends /* @vue-ignore */ ModalProps {
  loading?: boolean
  title?: string
  helpMessage?: string
  width?: string
  height?: string
  draggable?: boolean
  fullscreen?: boolean
  defaultButton?: boolean
  segmented?: boolean
}
