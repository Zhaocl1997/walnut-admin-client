import { resolve } from 'node:path'

import * as TJS from 'typescript-json-schema'

import {
  AppSettingsInterfaceFilePath,
  AppSettingsJSONFilePath,
  VScodeSettingsFilePath,
} from '../utils/paths'
import { BuildUtilsReadFile, BuildUtilsWriteFile } from '../utils'

const settings: TJS.PartialArgs = {
  required: true,
}

const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true,
}

const program = TJS.getProgramFromFiles(
  [resolve(AppSettingsInterfaceFilePath)],
  compilerOptions,
)

const shapeSchema = TJS.generateSchema(program, 'AppSettings', settings)

;(async () => {
  const data = await BuildUtilsReadFile(VScodeSettingsFilePath)
  const obj = JSON.parse(data.toString())

  if (!obj['json.schemas'])
    obj['json.schemas'] = []

  obj['json.schemas'][0] = {
    fileMatch: [AppSettingsJSONFilePath],
    schema: shapeSchema,
  }

  const newData = JSON.stringify(obj, null, 4)

  await BuildUtilsWriteFile(VScodeSettingsFilePath, newData)
})()
