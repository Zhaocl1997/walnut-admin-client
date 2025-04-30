export default createAsyncComponent(() => import('./index.vue'))

export interface WCropperInst {
  onGetCropperBlob: () => Promise<Blob>
}

export interface ICompVendorCropperProps {
  src?: string
  alt?: string
  value?: string
  disabled?: boolean
  center?: boolean
}
