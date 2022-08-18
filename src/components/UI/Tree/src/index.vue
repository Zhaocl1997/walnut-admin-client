<template>
  <div class="w-full">
    <n-input
      style="width: 90% !important"
      class="ml-4 mb-2"
      v-model:value="state.pattern"
      v-if="getProps.toolbar"
      clearable
      round
      size="small"
    >
      <template #suffix>
        <n-dropdown
          trigger="hover"
          :options="toolbarOptions"
          @select="onToolbarSelect"
          show-arrow
          size="small"
        >
          <WIcon
            height="20"
            icon="ant-design:more-outlined"
            class="cursor-pointer"
          ></WIcon>
        </n-dropdown>
      </template>
    </n-input>

    <w-transition appear>
      <n-alert
        v-if="getShowCopyMsg"
        type="warning"
        closable
        class="my-2"
        @close="state.copyTarget = {}"
      >
        {{ t('comp.tree.copy.msg') }}
      </n-alert>
    </w-transition>

    <w-scrollbar :height="getProps.maxHeight ?? 'auto'">
      <n-tree
        v-bind="getProps.treeProps"
        v-model:selected-keys="state.selectedKeys"
        v-model:checked-keys="state.checkedKeys"
        v-model:expanded-keys="state.expandedKeys"
        :checkable="getProps.multiple"
        :pattern="state.pattern"
        @update:selected-keys="onSelectedKeys"
        @update:checked-keys="onCheckedKeys"
        :node-props="nodeProps"
        :render-prefix="getProps.presetPrefixIcon ? onRenderPrefix : undefined"
        :render-suffix="
          getProps.treeProps?.draggable || getProps.deletable
            ? onRenderSuffix
            : undefined
        "
      ></n-tree>
    </w-scrollbar>

    <w-dropdown @hook="registerDropdown"></w-dropdown>
  </div>
</template>

<script lang="tsx" setup>
  import type { DropdownOption, TreeOption, TreeProps } from 'naive-ui'
  import type { TreeRenderProps } from 'naive-ui/lib/tree/src/interface'
  import type { HTMLAttributes } from 'vue'
  import type { WTree } from './types'

  import { treeToArr } from 'easy-fns-ts'
  import { cloneDeep } from 'lodash-es'

  // TODO 99
  import WIcon from '@/components/UI/Icon'
  import WButton from '@/components/UI/Button'
  import WTransition from '@/components/Extra/Transition'

  import { usePropsAdvanced } from '@/hooks/core/usePropsAdvanced'
  import { useDropdown } from '@/components/UI/Dropdown'

  // TODO 888
  interface WTreeEmits extends WTree.Emit.Entry {}

  // TODO 888
  interface InternalProps {
    treeProps?: TreeProps
    value?: string | number | string[] | number[]
    multiple?: boolean
    toolbar?: boolean
    deletable?: boolean
    toolbarOptions?: DropdownOption[]
    presetPrefixIcon?: boolean
    presetContextMenu?: boolean
    maxHeight?: string
    auths?: {
      delete?: string
      update?: string
    }
    onTreeNodeItemDelete?: (deletedItem: any) => void
    onPaste?: (copyTarget: any, currentTarget: any) => void
  }

  const props = defineProps<InternalProps>()

  const emit = defineEmits<WTreeEmits>()

  const { t } = useAppI18n()

  const { hasPermission } = usePermissions()

  const state = ref<{
    selectedKeys: StringOrNumber[] | undefined
    checkedKeys: StringOrNumber[] | undefined
    indeterminateKeys: StringOrNumber[] | undefined
    expandedKeys: StringOrNumber[] | undefined
    pattern: string | undefined
    expandAll: boolean
    checkAll: boolean
    currentTarget: Recordable
    copyTarget: Recordable
  }>({
    selectedKeys: [],
    checkedKeys: [],
    // TODO indeterminateKeys hard to manage
    indeterminateKeys: undefined,
    expandedKeys: undefined,
    pattern: undefined,
    expandAll: false,
    checkAll: false,
    currentTarget: {},
    copyTarget: {},
  })

  const toolbarOptions = computed((): DropdownOption[] => [
    {
      type: 'group',
      label: 'Tree',
      key: 'treeAction',
      children: [
        {
          key: 'expand',
          label: t('app.button.expand'),
          icon: () => (
            <WIcon height="20" icon="mdi:arrow-expand-vertical"></WIcon>
          ),
          disabled: state.value.expandAll,
        },

        {
          key: 'collapse',
          label: t('app.button.collapse'),
          icon: () => (
            <WIcon height="20" icon="mdi:arrow-collapse-vertical"></WIcon>
          ),
          disabled: !state.value.expandAll,
        },
      ],
    },

    {
      type: 'group',
      label: 'Node',
      key: 'NodeAction',
      children: [
        {
          key: 'check',
          label: t('app.button.check'),
          icon: () => <WIcon height="20" icon="mdi:select-all"></WIcon>,
          disabled: state.value.checkAll || !getProps.value.multiple,
        },
        {
          key: 'inverse',
          label: t('app.button.inverse'),
          icon: () => <WIcon height="20" icon="mdi:select-inverse"></WIcon>,
          disabled: !state.value.checkAll || !getProps.value.multiple,
        },
      ],
    },

    {
      type: 'group',
      label: 'Cascade',
      key: 'CascadeAction',
      children: [
        {
          key: 'cascade',
          label: t('app.button.cascade'),
          icon: () => (
            <WIcon height="20" icon="carbon:checkbox-indeterminate"></WIcon>
          ),
          disabled:
            getProps.value.treeProps!.cascade || !getProps.value.multiple,
        },
        {
          key: 'independent',
          label: t('app.button.independent'),
          icon: () => (
            <WIcon height="20" icon="carbon:checkbox-checked"></WIcon>
          ),
          disabled:
            !getProps.value.treeProps!.cascade || !getProps.value.multiple,
        },
      ],
    },
  ])

  const contextMenuOptions = computed((): DropdownOption[] => [
    {
      key: 'copy',
      label: t('app.button.copy'),
      disabled: !!state.value.copyTarget[getKeyField.value],
      icon: () => <WIcon height="20" icon="mdi:content-copy"></WIcon>,
    },
    {
      key: 'paste',
      label: t('app.button.paste'),
      disabled: !state.value.copyTarget[getKeyField.value],
      icon: () => <WIcon height="20" icon="mdi:content-paste"></WIcon>,
    },
  ])

  const getKeyField = computed(() => getProps.value.treeProps!.keyField!)

  const getShowCopyMsg = computed(
    () => !getProps.value.multiple && state.value.copyTarget[getKeyField.value]
  )

  const [registerDropdown, { openDropdown, closeDropdown }] = useDropdown({
    dropdownProps: {
      options: contextMenuOptions,
      onSelect: (key) => {
        if (key === 'copy') {
          state.value.copyTarget = cloneDeep(toRaw(state.value.currentTarget))
        }

        if (key === 'paste') {
          getProps.value.onPaste!(
            toRaw(state.value.copyTarget),
            toRaw(state.value.currentTarget)
          )

          nextTick(() => {
            state.value.copyTarget = {}
          })
        }

        closeDropdown()
      },
    },
  })

  const { setProps, getProps } = usePropsAdvanced<WTree.Props>(props)

  const onSelectedKeys = (keys: StringOrNumber[]) => {
    if (!getProps.value.multiple) {
      emit('update:value', keys[0])
    }
  }

  const onCheckedKeys = (keys: StringOrNumber[]) => {
    if (getProps.value.multiple) {
      emit('update:value', keys)
    }
  }

  const onToolbarSelect = (key: string) => {
    if (key === 'expand') {
      state.value.expandedKeys = treeToArr(
        cloneDeep(getProps.value.treeProps!.data!)
      ).map((i) => i[getKeyField.value]) as string[]

      state.value.expandAll = true
    }

    if (key === 'collapse') {
      state.value.expandedKeys = []

      state.value.expandAll = false
    }

    if (key === 'check') {
      state.value.checkedKeys = treeToArr(
        cloneDeep(getProps.value.treeProps!.data!)
      ).map((i) => i[getKeyField.value]) as string[]

      state.value.checkAll = true

      onCheckedKeys(state.value.checkedKeys)
    }

    if (key === 'inverse') {
      state.value.checkedKeys = []

      state.value.checkAll = false

      onCheckedKeys(state.value.checkedKeys)
    }

    if (key === 'cascade') {
      // TODO after change, need to emit value as well
      setProps({ treeProps: { cascade: true } })
    }

    if (key === 'independent') {
      // TODO after change, need to emit value as well
      setProps({ treeProps: { cascade: false } })
    }
  }

  const nodeProps = ({ option }: { option: TreeOption }) => {
    return {
      onContextmenu: getProps.value.presetContextMenu
        ? (e: MouseEvent) => {
            emit('update:value', option[getKeyField.value] as string)

            state.value.currentTarget = option
            openDropdown(e)
            e.preventDefault()
          }
        : undefined,
    } as HTMLAttributes
  }

  const onRenderPrefix = ({ option }: TreeRenderProps) => {
    return (
      <WIcon icon={option.icon as string} height="18" class="mb-0.5"></WIcon>
    )
  }

  const onRenderSuffix = ({ option }: TreeRenderProps) => {
    return (
      <WTransition name="fade-right">
        {getProps.value.value === option[getKeyField.value] && (
          <div class="flex items-center">
            {getProps.value.treeProps!.draggable &&
              hasPermission(getProps.value.auths?.update) && (
                <WIcon
                  height="18"
                  class="cursor-move"
                  icon="ant-design:drag-outlined"
                ></WIcon>
              )}

            {getProps.value.deletable &&
              hasPermission(getProps.value.auths?.delete) && (
                <WButton
                  confirm
                  icon-button
                  icon="ant-design:delete-outlined"
                  text-prop={t('app.button.delete')}
                  onClick={() => {
                    getProps.value.onTreeNodeItemDelete!(toRaw(option))
                  }}
                  type="error"
                  height="18"
                ></WButton>
              )}
          </div>
        )}
      </WTransition>
    )
  }

  emit('hook', { setProps })

  defineExpose<WTree.Inst.WTreeInst>({
    setProps,
  })

  watchEffect(() => {
    if (getProps.value.multiple) {
      state.value.checkedKeys = getProps.value.value as StringOrNumber[]
    } else {
      state.value.selectedKeys = [getProps.value.value] as StringOrNumber[]
    }
  })
</script>

<script lang="tsx">
  export default defineComponent({
    name: 'WTree',
  })
</script>
