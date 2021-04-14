import { loadEnv } from 'vite'

export const getEnv = (mode: string, root: string): Partial<ImportMetaEnv> => {
  const ret: Partial<ImportMetaEnv> = {}

  const env: any = loadEnv(mode, root)

  const envNumberKeys: string[] = ['VITE_PROT', 'VITE_API_VERSION']

  Object.entries(env).map(([key, value]: [string, any]) => {
    if (envNumberKeys.includes(key)) {
      ;(ret[key] as keyof ImportMetaEnv) = parseInt(value)
    }

    ret[key] = value
  })

  return ret
}

export const getApiPrefix = (base: string, version: number) => {
  return `/${base}/v${version}`
}
