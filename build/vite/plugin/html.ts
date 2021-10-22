import html from 'vite-plugin-html'

export const createHTMLPlugin = (title: string): VitePlugin[] => {
  return html({
    inject: {
      injectData: {
        title: title,
      },
    },
  })
}
