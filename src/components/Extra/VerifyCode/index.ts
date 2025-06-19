import type { InputOtpProps } from 'naive-ui'

export { default } from './index.vue'

export interface ICompExtraVerifyCodeProps extends /* @vue-ignore */ InputOtpProps {
  retrySeconds?: number
  retryKey?: string
  onBeforeCountdown?: (startLoading?: Fn, stopLoading?: Fn) => Promise<boolean>
}
