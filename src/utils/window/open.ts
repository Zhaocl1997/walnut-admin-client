/**
 * @description open external link safely
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/open#noopener
 */
export const openExternalLink = (
  url: string,
  safe = false,
  target: '_blank' | '_self' = '_blank',
) => {
  if (safe) {
    window.open(
      `${AppOpenExternalPath}?url=${url}`,
      target,
      'noopener=yes, noreferrer=yes',
    )
  }
  else {
    window.open(url, target, 'noopener=yes, noreferrer=yes')
  }
}

/**
 * @description open oauth window
 */
export const openOAuthWindow = (url: string) => {
  return window.open(
    url,
    '_blank',
    'height=900, width=600, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no',
  )
}
