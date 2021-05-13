export const emptyFunction = () => {}

// Get Api prefix like `/api/v1/`
export const getApiPrefix = (base: string, version: number) => {
  return `/${base}/v${version}`
}
