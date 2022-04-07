import type { HttpProxy } from 'vite'

export const createViteProxy = (mode: string, env: ImportMetaEnv) => {
  const ret = {}

  const prefix = env.VITE_PROXY_PREFIX

  ret[prefix] = {
    target: env.VITE_API_TARGET,
    changeOrigin: true,
    rewrite: (path: string) =>
      path.replace(new RegExp(`^${prefix}`), env.VITE_API_PREFIX),
    secure: false,
  } as HttpProxy.ServerOptions

  return ret
}
