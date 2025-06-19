import csp from 'vite-plugin-csp-guard'

export function createCSPPlugin(env: IViteEnv) {
  return csp({
    features: {
      cssInJs: true,
      mpa: false,
    },
    debug: true,
    override: false,
    type: 'SPA',
    algorithm: 'sha256',
    dev: {
      run: env.dev.csp, // Run the plugin in dev mode
      outlierSupport: ['vue', 'tailwind', 'scss'],
    },
    policy: {
      'default-src': ['\'self\'', 'https:'],
      'script-src': ['\'self\'', '\'unsafe-inline\'', '\'unsafe-eval\''],
      'style-src': ['\'self\'', '\'unsafe-inline\''],
      'img-src': ['\'self\'', 'data:', 'https:', 'blob:'],
      'font-src': ['\'self\'', 'data:', 'https://fonts.gstatic.com'],
      'script-src-elem': ['\'self\'', 'https:'],
      'style-src-elem': ['\'self\'', '\'unsafe-inline\''],
    },
    build: {
      // https://github.com/vitejs/vite/issues/2377#issuecomment-2571422093
      sri: false,
      outlierSupport: ['vue-router'],
    },
  })
}
