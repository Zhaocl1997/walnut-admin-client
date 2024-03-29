import type { ScrollTo } from 'naive-ui/lib/_internal/scrollbar/src/ScrollBar'

export interface WScrollbarInst {
  scrollTo: ScrollTo
  scrollToStart: () => void
  scrollToEnd: () => void
  scrollToIndex: (index: number) => void
  getIsOverflow: () => boolean
}

export { default } from './index.vue'
