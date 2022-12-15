import { generateIconUsedBundle } from '../generate/icon-bundle'
import { generateIconBundleImport } from '../generate/icon-import'
import { cleanArr, generateIconList } from '../generate/icon-list'
import { generateIconsUsed } from '../generate/icon-scan'
import { generateIconSvg } from '../generate/icon-svg'
import { generateIconDevBundle } from '../generate/icon-bundle-dev'
import { IconBundleConfig } from './config'
(async () => {
  const arg = process.argv.slice(-1)[0]

  // always excute the custom svg bundle logic
  await generateIconSvg()

  // call this first, we need `icon-list` and `icon-list-pool` file
  // the `icon-list` file would be modified after if `treeshake` is on
  await generateIconList()

  // dev env, just bundle all collection icons
  if (arg === 'dev') {
    // when dev, just import json from `node_modules` and call `addCollection` api
    await generateIconDevBundle()
  }
  else {
    // below handle prod logic
    // handle on demand usage
    if (IconBundleConfig.treeshake) {
      // only bundle icons used in project
      await generateIconsUsed()

      // bundle used, and offline usage, need to call `addCollections` api
      if (!IconBundleConfig.online)
        await generateIconUsedBundle()
    }
    else {
      // offline usage and not on demand bundle
      // this is the MOST unrecommended way to bundle icon
      // if you choose 4 or 5 collections, the bundle icon file size woulb increase to 10m
      // which is very awful
      await generateIconUsedBundle()
    }
  }

  // always need to excute bundle import logic
  // no matter what kind of usage you are using
  await generateIconBundleImport(arg)

  cleanArr()
})()
