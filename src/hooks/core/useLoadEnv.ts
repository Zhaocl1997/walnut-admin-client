type EnvFetchType = 'title' | 'crypto' | 'proxy' | 'seconds' | 'build'

// used for vite.config.ts
export const useLoadEnv = (type: EnvFetchType, env: ImportMetaEnv) => {
  if (type === 'title') {
    return {
      title: env.VITE_APP_TITLE,
    }
  }

  if (type === 'crypto') {
    const [cryptoPersistKey, cryptoPersistIV] = JSON.parse(
      env.VITE_CRYPTO_PERSIST,
    )

    const [cryptoRequestKey, cryptoRequestIV] = JSON.parse(
      env.VITE_CRYPTO_REQUEST,
    )

    const [cryptoResponseKey, cryptoResponseIV] = JSON.parse(
      env.VITE_CRYPTO_RESPONSE,
    )

    return {
      cryptoPersistKey,
      cryptoPersistIV,
      cryptoRequestKey,
      cryptoRequestIV,
      cryptoResponseKey,
      cryptoResponseIV,
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
    return {
      obfuscator: +env.VITE_BUILD_OBFUSCATOR === 1,
      dropConsole: +env.VITE_BUILD_DROP_CONSOLE === 1,
      outDir: env.VITE_BUILD_OUT_DIR,
      publicPath: env.VITE_PUBLIC_PATH,
    }
  }

  return {}
}
