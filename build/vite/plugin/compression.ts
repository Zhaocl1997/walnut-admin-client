import { compression } from 'vite-plugin-compression2'

export function createCompressionPlugin(): VitePlugin {
  return compression({
    algorithm: 'gzip',
  })
}
