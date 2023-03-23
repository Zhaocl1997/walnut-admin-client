import { ViteEjsPlugin } from 'vite-plugin-ejs'

export const createEJSPlugin = (title: string): VitePlugin => {
  return ViteEjsPlugin({ title })
}
