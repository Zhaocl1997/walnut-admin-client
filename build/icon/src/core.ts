import process from 'node:process'
import { BuildUtilsWarn } from '../../utils'
import { generateIconUsedBundle } from '../generate/icon-bundle'
import { generateIconDev } from '../generate/icon-dev'
import { generateIconListAll } from '../generate/icon-list-all'
import { generateIconListScan } from '../generate/icon-list-scan'
import { rewriteSvgJSON, writeSvgJSONBundle } from '../generate/icon-svg-bundle'
import { generateSvgJSON } from '../generate/icon-svg-json'
import { IconBundleConfig } from './config'

(async () => {
  const arg = process.argv.slice(-1)[0]

  // always excute the logic to transform custom svg icons into iconify json
  await generateSvgJSON()

  // dev env, just bundle all collection icons
  if (arg === 'dev') {
    // when dev, just import json from `node_modules` and call `addCollection` api
    // also generate icon list from imported jsons
    await generateIconDev()
  }
  else {
    if (IconBundleConfig.online) {
      // online but not treeshake
      if (!IconBundleConfig.treeshake) {
        // Step 1 - Icon List should be all
        await generateIconListAll()
      }

      // online also treeshake
      if (IconBundleConfig.treeshake) {
        // Step 1 - Use fast-glob to scan and write the used icon into icon list
        await generateIconListScan()

        // Step 2 - Used last step generated icon list to rewrite the svg json file
        await rewriteSvgJSON()
      }

      // Add svg icons with `addCollection`
      await writeSvgJSONBundle()
    }
    else {
      // not online and not treeshake
      // WARNING - highly not recommended to do so
      // cause it will bundle all icons into final output which would increase the bundle size a lot
      if (!IconBundleConfig.treeshake) {
        // not recomended to do so
        BuildUtilsWarn('Not online and Not treeshake \n WARNING - It\'s highly not recommended to do so \n Cause it will bundle all icons into final output which would increase the bundle size a lot \n Normally more than 1MB')
        process.exitCode = 1
      }

      // not online but treeshake
      if (IconBundleConfig.treeshake) {
        // Step 1 - Use fast-glob to scan and write the used icon into icon list
        await generateIconListScan()

        // Step 2 - Excute the iconify bundle logic from
        // https://docs.iconify.design/icon-components/bundles/examples/component-full.html
        await generateIconUsedBundle()
      }
    }
  }
})()
