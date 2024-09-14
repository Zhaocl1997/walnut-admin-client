export { default } from './index.vue'

export interface ICompUIButtonRetryProps {
  retryKey?: string
  retrySeconds?: number
}

export const buttonRetryMapPersistent = useLocalStorage('button-retry-map', new Map<string, number>())
