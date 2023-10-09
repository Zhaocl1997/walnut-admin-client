type EnvFetchType = 'title' | 'crypto' | 'proxy' | 'seconds' | 'build'

export function useAppEnv(type?: EnvFetchType,
  env: ImportMetaEnv = import.meta.env) {
  if (type === 'title') {
    return {
      title: env.VITE_APP_TITLE,
    }
  }

  if (type === 'proxy') {
    const proxy = JSON.parse(env.VITE_PROXY)

    const api = proxy[0]
    const ws = proxy[1]

    return {
      api,
      ws,
      httpUrl: +api[0] === 1 ? api[1] : api[2],
      baseURLForSocket: +ws[0] === 1 ? ws[1] : ws[2],
    }
  }

  if (type === 'seconds') {
    return {
      axiosTimeout: env.VITE_SECONDS_AXIOS_TIMEOUT,
      axiosCache: env.VITE_SECONDS_AXIOS_CACHE,
      persist: env.VITE_SECONDS_PERSIST,
    }
  }

  if (type === 'build') {
    const userProfile = useAppStoreUserProfile()

    return {
      obfuscator: +env.VITE_BUILD_OBFUSCATOR === 1,
      dropConsole: +env.VITE_BUILD_DROP_CONSOLE === 1,
      outDir: env.VITE_BUILD_OUT_DIR,
      publicPath: env.VITE_PUBLIC_PATH,
      // TODO hard coded
      demo: +env.VITE_BUILD_DEMO === 1 && userProfile.profile.userName !== 'admin',
    }
  }

  return {}
}
