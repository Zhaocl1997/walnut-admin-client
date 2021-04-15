import type { Plugin } from 'vite'

import visualizer from 'rollup-plugin-visualizer'

import { bundleSizeStatsLogPath } from '../../utils/paths'

export const createVisualizerPlugin = (): Plugin => {
  return visualizer({
    filename: bundleSizeStatsLogPath,
    title: 'Bundle Size Stats',
    open: true,
    template: 'treemap',
    gzipSize: true,
    brotliSize: true,
  })
}
