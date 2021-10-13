import type { Plugin } from 'vite'

import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export const createComponentPlugin = (): Plugin => {
  return Components({
    resolvers: [
      // Naive
      NaiveUiResolver(),

      // Custom
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
    ],

    extensions: ['vue', 'ts', 'tsx'],

    deep: false,

    // /**
    //  * @description Auto import component
    //  */
    // customComponentResolvers: [
    //   (name) => {
    //     if (name.startsWith('W')) {
    //       const componentName = name.slice(1)

    //       const comp = {
    //         App: ['AppDarkMode', 'AppFullScreen', 'AppLocalePicker'],
    //         Extra: [
    //           'Arrow',
    //           'DemoCard',
    //           'Flipper',
    //           'IconPicker',
    //           'JSON',
    //           'Message',
    //           'Scrollbar',
    //           'Title',
    //           'Transition',
    //         ],
    //         UI: [
    //           'Button',
    //           'ButtonGroup',
    //           'Checkbox',
    //           'DatePicker',
    //           'DynamicTags',
    //           'Form',
    //           'Input',
    //           'InputNumber',
    //           'Radio',
    //           'Select',
    //           'Switch',
    //           'Table',
    //           'TimePicker',

    //           'Icon',
    //         ],
    //       }

    //       let ret = ''
    //       Object.entries(comp).map(([key, value]) => {
    //         for (let i = 0; i < value.length; i++) {
    //           if (componentName === value[i]) {
    //             ret = `/@/components/${key}/${componentName}`
    //           }
    //         }
    //       })
    //       return ret
    //     }
    //   },
    // ],
  })
}
