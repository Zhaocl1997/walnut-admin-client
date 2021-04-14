import { addCollection } from '@iconify/vue'

import { iconCollections } from './collections'

/**
 * @description Dev mode no need to bundle, just import all
 */
iconCollections.forEach((item) => {
  addCollection(item)
})
