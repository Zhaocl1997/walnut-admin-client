export { default } from './index.vue'

// TODO 888
export interface WSMSInputProps {
  retrySeconds?: number
  simpleVerify?: boolean
  onBeforeCountdown?: () => Promise<boolean>
  onSuccess?: (startCountdown: () => void) => Promise<void>
}
