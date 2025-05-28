import { argv } from 'node:process'
import { writeIntoLog } from '../utils'
import { iconLogPath } from './src/path'

writeIntoLog(
  'Icon Bundle',
  `npx esno build/icon/src/core.ts ${argv.slice(-1)[0]}`,
  iconLogPath,
)
