import type { WForm } from '@/components/UI/Form'
// TODO 111
import WInput from '@/components/UI/Input'
import WRadio from '@/components/UI/Radio'

import { findPath } from 'easy-fns-ts'
// TODO 111
import { NSelect } from 'naive-ui'
import { getViewsOptions, menuTernalOptions, menuTypeOptions } from './utils'

export function useMenuFormSchema(
  actionType: Ref<ActionType>,
  formData: Ref<RecordNullable<AppSystemMenu>>,
  treeData: ComputedRef<TreeNodeItem<AppSystemMenu>[]>,
  menuActiveNamesOptions: Ref<{ name: string, title: string }[]>,
) {
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
        render: ({ formData }) => (
          <WRadio
            v-model={[formData.type, 'value']}
            options={menuTypeOptions}
          >
            {formData.type}
          </WRadio>
        ),
      },
    },

    {
      type: 'Base:TreeSelect',
      formProp: {
        path: 'pid',
      },
      componentProp: {
        treeSelectProps: {
          options: treeData ?? [],
          keyField: '_id',
          labelField: 'title',
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
        prefixClass: 'text-gray-5',
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type !== AppConstMenuType.ELEMENT,
      },
    },

    // when type is `catalog`, it's just input
    {
      type: 'Base:Input',
      formProp: {
        path: 'name',
        labelHelpMessage: true,
      },
      componentProp: {
        clearable: true,
        valueModifiers: {
          capitalize: true,
        },
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type !== AppConstMenuType.ELEMENT
          && (formData.type === AppConstMenuType.CATALOG || formData.ternal !== AppConstMenuTernal.NONE),
      },
    },

    // when type is `menu`, it's select
    {
      type: 'Base:Select',
      formProp: {
        path: 'name',
        labelHelpMessage: true,
      },
      componentProp: {
        clearable: true,
        filterable: true,
        disabled: true,
        options: nameOptions,
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type !== AppConstMenuType.ELEMENT
          && (formData.type === AppConstMenuType.MENU && formData.ternal === AppConstMenuTernal.NONE),
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
          formData.value = Object.assign(formData.value, { name: target?.name })
        },
      },
      visibleProp: {
        vIf: ({ formData }) => formData.type === AppConstMenuType.MENU && formData.ternal === AppConstMenuTernal.NONE,
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
            // @ts-expect-error fuck t
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
  ] as WForm.Schema.Item<AppSystemMenu>[]
}
