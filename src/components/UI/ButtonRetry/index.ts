import type { ICompUIButtonProps } from '../Button'
import { StorageSerializers } from '@vueuse/core'

export { default } from './index.vue'

// TODO 000
export interface ICompUIButtonRetryProps extends /* @vue-ignore */ ICompUIButtonProps {
  retryKey?: string
  retrySeconds?: number
  onRetryClick?: (startCountdown: Fn) => void
}

export const buttonRetryMapPersistent = useAppStorage<Map<string, number>>(AppConstPersistKey.BUTTON_RETRY, new Map<string, number>(), { serializer: StorageSerializers.map })
