import { BuildUtilsReadFile, BuildUtilsWriteFile } from '../../utils'

import { IconBundleConfig, iconBundleImportPath, iconBundlePath } from '../src'

export const generateIconBundleImport = async (env: string) => {
  const file = await BuildUtilsReadFile(iconBundleImportPath)

  // dev env has a higher priority
  // just import the bundle file
  const res =
    env === 'dev'
      ? file.toString().replace('// ...', `import '/${iconBundlePath}'`)
      : IconBundleConfig.online
      ? file.toString().replace(`import '/${iconBundlePath}'`, '// ...')
      : file.toString().replace('// ...', `import '/${iconBundlePath}'`)

  await BuildUtilsWriteFile(iconBundleImportPath, res)
}
