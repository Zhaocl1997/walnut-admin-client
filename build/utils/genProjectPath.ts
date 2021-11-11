import fs from 'fs'
import { projectPath } from './paths'

fs.writeFileSync(
  projectPath,
  `// This file is generated, please do not change. \n export default ${JSON.stringify(
    __dirname.replace('build\\utils', 'src/views')
  )}`
)
