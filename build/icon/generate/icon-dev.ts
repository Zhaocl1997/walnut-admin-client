import { BuildUtilsWriteFile } from '../../utils'
import {
  IconBundleConfig,
  WSvgPrefix,
  iconBundlePath,
  iconListPath,
  iconSVGPath,
} from '../src'

export async function generateIconDev() {
  const names = IconBundleConfig.list.filter(i => i !== WSvgPrefix)

  const JSONName = (i: string) => `${i.replace('-', '')}Icons`

  const customJSONName = 'CustomSvgJSON'

  const importJSON = names.map(
    i =>
      `import ${JSONName(i)
      } from '@iconify/json/json/${i}.json'; \n`,
  )

  const addCollections = names.map(
    i => `addCollection(${JSONName(i)}); \n`,
  )

  const generateListFromJSON = `const collections = [${names.map(i => JSONName(i))}, ${customJSONName}];
const ret: string[] = []
collections.forEach((item) => {
  ret.push(...Object.keys(item.icons).map((key) => item.prefix + ':' + key))
})
export default ret
`

  const addImport = 'import { addCollection } from \'@iconify/vue\';'

  const importString = `
${importJSON.join('')}
import ${customJSONName} from '/${iconSVGPath}';
`

  const addCollection = `${addCollections.join('')}
addCollection(${customJSONName})`

  // addCollection bundle
  await BuildUtilsWriteFile(iconBundlePath, addImport + importString + addCollection)

  // generate icon list
  await BuildUtilsWriteFile(iconListPath, importString + generateListFromJSON)
}
