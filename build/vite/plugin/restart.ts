import ViteRestart from 'vite-plugin-restart'

export const createRestartPlugin = (): VitePlugin => {
  return ViteRestart({ reload: ['src/settings.json'] })
}
