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
          <w-icon
            height="20"
            icon="ant-design:more-outlined"
            class="cursor-pointer"
          ></w-icon>
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
        {{ t('comp:tree:copy:msg') }}
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
          getProps.treeProps.draggable || getProps.deletable
            ? onRenderSuffix
            : undefined
        "
      ></n-tree>
    </w-scrollbar>

    <w-dropdown @hook="registerDropdown"></w-dropdown>
  </div>
</template>

<script lang="tsx" setup>
  import type { DropdownOption, TreeOption } from 'naive-ui'
  import type { HTMLAttributes } from 'vue'
  import type { WTree } from './types'

  import { treeToArr } from 'easy-fns-ts'
  import { cloneDeep } from 'lodash-es'

  import { useProps } from '/@/hooks/core/useProps'
  import { useDropdown } from '/@/components/UI/Dropdown'

  // avoid error
  interface WTreeProps extends WTree.Props {}
  interface WTreeEmits extends WTree.Emit.Entry {}

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
          label: t('app:button:expand'),
          icon: () => (
            <w-icon height="20" icon="mdi:arrow-expand-vertical"></w-icon>
          ),
          disabled: state.value.expandAll,
        },

        {
          key: 'collapse',
          label: t('app:button:collapse'),
          icon: () => (
            <w-icon height="20" icon="mdi:arrow-collapse-vertical"></w-icon>
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
          label: t('app:button:check'),
          icon: () => <w-icon height="20" icon="mdi:select-all"></w-icon>,
          disabled: state.value.checkAll || !getProps.value.multiple,
        },
        {
          key: 'inverse',
          label: t('app:button:inverse'),
          icon: () => <w-icon height="20" icon="mdi:select-inverse"></w-icon>,
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
          label: t('app:button:cascade'),
          icon: () => (
            <w-icon height="20" icon="carbon:checkbox-indeterminate"></w-icon>
          ),
          disabled: getProps.value.treeProps.cascade,
        },
        {
          key: 'independent',
          label: t('app:button:independent'),
          icon: () => (
            <w-icon height="20" icon="carbon:checkbox-checked"></w-icon>
          ),
          disabled: !getProps.value.treeProps.cascade,
        },
      ],
    },
  ])

  const contextMenuOptions = computed((): DropdownOption[] => [
    {
      key: 'copy',
      label: t('app:button:copy'),
      disabled: !!state.value.copyTarget[getKeyField.value],
      icon: () => <w-icon height="20" icon="mdi:content-copy"></w-icon>,
    },
    {
      key: 'paste',
      label: t('app:button:paste'),
      disabled: !state.value.copyTarget[getKeyField.value],
      icon: () => <w-icon height="20" icon="mdi:content-paste"></w-icon>,
    },
  ])

  const getKeyField = computed(() => getProps.value.treeProps.keyField!)

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

  const attrs = useAttrs()

  // props is actually empty, since we use ts to declare props
  const props = defineProps<WTreeProps>()

  const emit = defineEmits<WTreeEmits>()

  const { setProps, getProps } = useProps<WTree.Props>(
    attrs as unknown as WTree.Props
  )

  const onSelectedKeys = (keys: StringOrNumber[]) => {
    emit('update:value', keys[0])
  }

  const onCheckedKeys = (keys: StringOrNumber[]) => {
    emit('update:value', keys)
  }

  const onToolbarSelect = (key: string) => {
    if (key === 'expand') {
      state.value.expandedKeys = treeToArr(
        cloneDeep(getProps.value.treeProps.data!)
      ).map((i) => i[getKeyField.value]) as string[]

      state.value.expandAll = true
    }

    if (key === 'collapse') {
      state.value.expandedKeys = []

      state.value.expandAll = false
    }

    if (key === 'check') {
      state.value.checkedKeys = treeToArr(
        cloneDeep(getProps.value.treeProps.data!)
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
      setProps({ treeProps: { cascade: true } })
      console.log(getProps.value)
    }

    if (key === 'independent') {
      setProps({ treeProps: { cascade: false } })
    }
  }

  const nodeProps = ({ option }: { option: TreeOption }) => {
    return {
      onContextmenu: getProps.value.presetContextMenu
        ? (e: MouseEvent) => {
            state.value.currentTarget = option
            openDropdown(e)
            e.preventDefault()
          }
        : undefined,
      onmouseenter() {
        option.hover = true
      },
      onmouseleave() {
        option.hover = false
      },
    } as HTMLAttributes
  }

  const onRenderPrefix = ({ option }: { option: TreeOption }) => {
    return <w-icon icon={option.icon} height="18" class="mb-0.5"></w-icon>
  }

  const onRenderSuffix = ({ option }: { option: TreeOption }) => {
    return (
      <w-transition name="fade-right">
        <div v-show={option.hover} class="flex items-center">
          {getProps.value.treeProps.draggable &&
            hasPermission(getProps.value.auths?.update) && (
              <w-icon
                height="18"
                class="cursor-move"
                icon="ant-design:drag-outlined"
              ></w-icon>
            )}

          {getProps.value.deletable &&
            hasPermission(getProps.value.auths?.delete) && (
              <w-button
                confirm
                icon-button
                icon="ant-design:delete-outlined"
                text-prop={t('app:button:delete')}
                onClick={() => {
                  getProps.value.onDelete!(toRaw(option))
                }}
                type="error"
                height="18"
              ></w-button>
            )}
        </div>
      </w-transition>
    )
  }

  emit('hook', { setProps })

  defineExpose<WTree.Inst.WTreeInst>({
    setProps,
  })

  watchEffect(() => {
    if (getProps.value.multiple) {
      state.value.checkedKeys = attrs.value as StringOrNumber[]
    } else {
      state.value.selectedKeys = [attrs.value] as StringOrNumber[]
    }
  })
</script>

<script lang="tsx">
  export default defineComponent({
    name: 'WTree',
  })
</script>
