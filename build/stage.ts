import { BuildUtilsExec, stagingBuildLogPath, writeIntoLog } from './utils'
;(async function () {
  const done = await BuildUtilsExec('npm run icon:prod')

  done
    && writeIntoLog(
      'Staging Build',
      'npx vite build --mode staging',
      stagingBuildLogPath,
    )
})()
