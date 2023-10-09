import { cdn } from 'vite-plugin-cdn2'

export function createCdnImportPlugin(): VitePlugin[] {
  return cdn({
    modules: ['vue'],
  })
}
