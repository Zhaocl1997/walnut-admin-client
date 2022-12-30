import { BuildUtilsReadFile, BuildUtilsWriteFile } from 'build/utils'
import { IconLog, WSvgPrefix, iconBundlePath, iconListPath, iconSVGPath } from '../src'
import { generateSvgJSON } from './icon-svg-json'

export const writeSvgJSONBundle = async () => {
  const result = `import { addCollection } from '@iconify/vue';
import CustomSvgJson from '/${iconSVGPath}';
addCollection(CustomSvgJson);`

  IconLog('Svg Bundle', `Bundle svg icons from ${iconSVGPath}`)

  await BuildUtilsWriteFile(iconBundlePath, result)
}

export const rewriteSvgJSON = async () => {
  const usedIconList = await BuildUtilsReadFile(iconListPath)

  const arr = Array.from<string>(JSON.parse(usedIconList.replace('export default ', '')))

  const usedSvgIcons: string[] = arr.filter(i => i.startsWith(WSvgPrefix))

  await generateSvgJSON(usedSvgIcons.map(i => i.replace(`${WSvgPrefix}:`, '')))
}
