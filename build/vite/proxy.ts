export interface ViteProxy {
  target: string
  prefix: string
}

export const createViteProxy = (config: ViteProxy) => {
  const ret: any = {}

  const { target, prefix } = config

  ret[prefix] = {
    target: target,
    changeOrigin: true,
    ws: true,
    rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
  }

  return ret
}
