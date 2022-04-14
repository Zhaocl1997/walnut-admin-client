import type { TagProps } from 'naive-ui'

export interface WHomeNumberCardProps {
  title?: string
  headerExtra?: {
    text?: string
    tagProps?: TagProps
  }
  loading?: boolean

  number?: number
  icon?: string
}

export interface WHomeChartCardProps {
  title?: string
  headerExtra?: {
    text?: string
    tagProps?: TagProps
  }
  loading?: boolean

  option?: EChartsOption
}
