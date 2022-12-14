import type { ProxyOptions } from 'vite'
import { useLoadEnv } from '../../src/hooks/core/useLoadEnv'

export const createViteProxy = (env: ImportMetaEnv) => {
  const ret: Record<string, ProxyOptions> = {}

  const { api, ws } = useLoadEnv('proxy', env)

  if (+api[0] === 1) {
    const prefix = api[1]
    const target = api[2]

    ret[prefix] = {
      target,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(new RegExp(`^${prefix}`), ''),
      secure: false,
    }
  }

  if (+ws[0] === 1) {
    const prefix = ws[1]
    const target = `${ws[2]}${ws[3]}`

    ret[prefix] = {
      target,
      changeOrigin: true,
      rewrite: (path: string) => path.replace(new RegExp(`^${prefix}`), ''),
      secure: false,
      ws: true,
    }
  }

  return ret
}
