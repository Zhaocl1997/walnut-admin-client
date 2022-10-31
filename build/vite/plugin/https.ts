import mkcert from 'vite-plugin-mkcert'

export const createHttpsPlugin = (): VitePlugin => {
  return mkcert({ source: 'coding' })
}
