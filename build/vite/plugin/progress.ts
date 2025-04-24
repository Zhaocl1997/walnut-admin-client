import progress from 'vite-plugin-progress'

export function createBuildProgressPlugin() {
  return progress()
}
