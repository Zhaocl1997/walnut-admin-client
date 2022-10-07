/**
 * @description open external link safely
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/open#noopener
 */
export const openExternalLink = (url: string) => {
  window.open(url, '_blank', 'noopener=yes, noreferrer=yes')
}

export const openOAuthWindow = (url: string) => {
  return window.open(
    url,
    '_blank',
    'height=900, width=600, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no'
  )
}
