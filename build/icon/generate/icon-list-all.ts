import type { IconifyJSON } from '@iconify/types'
import { IconSet } from '@iconify/tools'
import fg from 'fast-glob'

import { BuildUtilsReadFile, BuildUtilsWriteFile } from '../../utils'

import {
  IconBundleConfig,
  iconListPath,
  IconLog,
  iconSVGPath,
  WSvgPrefix,
} from '../src'

export async function getIconListAllArray() {
  let arr: string[] = []

  const allCollectionPaths = await fg(
    'node_modules/@iconify/json/json/*.json',
    {},
  )

  await Promise.all(
    IconBundleConfig.list.map(async (i) => {
      const res = allCollectionPaths
        .map(path => path.split('/').slice(-1)[0])
        .filter(p => p === `${i}.json`)

      const file = await BuildUtilsReadFile(
        i === WSvgPrefix
          ? iconSVGPath
          : `node_modules/@iconify/json/json/${res[0]}`,
      )

      const fileJSON: IconifyJSON = JSON.parse(file.toString())

      const iconSet = new IconSet(fileJSON)

      const iconArr = iconSet.list().map(i => `${fileJSON.prefix}:${i}`)

      arr = arr.concat(iconArr)
    }),
  )

  return arr
}

export async function generateIconListAll() {
  const arr = await getIconListAllArray()

  const str = JSON.stringify(arr)

  await BuildUtilsWriteFile(iconListPath, `export default ${str}`)

  IconLog(
    'Icon List',
    `Generating icon list... Total number: ${arr.length}, writing into file: ${iconListPath}`,
  )
}
