import visualizer from 'rollup-plugin-visualizer'

import { bundleSizeStatsLogPath } from '../../utils/paths'

export const createVisualizerPlugin = (title: string): VitePlugin => {
  return visualizer({
    filename: bundleSizeStatsLogPath,
    title: `${title} Bundle Stats`,
    open: true,
    template: 'sunburst',
    gzipSize: true,
    brotliSize: true,
  })
}
