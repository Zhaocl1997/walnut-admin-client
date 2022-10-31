import Terminal from 'vite-plugin-terminal'

export const createTerminalPlugin = (): VitePlugin => {
  return Terminal({ output: ['console', 'terminal'] })
}
