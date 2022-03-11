/**
 * @description open external link safely
 * @link https://developer.mozilla.org/en-US/docs/Web/API/Window/open#noopener
 */
export const openExternalLink = (url: string) => {
  window.open(url, '_blank', 'noopener=yes,noreferrer=yes')
}
