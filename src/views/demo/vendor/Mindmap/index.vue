<script lang="ts" setup>
import Mindmap from 'vue3-mindmap'
import 'vue3-mindmap/dist/style.css'

defineOptions({
  name: 'MindmapDemo',
})

const { urls } = __APP_INFO__

const data = ref([
  {
    name: 'Walnut Admin',
    children: [
      {
        name: '前端',
        children: [
          {
            name: `仓库地址：${urls.github}`,
          },
          {
            name: `预览地址：${urls.demo}`,
            left: false,
          },
          {
            name: '所涉及的知识',
            children: [
              {
                name: '基础',
                children: [
                  {
                    name: 'HTML',
                  },
                  {
                    name: 'CSS',
                  },
                  {
                    name: 'JS',
                  },
                  {
                    name: 'TS',
                  },
                ],
              },
              {
                name: '框架',
                children: [
                  {
                    name: 'Vue',
                  },
                  {
                    name: 'Vue Router',
                  },
                  {
                    name: 'Pinia',
                  },
                  {
                    name: 'Vue I18n',
                  },
                ],
              },
              {
                name: '工具库\n',
                children: [
                  {
                    name: 'vueuse',
                  },
                  {
                    name: 'lodash-es',
                  },
                  {
                    name: 'axios',
                  },
                ],
              },
              {
                name: '第三方插件',
                children: [
                  {
                    name: 'echarts',
                  },
                  {
                    name: 'cropperjs',
                  },
                  {
                    name: 'tinymce',
                  },
                  {
                    name: 'signature_pad',
                  },
                  {
                    name: 'codemirror',
                  },
                  {
                    name: 'intro.js',
                  },
                  {
                    name: 'sortablejs',
                  },
                  {
                    name: 'qrcode',
                  },
                  {
                    name: 'crypto-js',
                  },
                ],
              },
              {
                name: 'css',
                left: false,
                children: [
                  {
                    name: 'unocss',
                  },
                  {
                    name: 'animate.css',
                  },
                  {
                    name: 'hover.css',
                  },
                ],
              },
              {
                name: 'socket',
                children: [
                  {
                    name: 'socket.io-client',
                  },
                ],
              },
              {
                name: 'vite',
                children: [
                  {
                    name: 'plugin',
                    children: [
                      {
                        name: '基础插件',
                        children: [
                          {
                            name: '@vitejs/plugin-vue',
                          },
                          {
                            name: '@vitejs/plugin-vue-jsx',
                          },
                        ],
                      },
                      {
                        name: '开发插件',
                        left: false,
                        children: [
                          {
                            name: 'vite-plugin-mkcert',
                          },
                          {
                            name: 'vite-plugin-restart',
                          },
                        ],
                      },
                      {
                        name: '通用插件',
                        children: [
                          {
                            name: 'unplugin-auto-import/vite',
                          },
                          {
                            name: 'unplugin-vue-components/vite',
                          },
                          {
                            name: 'unocss/vite',
                          },
                        ],
                      },
                      {
                        name: '打包插件',
                        children: [
                          {
                            name: 'rollup-plugin-visualizer',
                          },
                          {
                            name: '@vitejs/plugin-legacy',
                          },
                          {
                            name: 'vite-plugin-compression',
                          },
                          {
                            name: 'vite-plugin-banner',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    name: 'devServer',
                  },
                  {
                    name: 'alias',
                  },
                  {
                    name: 'env',
                  },
                  {
                    name: 'preview',
                  },
                ],
              },
            ],
            collapse: true,
          },
        ],
      },
    ],
  },
])
</script>

<template>
  <div>
    <Mindmap v-model="data" center-btn fit-btn download-btn add-node-btn timetravel zoom drag edit ctm />
  </div>
</template>

<style lang="less" scoped>

</style>
