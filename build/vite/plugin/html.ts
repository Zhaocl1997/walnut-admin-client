import type { Plugin } from 'vite'

import html from 'vite-plugin-html'

export const createHTMLPlugin = (title: string): Plugin[] => {
  return html({
    inject: {
      injectData: {
        title: title,
      },
    },
  })
}
