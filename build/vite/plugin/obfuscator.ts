import vitePluginBundleObfuscator from 'vite-plugin-bundle-obfuscator'

export function createObfuscatorPlugin() {
  return vitePluginBundleObfuscator({
    enable: true,
    log: true,
    threadPool: true,
    autoExcludeNodeModules: true,
    options: {
      optionsPreset: 'low-obfuscation',
    },
  })
}
