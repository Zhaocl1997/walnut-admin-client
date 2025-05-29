import * as TJS from 'ts-json-schema-generator'

import { BuildUtilsWriteFile } from '../utils'
import {
  AppSettingsInterfaceFilePath,
  AppSettingsJSONSchemaFilePath,
} from '../utils/paths'

const config: import('ts-json-schema-generator/dist/src/Config').Config = {
  path: AppSettingsInterfaceFilePath,
  tsconfig: 'tsconfig.json',
  type: 'AppSettings', // Or <type-name> if you want to generate schema for that one type only
}

const shapeSchema = TJS.createGenerator(config).createSchema(config.type)
  ;(async () => {
  const newData = JSON.stringify(shapeSchema, null, 2)

  await BuildUtilsWriteFile(AppSettingsJSONSchemaFilePath, newData)
})()
