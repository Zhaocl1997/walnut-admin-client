export const AppLog = (msg: string | unknown) => {
  AppTerminalLog(msg)
  AppBrowserLog(msg)
}

export const AppInfo = (msg: string | unknown) => {
  AppTerminalInfo(msg)
  AppBrowserInfo(msg)
}

export const AppWarn = (msg: string | unknown) => {
  AppTerminalWarn(msg)
  AppBrowserWarn(msg)
}

export const AppError = (msg: string | unknown) => {
  AppTerminalError(msg)
  AppBrowserError(msg)
}
