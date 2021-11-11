import fs from 'fs'

import {
  listPath,
  bundlePath,
  listCopyPath,
  bundleCopyPath,
} from '../utils/paths'

const action = process.argv[2]

if (action === '--copy') {
  ;(() => {
    const file = fs.createReadStream(bundlePath)
    const out = fs.createWriteStream(bundleCopyPath)

    // copy
    file.pipe(out)
  })()
  ;(() => {
    const file = fs.createReadStream(listPath)
    const out = fs.createWriteStream(listCopyPath)

    // copy
    file.pipe(out)
  })()
}

if (action === '--recovery') {
  ;(() => {
    const file = fs.createReadStream(bundleCopyPath)
    const out = fs.createWriteStream(bundlePath)

    // copy back
    file.pipe(out)

    // remove file
    fs.unlinkSync(bundleCopyPath)
  })()
  ;(() => {
    const file = fs.createReadStream(listCopyPath)
    const out = fs.createWriteStream(listPath)

    // copy back
    file.pipe(out)

    // remove file
    fs.unlinkSync(listCopyPath)
  })()
}
