export default createAsyncComponent(() => import('./index.vue'))

export interface WCropperInst {
  onGetCropperBlob: () => Promise<Blob>
}
