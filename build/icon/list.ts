// @ts-nocheck
/* eslint-disable */

import fs from 'fs'
import fg from 'fast-glob'

import { listPath } from '../utils/paths'

import menuIcons from '../../src/components/UI/Icon/src/utils/menu'
import { genIconLists } from '../../src/components/UI/Icon/src/utils/index'
import { iconCollections } from '../../src/components/UI/Icon/src/utils/collections'

/**
 * @description Used to generate icon list for scanning src
 */
const iconLists = genIconLists(iconCollections)

/**
 * @description Read file
 */
const readFile = (src) => {
  return fs.readFileSync(src, { encoding: 'utf-8' })
}

/**
 * @description Write file
 */
const writeFile = (data) => {
  fs.writeFileSync(listPath, `export default ${JSON.stringify(data)}`)
}

/**
 * @description Use fast glob to scan all vue file under src, then filter the icon used, write into list file, used for icon picker and bundle
 */
;(async () => {
  const files = await fg('src/**/*.vue', { dot: true })

  const buffers = files.map((i) => readFile(i))

  const ret = [
    ...new Set(
      buffers
        .map((i) =>
          iconLists
            .map((q) => i.toString().match(new RegExp(q, 'gm')))
            .filter((i) => i)
        )
        .filter((i) => i.length !== 0)
        .flat(Infinity)
        .concat(menuIcons)
    ),
  ]

  writeFile(ret)
})()
