import { promisify } from 'util'
import { exec } from 'node:child_process'
import { BuildUtilsLog } from './log'

const promisifyExec = promisify(exec)

export const BuildUtilsExec = async (file: string) => {
  const { stdout, stderr } = await promisifyExec(file)

  BuildUtilsLog(stdout)

  if (stderr)
    return false

  return true
}
