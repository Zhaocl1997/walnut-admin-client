/**
 * @description open external link safely
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/open#noopener
 */
export const openExternalLink = (url: string) => {
  window.open(url, '_blank', 'noopener=yes, noreferrer=yes')
}

/**
 * @description open oauth window
 */
export const openOAuthWindow = (url: string) => {
  return window.open(
    url,
    '_blank',
    'height=900, width=600, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no'
  )
}

/**
 * @description open settings window
 */
export const openSettingsWindow = () => {
  return window.open(
    AppSettingsPath,
    AppSettingsName,
    'height=900,width=350,top=0,left=500,titlebar=no,toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,status=no,alwaysRaised=yes'
  )
}
