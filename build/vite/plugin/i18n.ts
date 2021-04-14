import type { Plugin } from 'vite'

import vueI18n from '@intlify/vite-plugin-vue-i18n'
import { resolve } from 'path'

export const createI18nPlugin = (): Plugin => {
  return vueI18n({
    include: resolve(__dirname, '../../../src/locales/**'),
    // If you need on-demand compilation with Message compiler, you need to set the runtimeOnly option to false.
    runtimeOnly: false,
    // When this plugin is installed, Vue I18n can only use the Composition API, and if you want to use the Legacy API, you need to set the compositionOnly option to false.
    compositionOnly: true,
  })
}
