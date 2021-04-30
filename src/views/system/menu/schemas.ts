import type { WFormSchemaItem } from '/@/components/UI/Form'

import { computed, toRaw, unref, ref, watch } from 'vue'
import { findPath } from 'easy-fns-ts'

import { MenuTypeEnum } from '/@/enums/menu'
import { LocaleEnum } from '/@/enums/locale'

import { useViews } from '/@/hooks/core/useViews'

import { AppI18n } from '/@/locales'
import enMessages from '/@/locales/lang/en'
import zhMessages from '/@/locales/lang/zh_CN'

import { deepKeys } from './utils'
import { Menu } from '/@/router/types'

const ToFOptions: BaseOptionItemType[] = [
  {
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'No',
  },
]

export const getMenuFormSchemas = (
  formData: any,
  tableData: any,
  treeData: any
) => {
  const pathPrefix = ref('')

  const { viewOptions } = useViews()

  /**
   * @description Get translated title list
   */
  const getTitleList = computed((): any[] => {
    const locale = (AppI18n.global.locale as any).value

    const params = locale === LocaleEnum.EN ? enMessages : zhMessages

    return Array.from(deepKeys(params)).filter(
      (i: any) =>
        i.value.includes('system.menu') || i.value.includes('common.base')
    )
  })

  /**
   * @description Get `path` prefix base on formData._id
   */
  watch(
    () => unref(formData)._id,
    (val: any) => {
      if (!val) return

      const node = findPath<Menu & { _id?: string }>(
        unref(tableData),
        (n) => n._id === val
      )
      const ret = node!.map((item: any) => item.path)

      if (ret.length === 1) {
        pathPrefix.value = '/'
        return
      }

      ret.pop()
      pathPrefix.value = ret.join('/') + '/'
    }
  )

  const menuFormSchemas = computed((): WFormSchemaItem[] => {
    return [
      // Parent node
      {
        type: 'SelectTree',
        formProp: {
          prop: 'pid',
          label: 'Parent Menu',
        },
        componentProp: {
          placeholder: 'Select parent menu.',
          clearable: true,
          data: treeData,
          props: {
            id: '_id',
            label: 'title',
          },
          onChange: (val: any) => {
            const node = findPath(
              unref(tableData),
              (n: any) => n._id === val._id
            )

            const ret = node.map((item: any) => item.path)

            pathPrefix.value = ret.join('/') + '/'
          },
        },
      },

      // Menu type
      {
        type: 'Radio',
        formProp: {
          prop: 'type',
          label: 'Menu Type',
        },
        componentProp: {
          button: true,
          options: [
            {
              value: MenuTypeEnum.CATALOG,
              label: 'Catalog',
            },
            {
              value: MenuTypeEnum.MENU,
              label: 'Menu',
            },
            {
              value: MenuTypeEnum.ELEMENT,
              label: 'Element',
            },
          ],
        },
      },

      // Smart `path` tip
      {
        type: 'Input',
        formProp: {
          prop: 'path',
          label: 'Route path',
        },
        componentProp: {
          placeholder: 'Route path field.',
          clearable: true,
          prepend: (toRaw(pathPrefix) as unknown) as string,
        },
        vShow: ({ formData }) => {
          return formData.type !== MenuTypeEnum.ELEMENT
        },
      },

      // `catelog` type is `Input`
      {
        type: 'Input',
        formProp: {
          prop: 'name',
          label: 'Route name',
        },
        componentProp: {
          placeholder: 'Route name field.',
          clearable: true,
          modelModifiers: {
            capitalize: true,
          },
        },
        // visible:
        //   (getNotElement.value && !getIsMenu.value) ||
        //   (getIsMenu.value &&
        //     (unref(formData).external || unref(formData).internal)),
        vShow: ({ formData }) => {
          return formData.type === MenuTypeEnum.CATALOG
        },
      },

      // Only `menu` type is `Select`
      {
        type: 'Select',
        formProp: {
          prop: 'name',
          label: 'Route name',
        },
        componentProp: {
          placeholder: 'Route name field.',
          clearable: true,
          disabled: true,
          options: viewOptions,
          optionValue: 'name',
          optionLabel: 'name',
        },
        vShow: ({ formData }) => {
          return (
            formData.type === MenuTypeEnum.MENU &&
            !(formData.external || formData.internal)
          )
        },
      },

      // Auto bump `views` children vue file
      // To avoid to appear in options, you can set `defaultView: false` in the same level of `setup`
      {
        type: 'Select',
        formProp: {
          prop: 'component',
          label: 'Route component',
        },
        componentProp: {
          placeholder: 'Route component field.',
          clearable: true,
          options: viewOptions,
          onChange: (val: any) => {
            // Get the name property automatically from vue `name` property
            const target = viewOptions.find((item: any) => item.value == val)
            formData.value = { ...formData.value, name: target.name }
          },
          filterable: true,
        },
        vShow: ({ formData }) => {
          return (
            formData.type === MenuTypeEnum.MENU &&
            !(formData.external || formData.internal)
          )
        },
      },

      // Aside title
      {
        type: 'Select',
        formProp: {
          prop: 'title',
          label: 'Menu title',
        },
        componentProp: {
          placeholder: 'Menu title.',
          clearable: true,
          options: getTitleList,
          filterable: true,
        },
        vShow: ({ formData }) => {
          return formData.type !== MenuTypeEnum.ELEMENT
        },
      },

      // Icon
      {
        type: 'Slot',
        formProp: {
          prop: 'icon',
          label: 'Icon',
        },
        vShow: ({ formData }) => {
          return formData.type !== MenuTypeEnum.ELEMENT
        },
      },

      // Order
      {
        type: 'InputNumber',
        formProp: {
          prop: 'order',
          label: 'Order',
        },
        componentProp: {
          placeholder: 'Menu order displayed aside.',
        },
      },

      // Weather external
      {
        type: 'Radio',
        formProp: {
          prop: 'external',
          label: 'External Menu',
        },
        componentProp: {
          button: true,
          options: ToFOptions,
        },
        vShow: ({ formData }) => {
          return formData.type === MenuTypeEnum.MENU && formData.internal
        },
      },

      // Weather internal
      {
        type: 'Radio',
        formProp: {
          prop: 'internal',
          label: 'Internal Menu',
        },
        componentProp: {
          button: true,
          options: ToFOptions,
        },
        vShow: ({ formData }) => {
          return formData.type === MenuTypeEnum.MENU && formData.external
        },
      },

      // Internal/External link
      {
        type: 'Input',
        formProp: {
          prop: 'url',
          label: 'Url link',
        },
        componentProp: {
          placeholder: 'External/Internal url.',
          clearable: true,
        },
        vShow: ({ formData }) => {
          return (
            formData.type === MenuTypeEnum.MENU &&
            (formData.external || formData.internal)
          )
        },
      },

      // Weather show aside
      {
        type: 'Radio',
        formProp: {
          prop: 'show',
          label: 'Display aside',
        },
        componentProp: {
          button: true,
          options: [
            {
              value: true,
              label: 'Display',
            },
            {
              value: false,
              label: 'Hidden',
            },
          ],
        },
        vShow: ({ formData }) => {
          return formData.type !== MenuTypeEnum.ELEMENT
        },
      },

      // Keep alive flag
      {
        type: 'Radio',
        formProp: {
          prop: 'cache',
          label: 'Keep Alive',
        },
        componentProp: {
          button: true,
          options: [
            {
              value: true,
              label: 'Cached',
            },
            {
              value: false,
              label: 'No cached',
            },
          ],
        },
        vShow: ({ formData }) => {
          return formData.type === MenuTypeEnum.MENU
        },
      },

      // Status. `Disabled` means this menu won't be able to get from backend
      {
        type: 'Radio',
        formProp: {
          prop: 'status',
          label: 'Menu status',
        },
        componentProp: {
          button: true,
          options: [
            {
              value: true,
              label: 'Enable',
            },
            {
              value: false,
              label: 'Disabled',
            },
          ],
        },
        vShow: ({ formData }) => {
          return formData.type !== MenuTypeEnum.ELEMENT
        },
      },
    ]
  })

  return { menuFormSchemas }
}
