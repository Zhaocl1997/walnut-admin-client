import type { Plugin } from 'vite'

import compressPlugin from 'vite-plugin-compression'

export const createCompressionPlugin = (): Plugin => {
  return compressPlugin({
    ext: '.br',
    algorithm: 'brotliCompress',
  })
}
