import type { Plugin } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'

export const creatAutoImportPlugin = (): Plugin => {
  return AutoImport({
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],
    imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/core'],
    dts: 'types/auto-import.d.ts',
  })
}
