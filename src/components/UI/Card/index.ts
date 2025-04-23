import type { CardProps } from 'naive-ui'

export { default } from './index.vue'

// TODO 000
export interface ICompUICardProps extends /* @vue-ignore */ CardProps {
  headerPreset?: 'collapse' | 'refresh'
  loading?: boolean
}
