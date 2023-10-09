import visualizer from 'rollup-plugin-visualizer'

import { bundleSizeStatsLogPath } from '../../utils/paths'

export function createVisualizerPlugin(title: string): VitePlugin {
  return visualizer({
    filename: bundleSizeStatsLogPath,
    title: `${title} Bundle Stats`,
    open: true,
    template: 'treemap',
    gzipSize: true,
    brotliSize: true,
  })
}
