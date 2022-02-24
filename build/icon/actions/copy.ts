import {
  BuildUtilsCreateReadStream,
  BuildUtilsCreateWriteStream,
} from '../../utils/fs'
import {
  listPath,
  bundlePath,
  listCopyPath,
  bundleCopyPath,
} from '../../utils/paths'
;(() => {
  const file = BuildUtilsCreateReadStream(bundlePath)
  const out = BuildUtilsCreateWriteStream(bundleCopyPath)

  // copy the icon bundle file
  file.pipe(out)
})()
;(() => {
  const file = BuildUtilsCreateReadStream(listPath)
  const out = BuildUtilsCreateWriteStream(listCopyPath)

  // copy the icon list
  file.pipe(out)
})()
