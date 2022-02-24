import {
  BuildUtilsCreateReadStream,
  BuildUtilsCreateWriteStream,
  BuildUtilsUnlinkSync,
} from '../../utils/fs'
import {
  listPath,
  bundlePath,
  listCopyPath,
  bundleCopyPath,
} from '../../utils/paths'
;(() => {
  const file = BuildUtilsCreateReadStream(bundleCopyPath)
  const out = BuildUtilsCreateWriteStream(bundlePath)

  // copy back
  file.pipe(out)

  file.on('close', () => {
    // remove file
    BuildUtilsUnlinkSync(bundleCopyPath)
  })
})()
;(() => {
  const file = BuildUtilsCreateReadStream(listCopyPath)
  const out = BuildUtilsCreateWriteStream(listPath)

  // copy back
  file.pipe(out)

  file.on('close', () => {
    // remove file
    BuildUtilsUnlinkSync(listCopyPath)
  })
})()
