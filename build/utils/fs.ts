import { promises as fs } from 'node:fs'
import { BuildUtilsLog } from './log'

const stage = 'File'

export const BuildUtilsReadFile = async (path: string) => {
  BuildUtilsLog(`Reading File: ${path}`, stage)
  return await fs.readFile(path, 'utf8')
}

export const BuildUtilsWriteFile = async (path: string, data: any) => {
  BuildUtilsLog(`Writing data into File: ${path}`, stage)
  return await fs.writeFile(path, data, 'utf8')
}
