import Terminal from 'vite-plugin-terminal'

export function createTerminalPlugin(): VitePlugin {
  return Terminal({ output: ['console', 'terminal'] })
}
