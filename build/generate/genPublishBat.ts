import fs from 'fs'
import { generatedPublishBatFileName } from '../utils/paths'
import { publishConfig } from '../publish/config'
import { paths } from '../_generated/paths'

const {
  cloudServerHostName,
  cloudServerClientFolderPath,
  cloudServerIPAddress,
} = publishConfig

fs.writeFileSync(
  generatedPublishBatFileName,
  `${paths.build}\\publish\\pscp -r ${paths.root}dist\\* ${cloudServerHostName}@${cloudServerIPAddress}:${cloudServerClientFolderPath}`
)
