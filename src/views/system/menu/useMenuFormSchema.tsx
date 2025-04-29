import type { WForm } from '@/components/UI/Form'
import { findPath } from 'easy-fns-ts'
import { getViewsOptions, menuTernalOptions, menuTypeOptions } from './utils'

export function useMenuFormSchema(actionType: Ref<ActionType>, formData: Ref<RecordNullable<AppSystemMenu>>, treeData: ComputedRef<TreeNodeItem<AppSystemMenu>[]>, menuActiveNamesOptions: Ref<{ name: string, title: string }[]>):
  | IDeepMaybeRef<WForm.Schema.Item<AppSystemMenu>[]>
  | WForm.Schema.Item<AppSystemMenu>[] {
  // get view options and name options
  const { viewOptions, nameOptions } = getViewsOptions()

  // get node item from tree data
  const getCurrentNode = computed(
    () =>
      treeData.value
      && findPath<AppSystemMenu>(
        treeData.value,
        n => n._id === formData.value.pid,
      ),
  )

  // for path prefix, better experience
  const getRoutePathPrefix = computed(() =>
    !getCurrentNode.value
      ? '/'
      : `${(getCurrentNode.value as AppSystemMenu[])
        .map(item => item.path)
        .join('/')}/`,
  )

  const treeExpandedKeys = ref<string[]>()

  // get tree select expanded keys
  const getTreeSelectExpandKeys = computed(
    () =>
      treeExpandedKeys.value
      ?? (getCurrentNode.value as AppSystemMenu[])?.map(i => i._id!),
  )

  return [
    {
      type: 'Extend:Divider',
      componentProp: {
        title: 'form.menu.divider1',
      },
    },

    {
      type: 'Base:Render',
      formProp: {
        path: 'type',
      },
      componentProp: {
        render: ({ formData }) => {
          if (actionType.value === 'create' || !actionType.value) {
            return (
              <w-radio
                v-model={[formData.type, 'value']}
                options={menuTypeOptions}
              >
                {formData.type}
              </w-radio>
            )
          }

          if (actionType.value === 'update') {
            return (
              <n-tag
                type={
                  formData.type === 'menu'
                    ? 'success'
                    : formData.type === 'element'
                      ? 'warning'
                      : 'info'
                }
              >
                {formData.type}
              </n-tag>
            )
          }
        },
      },
    },

    {
      type: 'Raw:TreeSelect',
      formProp: {
        path: 'pid',
      },
      componentProp: {
        // @ts-expect-error
        options: treeData,
        keyField: '_id',
        labelField: 'title',
        // @ts-expect-error
        expandedKeys: getTreeSelectExpandKeys,
        onUpdateExpandedKeys: (v) => {
          treeExpandedKeys.value = v
        },
      },
    },

    {
      type: 'Business:Dict',
      formProp: {
        path: 'status',
      },
      componentProp: {
        dictType: 'sys_shared_status',
        renderType: 'radio',
        defaultValue: true,
        componentProps: {
          button: true,
        },
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type !== AppConstMenuType.ELEMENT,
      },
    },

    {
      type: 'Extend:Divider',
      componentProp: {
        title: 'form.menu.divider2',
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type !== AppConstMenuType.ELEMENT,
      },
    },

    {
      type: 'Base:Input',
      formProp: {
        path: 'path',
      },
      componentProp: {
        clearable: true,
        prefix: getRoutePathPrefix,
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type !== AppConstMenuType.ELEMENT,
      },
    },

    // when type is `catalog`, it's just input
    // when type is `menu`, it's select
    {
      type: 'Base:Render',
      formProp: {
        path: 'name',
        labelHelpMessage: true,
      },
      componentProp: {
        render: ({ formData }) => {
          if (
            formData.type === AppConstMenuType.CATALOG
            || formData.ternal !== AppConstMenuTernal.NONE
          ) {
            return (
              <WInput
                v-model={[formData.name, 'value']}
                clearable
                valueModifiers={{ capitalize: true }}
              >
              </WInput>
            )
          }

          if (
            formData.type === AppConstMenuType.MENU
            && formData.ternal === AppConstMenuTernal.NONE
          ) {
            return (
              <n-select
                v-model={[formData.name, 'value']}
                clearable
                filterable
                disabled
                options={nameOptions}
              >
              </n-select>
            )
          }
        },
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type !== AppConstMenuType.ELEMENT,
      },
    },

    // Auto bump `views` children vue file
    // To avoid to appear in options, you can set `defaultView: false` in the same level of `setup`
    {
      type: 'Base:Select',
      formProp: {
        path: 'component',
        labelHelpMessage: true,
      },
      componentProp: {
        clearable: true,
        options: viewOptions,
        filterable: true,
        tooltip: true,
        onUpdateValue: (val: string) => {
          // Get the name property automatically from vue `name` property
          const target = viewOptions.find(item => item.value === val)
          formData.value.name = target?.name
        },
      },
      visibleProp: {
        vIf: ({ formData }) =>
          formData.type === AppConstMenuType.MENU
          && formData.ternal === AppConstMenuTernal.NONE,
      },
    },

    {
      type: 'Extend:Divider',
      componentProp: {
        title: 'form.menu.divider3',
      },
    },

    {
      type: 'Extra:LocaleSelect',
      formProp: {
        path: 'title',
        labelHelpMessage: true,
      },
      componentProp: {
        // key start with `sys.menu.` are all menu title
        prefix: 'sys.menu.',
        presetKey: 'sys.menu.',
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type !== AppConstMenuType.ELEMENT,
      },
    },

    {
      type: 'Extra:IconPicker',
      formProp: {
        path: 'icon',
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type !== AppConstMenuType.ELEMENT,
      },
    },

    {
      type: 'Base:InputNumber',
      formProp: {
        path: 'order',
      },
      componentProp: {
        clearable: true,
      },
    },

    {
      type: 'Base:Radio',
      formProp: {
        path: 'ternal',
      },
      componentProp: {
        options: menuTernalOptions,
      },
      visibleProp: {
        vIf: ({ formData }) =>
          formData.type === AppConstMenuType.MENU
          && actionType.value === 'create',
      },
    },

    {
      type: 'Base:Input',
      formProp: {
        path: 'url',
      },
      componentProp: {
        clearable: true,
      },
      visibleProp: {
        vIf: ({ formData }) =>
          formData.type === AppConstMenuType.MENU
          && formData.ternal !== AppConstMenuTernal.NONE,
      },
    },

    {
      type: 'Base:Switch',
      formProp: {
        path: 'cache',
        labelHelpMessage: true,
        rule: false,
      },
      visibleProp: {
        vIf: ({ formData }) =>
          formData.type === AppConstMenuType.MENU
          && formData.ternal !== AppConstMenuTernal.EXTERNAL,
      },
    },

    {
      type: 'Base:Switch',
      formProp: {
        path: 'show',
        labelHelpMessage: true,
        rule: false,
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type !== AppConstMenuType.ELEMENT,
      },
    },

    {
      type: 'Base:Switch',
      formProp: {
        path: 'affix',
        labelHelpMessage: true,
        rule: false,
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type === AppConstMenuType.MENU,
      },
    },

    {
      type: 'Base:Input',
      formProp: {
        path: 'permission',
        rule: false,
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type === AppConstMenuType.ELEMENT,
      },
    },

    {
      type: 'Base:Select',
      formProp: {
        path: 'menuActiveName',
        rule: false,
      },
      componentProp: {
        options: computed(() =>
          menuActiveNamesOptions.value.map(i => ({
            value: i.name,
            label: AppI18n.global.t(i.title),
          })),
        ),
        filterable: true,
        clearable: true,
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type === AppConstMenuType.MENU,
      },
    },

    {
      type: 'Base:Switch',
      formProp: {
        path: 'menuActiveSameTab',
        rule: false,
      },
      visibleProp: {
        vIf: ({ formData }) =>
          formData.type === AppConstMenuType.MENU && !!formData.menuActiveName,
      },
    },

    {
      type: 'Extra:TransitionSelect',
      formProp: {
        path: 'animationName',
        rule: false,
      },
      componentProp: {
        clearable: true,
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type === AppConstMenuType.MENU,
      },
    },

    {
      type: 'Extra:IconPicker',
      formProp: {
        path: 'activeIcon',
        rule: false,
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type !== AppConstMenuType.ELEMENT,
      },
    },

    {
      type: 'Base:Input',
      formProp: {
        path: 'badge',
        rule: false,
      },
      componentProp: {
        clearable: true,
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type !== AppConstMenuType.ELEMENT,
      },
    },

    {
      type: 'Base:Switch',
      formProp: {
        path: 'position',
        rule: false,
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type === AppConstMenuType.MENU,
      },
    },

    {
      type: 'Base:Switch',
      formProp: {
        path: 'leaveTip',
        rule: false,
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type === AppConstMenuType.MENU,
      },
    },
  ]
}
