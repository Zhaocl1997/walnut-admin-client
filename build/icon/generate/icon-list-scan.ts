import fg from 'fast-glob'

import { BuildUtilsReadFile, BuildUtilsWriteFile } from '../../utils'
import { iconListPath, IconLog } from '../src/index'
import { getIconListAllArray } from './icon-list-all'

export async function generateIconListScan() {
  const iconPool = await getIconListAllArray()

  const files = await fg('src/**/*.{vue,ts,tsx}', { dot: true })

  IconLog(
    'Icon Scan',
    `Scanning all 'vue, ts, tsx' files under 'src'. File number: ${files.length}`,
  )

  const buffers = await Promise.all(files.map(i => BuildUtilsReadFile(i)))

  const ret = [
    ...new Set(
      buffers
        .map(i =>
          iconPool
            .map(q => i.toString().match(new RegExp(q, 'gm')))
            .filter(i => i),
        )
        .filter(i => i.length !== 0)
        .flat(Infinity),
    ),
  ]

  await BuildUtilsWriteFile(
    iconListPath,
    `export default ${JSON.stringify(ret)}`,
  )

  IconLog(
    'Icon Scan',
    `Detected ${ret.length} matched icons, writing into file: ${iconListPath}`,
  )
}
