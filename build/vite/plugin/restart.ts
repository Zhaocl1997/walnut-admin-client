import ViteRestart from 'vite-plugin-restart'

export function createRestartPlugin(): VitePlugin {
  return ViteRestart({
    reload: ['src/settings.json'],
    restart: ['package.json'],
  })
}
