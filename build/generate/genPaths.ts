import { BuildUtilsWriteFile, generatedPathsFilePath } from '../utils'
;

(async function () {
  await BuildUtilsWriteFile(
    generatedPathsFilePath,
    `// This file is generated, please do not change.
  export const paths = {
    root: ${JSON.stringify(__dirname.replace('build\\generate', ''))},
    view: ${JSON.stringify(__dirname.replace('build\\generate', 'src\\views'))},
    build: ${JSON.stringify(__dirname.replace('\\generate', ''))},
  }
  `,
  )
})()
