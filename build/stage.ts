import fs from 'fs'
import cp from 'child_process'

import chalk from 'chalk'

import { stagingBuildLogPath } from './utils/paths'

const prefix = (msg: string, emoji: string) =>
  `
/**
 * ==============================================
 * ==============================================
 * ===== Staging Build ${msg} ${emoji} =====
 * ==============================================
 * ==============================================
 */

`

;(() => {
  const log_file = fs.createWriteStream(stagingBuildLogPath, {
    flags: 'w',
  })

  const command =
    'npm run prebuild && npx vite build --mode staging && npm run postbuild'

  const start = new Date().getTime()
  cp.exec(command, (error, stdout, stderr) => {
    const end = new Date().getTime()

    const cost = new Date(end - start).getSeconds()

    console.log(chalk.blue(`Staging Build done in ${cost}s`))

    if (error) {
      log_file.write(
        prefix('Error', '😈😈😈😈😈') + JSON.stringify(error),
        () => {
          // recover icon file if failed
          cp.execSync('npm run postbuild')

          console.log(
            chalk.red.bgBlack(
              `Staging Build Failed, see more in ${stagingBuildLogPath}`
            )
          )
        }
      )
    } else {
      console.log(
        chalk.green.bgBlack('Staging Build Successfully! ✨✨✨✨✨ ')
      )
    }

    if (stdout) {
      log_file.write(prefix('Std Out', '✨✨✨✨✨') + stdout, () => {
        console.log(
          chalk.magenta.bgBlack(
            `Staging Build Std out, see more in ${stagingBuildLogPath}`
          )
        )
      })
    }

    if (stderr) {
      log_file.write(prefix('Std Err', '💊💊💊💊💊') + stderr, () => {
        console.log(
          chalk.yellow.bgBlack(
            `Staging Build Std Error, see more in ${stagingBuildLogPath}`
          )
        )
      })
    }
  })
})()
