import { compression } from 'vite-plugin-compression2'

export function createCompressionPlugin() {
  return compression({
    algorithm: 'gzip',
  })
}
