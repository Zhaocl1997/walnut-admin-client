import { base64ToBlob, imgUrlToBase64 } from './base64'

const { createBlobUrl } = useBlob()

/**
 * @description Download online url resources
 */
export const downloadByOnlineUrl = async (url: string, fileName?: string) => {
  const base64 = await imgUrlToBase64(url)

  await downloadByBase64(base64, fileName)
}

/**
 * @description Download base64 resources
 */
export const downloadByBase64 = async (base64: string, fileName?: string) => {
  const blob = await base64ToBlob(base64)

  await downloadByBlob(blob, fileName)
}

/**
 * @description Download blob resources
 */
export const downloadByBlob = async (data: Blob, fileName?: string) => {
  const tempBlobURL = await createBlobUrl(data)

  await downloadByUrl(tempBlobURL, fileName)
}

/**
 * @description Download url resources
 */
export const downloadByUrl = (
  url: string,
  fileName?: string,
  target: TargetContext = '_blank'
) => {
  return new Promise<boolean>((resolve, reject) => {
    if (/(iP)/g.test(window.navigator.userAgent)) {
      reject('Your browser does not support download!')
    }

    try {
      const a = document.createElement('a')
      a.href = url
      a.target = target
      a.style.display = 'none'

      a.download =
        fileName || url.substring(url.lastIndexOf('/') + 1, url.length)

      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)

      resolve(true)
    } catch (error) {
      reject(error)
    }
  })
}
