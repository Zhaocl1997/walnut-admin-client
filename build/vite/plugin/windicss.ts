import type { Plugin } from 'vite'
import type { UserOptions } from 'vite-plugin-windicss'

import WindiCSS from 'vite-plugin-windicss'

export const createWindicssPlugin = (): Plugin[] => {
  const config: UserOptions = {
    safelist: 'no-select',
  }

  return WindiCSS(config)
}
