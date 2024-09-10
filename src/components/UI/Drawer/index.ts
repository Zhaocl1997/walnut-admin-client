import type { DrawerProps } from 'naive-ui'

export { default } from './index.vue'

export interface ICompUIDrawerProps extends /* @vue-ignore */ DrawerProps {
  closable?: boolean
  title?: string
  loading?: boolean
  helpMessage?: string
  defaultButton?: boolean
}
