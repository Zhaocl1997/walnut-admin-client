import { isFunction } from 'easy-fns-ts'

export function createIframe(dom: HTMLElement, src: string, onload?: Fn) {
  const iframe = document.createElement('iframe')
  iframe.className = 'h-full w-full'

  if (onload && isFunction(onload))
    useEventListener(iframe, 'load', onload)

  iframe.src = src
  dom.appendChild(iframe)

  return iframe
}

export function destroyIframe(iframe: HTMLIFrameElement) {
  iframe.src = 'about:blank'
  try {
    iframe.contentWindow!.document.write('')
  }
  catch (e) {}
  iframe.parentNode!.removeChild(iframe)
}
