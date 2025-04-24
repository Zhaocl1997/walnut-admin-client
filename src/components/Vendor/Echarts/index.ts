export default createAsyncComponent(() => import('./src/index.vue'))

// TODO extract and make it work with other third party library
const isCdn = true

useScriptTag(isCdn ? 'https://cdn.jsdelivr.net/npm/echarts@5.4.2/dist/echarts.min.js' : 'src/components/Vendor/Echarts/src/on-demand', () => {
  console.info('ECharts', 'Initialized')
}, { async: true, defer: true, type: 'module' })
