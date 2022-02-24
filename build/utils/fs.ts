import fs from 'fs'

export const BuildUtilsCreateReadStream = (path: string) => {
  console.log('Creating Readable Stream from: ' + path)
  return fs.createReadStream(path)
}

export const BuildUtilsCreateWriteStream = (path: string) => {
  console.log('Creating Writable Stream from: ' + path)
  return fs.createWriteStream(path)
}

export const BuildUtilsUnlinkSync = (path: string) => {
  console.log('Removing file: ' + path)
  return fs.unlinkSync(path)
}
