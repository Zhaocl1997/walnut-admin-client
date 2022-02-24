import { promises as fs } from 'fs'
import {
  importDirectory,
  cleanupSVG,
  runSVGO,
  parseColors,
  isEmptyColor,
} from '@iconify/tools'

import { svgJSONFilePath } from '../utils/paths'
import { WSvgPrefix } from '../utils/svg'
;(async () => {
  // Import icons
  const iconSet = await importDirectory('.svg', {
    prefix: WSvgPrefix,
  })

  // Validate, clean up, fix palette and optimise
  await iconSet.forEach(async (name, type) => {
    if (type !== 'icon') {
      return
    }

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
          return colorStr ? colorStr : 'currentColor'
        },
      })

      // Optimise
      await runSVGO(svg)
    } catch (err) {
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

  // Generate to icon list
  await iconSet.forEach(async (name) => {
    const data = await fs.readFile(svgJSONFilePath)

    const svgObj = JSON.parse(data.toString())

    // TODO auto remove width and height
    svgObj.icons[name] = {
      body: iconSet.toString(name),
    }

    await fs.writeFile(svgJSONFilePath, JSON.stringify(svgObj, null, 2), 'utf8')
  })
})()
