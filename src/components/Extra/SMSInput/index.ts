export { default } from './index.vue'

export interface ICompExtraSMSInputProps {
  retrySeconds?: number
  simpleVerify?: boolean
  onBeforeCountdown?: (startLoading?: Fn, stopLoading?: Fn) => Promise<boolean>
  onSuccess?: (startCountdown: () => void) => Promise<void>
}
