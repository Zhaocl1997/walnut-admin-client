import './on-demand'

export default createAsyncComponent(() => import('./index.vue'))

export interface ICompVendorEChartsProps {
  option: EChartsOption
  height?: string
  width?: string
}
