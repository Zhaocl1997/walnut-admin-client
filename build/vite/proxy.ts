import type { HttpProxy } from 'vite'
import { getApiPrefix } from '/@/utils'

export const createViteProxy = (mode: string, env: ImportMetaEnv) => {
  const ret = {}

  const apiPrefix = getApiPrefix(env.VITE_API_PREFIX, env.VITE_API_VERSION)

  ret[apiPrefix] = {
    target: env.VITE_PORT,
    changeOrigin: true,
    ws: true,
    rewrite: (path: string) => path.replace(new RegExp(`^${apiPrefix}`), ''),
  } as HttpProxy.ServerOptions

  return ret
}
