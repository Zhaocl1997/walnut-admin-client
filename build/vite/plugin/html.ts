import { createHtmlPlugin as CHP } from 'vite-plugin-html'

export const createHTMLPlugin = (title: string): VitePlugin[] => {
  return CHP({
    minify: true,
    inject: {
      data: {
        title: title,
      },
    },
  })
}
