export { default } from './index.vue'

export interface WScrollbarRef {
  scrollTo: (args: any) => void
  scrollToStart: () => void
  scrollToEnd: () => void
  scrollToIndex: (index: number) => void
}
