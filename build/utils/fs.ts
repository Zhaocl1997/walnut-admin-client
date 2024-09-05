import { promises as fs } from 'node:fs'
import { BuildUtilsLog } from './log'

const stage = 'File'

export async function BuildUtilsReadFile(path: string) {
  BuildUtilsLog(`Reading File: ${path}`, stage)
  return await fs.readFile(path, 'utf8')
}

export async function BuildUtilsWriteFile(path: string, data: any) {
  BuildUtilsLog(`Writing data into File: ${path}`, stage)
  return await fs.writeFile(path, data, 'utf8')
}
