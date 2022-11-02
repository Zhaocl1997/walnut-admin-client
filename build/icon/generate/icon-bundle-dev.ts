import { BuildUtilsWriteFile } from '../../utils'
import {
  IconBundleConfig,
  iconBundlePath,
  iconSVGPath,
  WSvgPrefix,
} from '../src'

export const generateIconDevBundle = async () => {
  const names = IconBundleConfig.list.filter((i) => i !== WSvgPrefix)

  const importJSON = names.map(
    (i) =>
      `import ${
        i.replace('-', '') + 'Icons'
      } from '@iconify/json/json/${i}.json'; \n`
  )

  const addCollections = names.map(
    (i) => `addCollection(${i.replace('-', '') + 'Icons'});`
  )

  const data = `import { addCollection } from '@iconify/vue';
  ${importJSON.join('')}
  import SvgJSON from '/${iconSVGPath}';
  ${addCollections.join('')}
  addCollection(SvgJSON)`

  await BuildUtilsWriteFile(iconBundlePath, data)
}
