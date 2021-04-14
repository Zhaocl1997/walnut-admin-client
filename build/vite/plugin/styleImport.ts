import type { Plugin } from 'vite'

import styleImport from 'vite-plugin-style-import'

export const createStyleImportPlugin = (): Plugin => {
  return styleImport({
    libs: [
      {
        libraryName: 'element-plus',
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: (name) => {
          return `element-plus/lib/theme-chalk/${name}.css`
        },
        resolveComponent: (name) => {
          return `element-plus/lib/${name}`
        },
      },
    ],
  })
}
