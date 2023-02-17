import importToCDN from 'vite-plugin-cdn-import'

export const createCdnImportPlugin = (): VitePlugin[] => {
  return importToCDN({
    modules: [
      {
        name: 'ali-oss',
        var: 'OSS',
        path: 'dist/aliyun-oss-sdk.min.js',
      },
      {
        name: 'echarts',
        var: 'echarts',
        path: 'dist/echarts.min.js',
      },
      // {
      //     name: 'echarts',
      //     var: 'echarts',
      //     path: 'charts.js',
      // },
      // {
      //     name: 'echarts',
      //     var: 'echarts',
      //     path: 'components.js',
      // },
      // {
      //     name: 'echarts',
      //     var: 'echarts',
      //     path: 'renderers.js',
      // },
    ],
  })
}
