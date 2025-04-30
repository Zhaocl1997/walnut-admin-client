export default createAsyncComponent(() => import('./index.vue'))

export interface ICompVendorTinymceProps {
  value?: string
  disabled?: boolean
  height?: string
  width?: string
}
