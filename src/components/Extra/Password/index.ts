export { default } from './index.vue'

// TODO 888
export interface WPasswordProps {
  value?: string
  maxlength?: number
  minlength?: number
  progress?: boolean
  confirm?: boolean
  capslock?: boolean
  onSubmit?: () => Promise<void>
}
