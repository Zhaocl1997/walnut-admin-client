export function useCleanLocalStroage() {
  const { version } = __APP_INFO__
  Object.keys(window.localStorage).forEach((key) => {
    // only clean prefixed storage
    // version not matched
    if (key.startsWith(storagePrefix) && !key.includes(version))
      window.localStorage.removeItem(key)
  })
}
