import {
  cleanupSVG,
  importDirectory,
  parseColors,
  runSVGO,
} from '@iconify/tools'

import { BuildUtilsReadFile, BuildUtilsWriteFile } from '../../utils'
import { IconLog, WSvgPrefix, iconSVGPath } from '../src'

export const generateIconSvg = async () => {
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

  // Export all icons
  // await iconSet.forEach(async (name) => {
  //   const svg = iconSet.toString(name)
  //   if (!svg) {
  //     return
  //   }

  //   // Save to file
  //   await fs.writeFile(`.svg/${name}.svg`, svg, 'utf8')
  //   console.log(`Saved .svg/${name}.svg (${svg.length} bytes)`)
  // })

  IconLog(
    'Icon SVG',
    `Detecting ${iconSet.count()} custom svg icon, writing into file: ${iconSVGPath}`,
  )

  // Generate to icon list
  await iconSet.forEach(async (name) => {
    const data = await BuildUtilsReadFile(iconSVGPath)

    const svgObj = JSON.parse(data.toString())

    // auto remove width and height
    const body = String(iconSet.toString(name))
      .replaceAll(/width="(.[0-9]*)"/gi, '')
      .replaceAll(/height="(.[0-9]*)"/gi, '')

    svgObj.icons[name] = {
      body,
    }

    await BuildUtilsWriteFile(iconSVGPath, JSON.stringify(svgObj, null, 2))
  })
}
