import banner from 'vite-plugin-banner'
import pkg from '../../../package.json'

export const createBannerPlugin = (outDir: string): VitePlugin => {
  return banner({
    outDir,
    content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author.name}\n * homepage: ${pkg.homepage}\n */`,
  })
}
