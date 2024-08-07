import progress from 'vite-plugin-progress'

export function createBuildProgressPlugin(): VitePlugin {
  return progress()
}
