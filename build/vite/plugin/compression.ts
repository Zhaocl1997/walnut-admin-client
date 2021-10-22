import compressPlugin from 'vite-plugin-compression'

export const createCompressionPlugin = (): VitePlugin => {
  return compressPlugin({
    ext: '.br',
    algorithm: 'brotliCompress',
  })
}
