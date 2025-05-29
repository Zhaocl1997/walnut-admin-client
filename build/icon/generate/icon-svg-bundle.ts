import { BuildUtilsReadFile, BuildUtilsWriteFile } from 'build/utils'
import { iconBundlePath, iconListPath, IconLog, iconSVGPath, WSvgPrefix } from '../src'
import { generateSvgJSON } from './icon-svg-json'

export async function writeSvgJSONBundle() {
  const TSIgnore = '// @ts-nocheck \n'

  const result = `import { addCollection } from '@iconify/vue';
import CustomSvgJson from '/${iconSVGPath}';
addCollection(CustomSvgJson);`

  IconLog('Svg Bundle', `Bundle svg icons from ${iconSVGPath}`)

  await BuildUtilsWriteFile(iconBundlePath, TSIgnore + result)
}

export async function rewriteSvgJSON() {
  const usedIconList = await BuildUtilsReadFile(iconListPath)

  const arr = Array.from<string>(JSON.parse(usedIconList.replace('export default ', '')))

  const usedSvgIcons: string[] = arr.filter(i => i.startsWith(WSvgPrefix))

  await generateSvgJSON(usedSvgIcons.map(i => i.replace(`${WSvgPrefix}:`, '')))
}
