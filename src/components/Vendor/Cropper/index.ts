export { default } from './index.vue'

export interface WCropperInst {
  onGetCropperBlob: () => Promise<Blob>
}
