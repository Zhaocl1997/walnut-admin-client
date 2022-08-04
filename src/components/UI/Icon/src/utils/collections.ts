import type { IconifyJSON } from '@iconify/vue'

import antdIcons from '@iconify/json/json/ant-design.json'
import mdiIcons from '@iconify/json/json/mdi.json'
import simpleIcons from '@iconify/json/json/simple-icons.json'
import carbonIcons from '@iconify/json/json/carbon.json'
import emojiv1Icons from '@iconify/json/json/emojione-v1.json'

import svgIcons from './svg.json'

/**
 * @description Add the collection you want to use below.
 */
export const iconCollections: IconifyJSON[] = [
  antdIcons,
  mdiIcons,
  simpleIcons,
  carbonIcons,
  svgIcons,
  emojiv1Icons,
]

/**
 * @description Used for icon category filter.
 */
export const iconCollectionsNameList = iconCollections.map((i) => i.prefix)
