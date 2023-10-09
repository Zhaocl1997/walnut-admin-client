import mkcert from 'vite-plugin-mkcert'

export function createHttpsPlugin(): VitePlugin {
  return mkcert({ source: 'coding' })
}
