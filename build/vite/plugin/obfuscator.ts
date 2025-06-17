import vitePluginBundleObfuscator from 'vite-plugin-bundle-obfuscator'
import pkg from '../../../package.json'

export function createObfuscatorPlugin() {
  return vitePluginBundleObfuscator({
    enable: true,
    log: true,
    threadPool: true,
    autoExcludeNodeModules: {
      enable: true,
      manualChunks: Object.keys(pkg.dependencies),
    },
    options: {
      optionsPreset: 'low-obfuscation',
    },
  })
}
