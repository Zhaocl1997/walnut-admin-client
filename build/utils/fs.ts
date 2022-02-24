import {
  createReadStream,
  createWriteStream,
  unlinkSync,
  promises as fs,
} from 'fs'
import { BuildUtilsLog } from './log'

const stage = 'File'

export const BuildUtilsCreateReadStream = (path: string) => {
  BuildUtilsLog(`Creating Readable Stream from: ${path}`, stage)
  return createReadStream(path)
}

export const BuildUtilsCreateWriteStream = (path: string) => {
  BuildUtilsLog(`Creating Writable Stream from: ${path}`, stage)
  return createWriteStream(path)
}

export const BuildUtilsUnlinkSync = (path: string) => {
  BuildUtilsLog(`Removing file: ${path}`, stage)
  return unlinkSync(path)
}

export const BuildUtilsReadFile = async (path: string) => {
  BuildUtilsLog(`Reading File: ${path}`, stage)
  return await fs.readFile(path, 'utf8')
}

export const BuildUtilsWriteFile = async (path: string, data: any) => {
  BuildUtilsLog(`Writing data into File: ${path}`, stage)
  return await fs.writeFile(path, data, 'utf8')
}
