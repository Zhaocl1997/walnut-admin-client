import visualizer from 'rollup-plugin-visualizer'

import { bundleSizeStatsLogPath } from '../../utils/paths'

export const createVisualizerPlugin = (): VitePlugin => {
  return visualizer({
    filename: bundleSizeStatsLogPath,
    title: 'Bundle Size Stats',
    open: true,
    template: 'sunburst',
    gzipSize: true,
    brotliSize: true,
  })
}
