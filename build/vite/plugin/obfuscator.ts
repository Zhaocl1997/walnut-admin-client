import vitePluginBundleObfuscator from 'vite-plugin-bundle-obfuscator'
import pkg from '../../../package.json'

export function createObfuscatorPlugin() {
  return vitePluginBundleObfuscator({
    enable: true,
    log: true,
    threadPool: true,
    autoExcludeNodeModules: {
      enable: true,
      // https://github.com/z0ffy/vite-plugin-bundle-obfuscator/issues/122#issuecomment-2568652367
      manualChunks: Object.keys(pkg.dependencies),
    },
    options: {
      optionsPreset: 'low-obfuscation',
    },
  })
}
