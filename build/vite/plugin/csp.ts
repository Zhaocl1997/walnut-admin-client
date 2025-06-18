import csp from 'vite-plugin-csp-guard'

export function createCSPPlugin() {
  return csp({
    features: {
      cssInJs: true,
      mpa: false,
    },
    debug: true,
    override: true,
    type: 'SPA',
    dev: {
      run: true, // Run the plugin in dev mode
      outlierSupport: ['vue', 'tailwind'],
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
      sri: true,
      outlierSupport: ['vue-router'],
    },
  })
}
