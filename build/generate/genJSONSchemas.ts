import { resolve } from 'path'
import { writeFileSync, readFileSync } from 'fs'

import * as TJS from 'typescript-json-schema'

import {
  VScodeSettingsFilePath,
  AppSettingsJSONFilePath,
  AppSettingsInterfaceFilePath,
} from 'build/utils/paths'

const settings: TJS.PartialArgs = {
  required: true,
}

const compilerOptions: TJS.CompilerOptions = {
  strictNullChecks: true,
}

const program = TJS.getProgramFromFiles(
  [resolve(AppSettingsInterfaceFilePath)],
  compilerOptions
)

const shapeSchema = TJS.generateSchema(program, 'AppSettings', settings)

;(() => {
  const data = readFileSync(VScodeSettingsFilePath)
  const obj = JSON.parse(data.toString())

  obj['json.schemas'][0] = {
    fileMatch: [AppSettingsJSONFilePath],
    schema: shapeSchema,
  }

  const newData = JSON.stringify(obj, null, 4)

  writeFileSync(VScodeSettingsFilePath, newData)
})()
