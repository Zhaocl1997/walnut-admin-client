import type { WForm } from '/@/components/UI/Form'
import type { Menu } from '/@/router/types'
import type { Ref } from 'vue'

import { computed, unref, ref, watch } from 'vue'
import { findPath, formatTree } from 'easy-fns-ts'

import enMessages from '/@/locales/lang/en'
import zhMessages from '/@/locales/lang/zh_CN'

import { MenuTypeEnum } from '/@/enums/menu'
import { LocaleEnum } from '/@/enums/locale'

import { useAppContext } from '/@/App'
import { getMaybeI18nMsg } from '/@/locales/utils'

import { deepKeys, getViewsOptions } from './utils'

const ToFOptions: OptionDataItem[] = [
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
  formData: Ref<Menu>,
  tableData: Ref<Menu[]>,
  treeData: Ref<TreeDataItem<Menu>[]>
) => {
  const { app } = useAppContext()

  // view options
  const { viewOptions } = getViewsOptions()

  // path prefix
  const pathPrefix = ref('')

  /**
   * @description Get translated title list
   */
  const getTreeData = computed(() =>
    formatTree<Menu>(treeData.value, {
      format: (node) => ({ ...node, title: getMaybeI18nMsg(node.title) }),
    })
  )

  /**
   * @description Get translated title list
   */
  const getTitleList = computed(() =>
    (Array.from(
      deepKeys(app.value.locale === LocaleEnum.EN ? enMessages : zhMessages)
    ) as OptionDataItem[]).filter(
      (i) =>
        (i.value as string).includes('system.menu') ||
        (i.value as string).includes('common.base')
    )
  )

  /**
   * @description Get `path` prefix base on formData._id and formData.pid
   */
  watch(
    () => [unref(formData)._id, unref(formData).pid],
    ([id, pid]) => {
      const node = findPath<Menu>(
        unref(tableData),
        (n) => n._id === (pid ?? id)
      )

      if (!node) {
        pathPrefix.value = '/'
        return
      }

      const ret = (node as Menu[]).map((item) => item.path)
      pathPrefix.value = ret.join('/') + '/'
    }
  )

  const menuFormSchemas = computed((): WForm.Schema.Item<Menu>[] => {
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
          data: getTreeData,
          props: {
            id: '_id',
            label: 'title',
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
          prepend: pathPrefix,
        },
        extraProp: {
          vIf: ({ formData }) => {
            return formData.type !== MenuTypeEnum.ELEMENT
          },
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
        extraProp: {
          vIf: ({ formData }) => {
            return formData.type === MenuTypeEnum.CATALOG
          },
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
        extraProp: {
          vIf: ({ formData }) => {
            return (
              formData.type === MenuTypeEnum.MENU &&
              !(formData.external || formData.internal)
            )
          },
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
          onChange: (val) => {
            // Get the name property automatically from vue `name` property
            const target = viewOptions.find((item) => item.value == val)
            formData.value = { ...formData.value, name: target!.name }
          },
          filterable: true,
        },
        extraProp: {
          vIf: ({ formData }) => {
            return (
              formData.type === MenuTypeEnum.MENU &&
              !(formData.external || formData.internal)
            )
          },
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
        extraProp: {
          vIf: ({ formData }) => {
            return formData.type !== MenuTypeEnum.ELEMENT
          },
        },
      },

      // Icon
      {
        type: 'Slot',
        formProp: {
          prop: 'icon',
          label: 'Icon',
        },
        extraProp: {
          vIf: ({ formData }) => {
            return formData.type !== MenuTypeEnum.ELEMENT
          },
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
        extraProp: {
          vIf: ({ formData }) => {
            return formData.type === MenuTypeEnum.MENU && formData.internal!
          },
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
        extraProp: {
          vIf: ({ formData }) => {
            return formData.type === MenuTypeEnum.MENU && formData.external!
          },
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
        extraProp: {
          vIf: ({ formData }) => {
            return (
              formData.type === MenuTypeEnum.MENU &&
              (formData.external! || formData.internal!)
            )
          },
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
        extraProp: {
          vIf: ({ formData }) => {
            return formData.type !== MenuTypeEnum.ELEMENT
          },
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
        extraProp: {
          vIf: ({ formData }) => {
            return formData.type === MenuTypeEnum.MENU
          },
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
        extraProp: {
          vIf: ({ formData }) => {
            return formData.type !== MenuTypeEnum.ELEMENT
          },
        },
      },
    ]
  })

  return { menuFormSchemas }
}
