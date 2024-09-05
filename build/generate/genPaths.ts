import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { BuildUtilsWriteFile, generatedPathsFilePath } from '../utils'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
