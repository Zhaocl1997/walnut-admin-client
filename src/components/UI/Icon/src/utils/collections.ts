import type { IconifyJSON } from '@iconify/vue'

import svgIcons from './svg.json'

import antdIcons from '@iconify/json/json/ant-design.json'
import mdiIcons from '@iconify/json/json/mdi.json'
import simpleIcons from '@iconify/json/json/simple-icons.json'
import carbonIcons from '@iconify/json/json/carbon.json'
import emojiv1Icons from '@iconify/json/json/emojione-v1.json'

/**
 * @description Add the collection you want to use below.
 */
export const iconCollections: IconifyJSON[] = [
  svgIcons,
  antdIcons,
  mdiIcons,
  simpleIcons,
  carbonIcons,
  emojiv1Icons,
]

// TODO auto generate and do not influnce build
/**
 * @description Used for icon category filter.
 */
export const iconCollectionsNameList = [
  'w-svg',
  'ant-design',
  'mdi',
  'simple-icons',
  'carbon',
  'emojione-v1',
]
