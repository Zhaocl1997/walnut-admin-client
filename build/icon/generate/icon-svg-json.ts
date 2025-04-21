import {
  cleanupSVG,
  importDirectory,
  parseColors,
  runSVGO,
} from '@iconify/tools'

import { BuildUtilsReadFile, BuildUtilsWriteFile } from '../../utils'
import { IconLog, iconSVGPath, WSvgPrefix } from '../src'

export async function generateSvgJSON(whiteList?: string[]) {
  // build the empty json file
  await BuildUtilsWriteFile(
    iconSVGPath,
    JSON.stringify({ icons: {}, prefix: WSvgPrefix }),
  )

  // Import icons
  const iconSet = await importDirectory('.svg', {
    prefix: WSvgPrefix,
  })

  // Validate, clean up, fix palette and optimise
  await iconSet.forEach(async (name, type) => {
    if (type !== 'icon')
      return

    // white list limit
    if (whiteList && !whiteList.includes(name))
      iconSet.remove(name)

    const svg = iconSet.toSVG(name)
    if (!svg) {
      // Invalid icon
      iconSet.remove(name)
      return
    }

    // Clean up and optimise icons
    try {
      // Cleanup icon code
      await cleanupSVG(svg)

      // Assume icon is monotone: replace color with currentColor, add if missing
      // If icon is not monotone, remove this code
      await parseColors(svg, {
        defaultColor: 'currentColor',
        callback: (attr, colorStr, color) => {
          // return !color || isEmptyColor(color) ? colorStr : 'currentColor'
          return colorStr || 'currentColor'
        },
      })

      // Optimise
      runSVGO(svg)
    }
    catch (err) {
      // Invalid icon
      console.error(`Error parsing ${name}:`, err)
      iconSet.remove(name)
      return
    }

    // Update icon
    iconSet.fromSVG(name, svg)
  })

  const data = JSON.parse(await BuildUtilsReadFile(iconSVGPath))

  // Generate to icon list
  await iconSet.forEach((name) => {
    // auto remove width and height
    const body = String(iconSet.toString(name))
      .replaceAll(/width="(.\d*)"/gi, '')
      .replaceAll(/height="(.\d*)"/gi, '')

    data.icons[name] = {
      body,
    }
  })

  // write into json
  await BuildUtilsWriteFile(iconSVGPath, JSON.stringify(data, null, 2))

  IconLog(
    'Icon SVG',
    `Detecting ${iconSet.count()} custom svg icon, writing into file: ${iconSVGPath}`,
  )
}
