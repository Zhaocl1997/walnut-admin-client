import * as TJS from 'ts-json-schema-generator'

import { BuildUtilsReadFile, BuildUtilsWriteFile } from '../utils'
import {
  AppSettingsInterfaceFilePath,
  AppSettingsJSONFilePath,
  VScodeSettingsFilePath,
} from '../utils/paths'

/** @type {import('ts-json-schema-generator/dist/src/Config').Config} */
const config = {
  path: AppSettingsInterfaceFilePath,
  tsconfig: 'tsconfig.json',
  type: 'AppSettings', // Or <type-name> if you want to generate schema for that one type only
}

const shapeSchema = TJS.createGenerator(config).createSchema(config.type)

;(async () => {
  const data = await BuildUtilsReadFile(VScodeSettingsFilePath)
  const obj = JSON.parse(data.toString())

  if (!obj['json.schemas'])
    obj['json.schemas'] = []

  obj['json.schemas'][0] = {
    fileMatch: [AppSettingsJSONFilePath],
    schema: shapeSchema,
  }

  const newData = JSON.stringify(obj, null, 2)

  await BuildUtilsWriteFile(VScodeSettingsFilePath, newData)
})()
