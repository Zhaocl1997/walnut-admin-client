import progress from 'vite-plugin-progress'

export const createBuildProgressPlugin = (): VitePlugin => {
  return progress()
}
