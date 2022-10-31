import { IconBundleConfig } from './config'
import { generateIconUsedBundle } from '../generate/icon-bundle'
import { generateIconBundleImport } from '../generate/icon-import'
import { generateIconList, cleanArr } from '../generate/icon-list'
import { generateIconsUsed } from '../generate/icon-scan'
import { generateIconSvg } from '../generate/icon-svg'

// TODO this could not work for async/await
// maybe need to seperate into script, different process
;(async () => {
  // always excute the custom svg bundle logic
  await generateIconSvg()

  // call this first, we need `icon-list` file
  // the generated file would be modified after
  await generateIconList()

  // handle on demand usage
  if (IconBundleConfig.treeshake) {
    // only bundle icons used in project
    await generateIconsUsed()

    // bundle used, and offline usage, need to call `addCollections` api
    if (!IconBundleConfig.online) {
      await generateIconUsedBundle()

      // need to import the bundle file in icon entry
      await generateIconBundleImport()
    }
  } else {
    // offline usage and not on demand bundle
    // this is the MOST unrecommended way to bundle icon
    // if you choose 4 or 5 collections, the bundle icon file size woulb increase to 10m
    // which is very awful
    await generateIconUsedBundle()

    // need to import the bundle file in icon entry
    await generateIconBundleImport()
  }

  cleanArr()
})()
