import fs from 'fs'
import { generatedPathsFilePath } from '../utils/paths'

fs.writeFileSync(
  generatedPathsFilePath,
  `// This file is generated, please do not change.
export const paths = {
  root: ${JSON.stringify(__dirname.replace('build\\generate', ''))},
  view: ${JSON.stringify(__dirname.replace('build\\generate', 'src\\views'))},
  build: ${JSON.stringify(__dirname.replace('\\generate', ''))},
}
`
)
