import { BuildUtilsExec } from '../utils'
;(async function () {
  await BuildUtilsExec('esno build/generate/genPaths.ts')
  await BuildUtilsExec('esno build/generate/genJSONSchemas.ts')
})()
