export { default } from './index.vue'

export interface WAbsImageInst {
  onGetBlobURL: () => Promise<string>
  onGetBase64: () => Promise<string>
  onGetBlob: () => Blob
}
