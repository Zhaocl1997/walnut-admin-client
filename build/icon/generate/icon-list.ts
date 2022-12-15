import fg from 'fast-glob'
import { IconSet } from '@iconify/tools'
import type { IconifyJSON } from '@iconify/types'

import { BuildUtilsReadFile, BuildUtilsWriteFile } from '../../utils'

import {
  IconBundleConfig,
  IconLog,
  WSvgPrefix,
  iconListPath,
  iconListPoolPath,
  iconSVGPath,
} from '../src'

export let tempIconArr: string[] = []

export const cleanArr = () => {
  tempIconArr = []
}

export const generateIconList = async () => {
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

      tempIconArr = tempIconArr.concat(iconArr)
    }),
  )

  const str = JSON.stringify(tempIconArr)

  await BuildUtilsWriteFile(iconListPath, `export default ${str}`)

  // this is the pool for the maybe scan usage, would not update anymore in later actions
  await BuildUtilsWriteFile(iconListPoolPath, `export default ${str}`)

  IconLog(
    'Icon List',
    `Generating icon list... Total number: ${tempIconArr.length}, writing into file: ${iconListPath}`,
  )
}
