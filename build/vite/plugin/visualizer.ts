import type { Plugin } from 'vite'

import visualizer from 'rollup-plugin-visualizer'

export const createVisualizerPlugin = (): Plugin => {
  return visualizer({
    filename: 'report/stats.html',
    title: 'Bundle Size Stats',
    open: true,
    template: 'treemap',
    gzipSize: true,
    brotliSize: true,
  })
}
