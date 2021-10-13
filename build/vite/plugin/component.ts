import type { Plugin } from 'vite'

import type { Options } from 'vite-plugin-components'
import ViteComponents, { NaiveUiResolver } from 'vite-plugin-components'

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
            App: ['AppDarkMode', 'AppFullScreen', 'AppLocalePicker'],
            Extra: [
              'Arrow',
              'DemoCard',
              'Flipper',
              'IconPicker',
              'JSON',
              'Message',
              'Scrollbar',
              'Title',
              'Transition',
            ],
            UI: [
              'Button',
              'ButtonGroup',
              'Checkbox',
              'DatePicker',
              'DynamicTags',
              'Form',
              'Input',
              'InputNumber',
              'Radio',
              'Select',
              'Switch',
              'Table',
              'TimePicker',

              'Icon',
            ],
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
      NaiveUiResolver(),
    ],
  }

  return ViteComponents(config)
}
