export const useBlob = () => {
  const URL = window.URL || window.webkitURL

  const tempBlobURL = ref<string>()

  const createBlobUrl = (b: Blob) =>
    new Promise<string>((resolve, reject) => {
      try {
        destroyBlobUrl()
        tempBlobURL.value = URL.createObjectURL(b)
        resolve(tempBlobURL.value)
      } catch (error) {
        reject(error)
      }
    })

  const destroyBlobUrl = () => {
    URL.revokeObjectURL(tempBlobURL.value!)
  }

  tryOnUnmounted(destroyBlobUrl)

  return {
    tempBlobURL,
    createBlobUrl,
    destroyBlobUrl,
  }
}
