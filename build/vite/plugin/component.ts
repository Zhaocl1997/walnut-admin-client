import type { Plugin } from 'vite'

import type { Options } from 'vite-plugin-components'
import ViteComponents from 'vite-plugin-components'

export const createComponentPlugin = (): Plugin => {
  const config: Options = {
    /**
     * @description Override default .vue extensions
     */
    extensions: ['.ts', '.vue'],

    /**
     * @description Auto import component
     */
    customComponentResolvers: [
      (name) => {
        if (name.startsWith('W')) {
          const componentName = name.slice(1)

          const comp = {
            UI: [
              'Button',
              'Checkbox',
              'CheckTag',
              'Dialog',
              'Dropdown',
              'Empty',
              'Form',
              'Icon',
              'Input',
              'InputNumber',
              'Pagination',
              'Radio',
              'Scrollbar',
              'Select',
              'SelectTree',
              'Switch',
              'Table',
              'Tree',
            ],
            Help: [
              'Arrow',
              'Flipper',
              'IconPicker',
              'Json',
              'Message',
              'Title',
            ],
            App: ['AppLocalePicker', 'AppDarkMode', 'AppFullScreen'],
          }

          let ret = ''
          Object.entries(comp).map(([key, value]) => {
            for (let i = 0; i < value.length; i++) {
              if (componentName === value[i]) {
                ret = `/@/components/${key}/${componentName}`
              }
            }
          })
          return ret
        }
      },
    ],
  }

  return ViteComponents(config)
}
