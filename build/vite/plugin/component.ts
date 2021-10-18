import type { Plugin } from 'vite'

import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

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
    'Icon',
    'Input',
    'InputNumber',
    'Radio',
    'Select',
    'Switch',
    'Table',
    'TimePicker',
  ],
}

export const createComponentPlugin = (): Plugin => {
  return Components({
    dirs: ['src/components'],

    extensions: ['vue', 'ts', 'md', 'tsx'],

    deep: false,

    // dts: 'types/components.d.ts',

    resolvers: [
      // Naive
      NaiveUiResolver(),

      // Custom
      (name) => {
        if (name.startsWith('W')) {
          const componentName = name.slice(1)

          let path = ''
          Object.entries(comp).map(([key, value]) => {
            for (let i = 0; i < value.length; i++) {
              if (componentName === value[i]) {
                path = `/@/components/${key}/${componentName}`
              }
            }
          })

          return path
        }
      },
    ],

    // allow auto import and register components used in markdown
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],
  })
}
