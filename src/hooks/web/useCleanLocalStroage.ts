import pkg from '../../../package.json'

export const useCleanLocalStroage = () => {
  Object.keys(window.localStorage).forEach((key) => {
    if (!key.includes(pkg.version)) {
      // remove localeStorage that are not current version
      // also that are not set by us, which key does not have version flag
      window.localStorage.removeItem(key)
    }
  })
}
