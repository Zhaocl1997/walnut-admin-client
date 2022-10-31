import { BuildUtilsReadFile, BuildUtilsWriteFile } from '../../utils'

import { iconBundleImportPath, iconBundlePath } from '../src'

export const generateIconBundleImport = async () => {
  const file = await BuildUtilsReadFile(iconBundleImportPath)

  const res = file.toString().replace('// ...', `import '${iconBundlePath}'`)

  await BuildUtilsWriteFile(iconBundleImportPath, res)
}
