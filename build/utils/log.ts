import chalk from 'chalk'
import { getNow } from 'easy-fns-ts/dist/lib'
import pkg from '../../package.json'

const title = (stage: string) =>
  chalk.magenta.bgBlack(
    `[${pkg.name.toUpperCase()}] - [${getNow()}] - [${stage}]`
  )

export const BuildUtilsLog = (msg: string, stage = 'Log') => {
  console.log(`${title(stage)}: ${msg}`)
}
