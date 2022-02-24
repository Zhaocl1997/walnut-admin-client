import fg from 'fast-glob'

import { listPath } from '../../utils/paths'
import { BuildUtilsLog } from '../../utils/log'

import menuIcons from '../../../src/components/UI/Icon/src/utils/menu'
import { genIconLists } from '../../../src/components/UI/Icon/src/utils/index'
import { iconCollections } from '../../../src/components/UI/Icon/src/utils/collections'
import { BuildUtilsWriteFile, BuildUtilsReadFile } from 'build/utils/fs'

/**
 * @description Used to generate icon list for scanning src
 */
const iconLists = genIconLists(iconCollections)

/**
 * @description Use fast glob to scan all vue/ts/tsx file under src, then filter the icon used, write into list file, used for icon picker and bundle
 */
;(async () => {
  const files = await fg('src/**/*.{vue,ts,tsx}', { dot: true })

  BuildUtilsLog(
    `Scanning all 'vue, ts, tsx' files under 'src'. File number: ${files.length}`
  )

  const buffers = await Promise.all(files.map((i) => BuildUtilsReadFile(i)))

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

  await BuildUtilsWriteFile(listPath, `export default ${JSON.stringify(ret)}`)

  BuildUtilsLog(
    `Detected ${ret.length} matched icons, writing into file: ${listPath}`
  )
})()
