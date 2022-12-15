export const useBlob = () => {
  const URL = window.URL || window.webkitURL

  const tempBlobURL = ref<string>()

  const destroyBlobUrl = () => {
    URL.revokeObjectURL(tempBlobURL.value!)
  }

  const createBlobUrl = (b: Blob) =>
    new Promise<string>((resolve, reject) => {
      try {
        destroyBlobUrl()
        tempBlobURL.value = URL.createObjectURL(b)
        resolve(tempBlobURL.value)
      }
      catch (error) {
        reject(error)
      }
    })

  tryOnUnmounted(destroyBlobUrl)

  return {
    tempBlobURL,
    createBlobUrl,
    destroyBlobUrl,
  }
}
