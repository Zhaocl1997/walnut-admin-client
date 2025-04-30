export { default } from './index.vue'

export interface ICompVendorOSSUploadProps {
  region?: string
  bucket?: string
  folder?: string
  image?: boolean
  disabled?: boolean
  download?: boolean
  remove?: boolean
  preview?: boolean
  max?: number
  accept?: string
  // KB
  size?: number
  // KB, file size to decide whether to use multipart upload
  crossoverSize?: number
}
