import { loadEnv } from 'vite'

export const getEnv = (mode: string, root: string): Partial<ImportMetaEnv> => {
  const ret = {}

  const env: Recordable = loadEnv(mode, root)

  const envNumberKeys: string[] = ['VITE_PROT', 'VITE_API_VERSION']

  Object.entries(env).map(([key, value]: [string, any]) => {
    if (envNumberKeys.includes(key)) {
      ;(ret[key] as keyof ImportMetaEnv) = parseInt(value)
    }

    ret[key] = value
  })

  return ret
}
