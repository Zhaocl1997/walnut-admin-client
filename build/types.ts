import fs from 'fs'
import cp from 'child_process'

import chalk from 'chalk'

import { typesCheckLogPath } from './utils/paths'
;(() => {
  const log_file = fs.createWriteStream(typesCheckLogPath, {
    flags: 'w',
  })

  const command = 'npm run types:check'

  const start = new Date().getTime()
  cp.exec(command, (_1, stdout, _2) => {
    const end = new Date().getTime()

    const cost = new Date(end - start).getSeconds()

    console.log(
      chalk.blue(
        `Types check done in ${cost}s, see more in ${typesCheckLogPath}`
      )
    )

    log_file.write(stdout)
  })
})()
