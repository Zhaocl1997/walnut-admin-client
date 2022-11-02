import { writeIntoLog, stagingBuildLogPath } from './utils'

writeIntoLog(
  'Staging Build',
  'npm run icon:prod && npx vite build --mode staging',
  stagingBuildLogPath
)
