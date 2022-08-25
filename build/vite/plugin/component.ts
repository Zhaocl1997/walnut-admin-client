import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

const comp = {
  Advanced: [
    'CRUD',
    'AIcon',
    'ApiSelect',
    'AreaCascader',
    'LocaleSelect',
    'RoleSelect',
  ],
  App: [
    'AppDarkMode',
    'AppFullScreen',
    'AppLocalePicker',
    'AppLock',
    'AppSearch',
    'AppSettings',
    'AppAuthorize',
  ],
  Extra: [
    'AbsImage',
    'Arrow',
    'DemoCard',
    'FlipClock',
    'Flipper',
    'IconPicker',
    'JSON',
    'Message',
    'QRCode',
    'Scrollbar',
    'Title',
    'Transition',
    'TransitionSelect',
    'Verify',
  ],
  UI: [
    'Button',
    'ButtonGroup',
    'Card',
    'Checkbox',
    'DatePicker',
    'Descriptions',
    'Drawer',
    'Dropdown',
    'DynamicTags',
    'Form',
    'Icon',
    'Input',
    'InputNumber',
    'Modal',
    'Radio',
    'Select',
    'Switch',
    'Table',
    'TimePicker',
    'Tree',
  ],
  Vendor: [
    'AvatarUpload',
    'Cropper',
    'Echarts',
    'LocationPicker',
    'OSSUpload',
    'Tinymce',
  ],
}

export const createComponentPlugin = (): VitePlugin => {
  return Components({
    dirs: ['@/components'],

    extensions: ['vue', 'ts', 'tsx'],

    // allow auto import and register components used in markdown
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/, // .md
    ],

    dts: 'types/components.d.ts',

    deep: false,

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
                path = `@/components/${key}/${componentName}`
              }
            }
          })

          return path
        }
      },
    ],
  })
}
