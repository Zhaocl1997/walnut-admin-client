export { default } from './index.vue'

export interface IWCompVendorOSSUploadProps {
  value?: string[]
  region?: string
  bucket?: string
  folder?: string
  image?: boolean
  disabled?: boolean
  max?: number
  accept?: string
  // KB
  size?: number
  // KB, file size to decide whether to use multipart upload
  crossoverSize?: number
}
