interface ImportMetaEnv {
  /**
   * use for all env
   * app title
   */
  VITE_APP_TITLE: string

  /**
   * only used for dev
   * dev server port
   */
  VITE_PORT: number

  /**
   * only used for dev
   * dev server host
   */
  VITE_HOST: string

  /* public path */
  VITE_PUBLIC_PATH: string

  /**
   * normaly three params
   * [[a, b, c], [d, e, f], ...]
   * current only got two, first for http proxy, second for socket proxy
   * first param: 0 => no proxy, need to provide below `VITE_API_REAL_URL`, 1 => use proxy, need to provide below `VITE_PROXY_PREFIX`
   * second param: proxy string, used for nginx etc
   * third param: real url
   * @extra socket got the fourth and fifth params, which are `socket path` and `socket namespace`
   */
  VITE_PROXY: string

  /**
   * crypto key/iv
   * [key, iv]
   */
  VITE_CRYPTO_PERSIST: string
  VITE_CRYPTO_REQUEST: string
  VITE_CRYPTO_RESPONSE: string

  /**
   * seconds config
   */
  VITE_SECONDS_AXIOS_TIMEOUT: number
  VITE_SECONDS_AXIOS_CACHE: number
  VITE_SECONDS_PERSIST: number

  /**
   * only used for staging and production build
   * 0 => normal build, no obfuscator
   * 1 => use `rollup-plugin-obfuscator` to obfuscator the code
   */
  VITE_BUILD_OBFUSCATOR: number

  /**
   * only used for staging and production build
   * 0 => normal build, no drop console
   * 1 => use `rollup-plugin-obfuscator` to obfuscator the code
   */
  VITE_BUILD_DROP_CONSOLE: number

  /**
   * only used for staging and production build
   * build output dir, normally `dist`
   */
  VITE_BUILD_OUT_DIR: string

  /**
   * only used for staging and production build
   * 0 => not for demo purpose
   * 1 => for demo purpose, some sensitive api will be disabled
   */
  VITE_BUILD_DEMO: string
}
