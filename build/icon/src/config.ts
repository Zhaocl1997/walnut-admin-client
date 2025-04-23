import type { IconConfig } from './types'
import { WSvgPrefix } from './prefix'

export const IconBundleConfig: IconConfig = {
  online: true,

  treeshake: false,

  // see full icon in https://icon-sets.iconify.design/
  list: [
    WSvgPrefix, // this is custom svg icons
    'ant-design',
    'mdi',
    'simple-icons',
    'carbon',
    'emojione-v1',
  ],
}
