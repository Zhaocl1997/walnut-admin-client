<script lang="tsx" setup>
import type { DropdownOption, TreeInst, TreeOption } from 'naive-ui'
import type { TreeRenderProps } from 'naive-ui/lib/tree/src/interface'

import { formatTree, treeToArr } from 'easy-fns-ts'
import { cloneDeep } from 'lodash-es'
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'
import type { TreeNodeProps } from 'naive-ui/es/tree/src/interface'
import type { ICompUITreeInst, ICompUITreeProps } from './types'

import { useDropdown } from '@/components/UI/Dropdown'

defineOptions({
  name: 'WTree',
  inheritAttrs: false,
})

const props = defineProps<ICompUITreeProps>()

const emits = defineEmits<{ hook: [inst: ICompUITreeInst] }>()

type TreeKey = StringOrNumber

const value = defineModel<TreeKey | TreeKey[]>('value', { required: true })

const { t } = useAppI18n()

const { setProps, getProps } = usePropsAdvanced<ICompUITreeProps>(props)

const userPermission = useAppStoreUserPermission()

const nTreeRef = shallowRef<TreeInst>()
const selectedKeys = ref<TreeKey[]>([])
const checkedKeys = ref<TreeKey[]>([])
const indeterminateKeys = ref<TreeKey[]>([])
const expandedKeys = ref<TreeKey[]>()
const pattern = ref<string>()
const expandAll = ref<boolean>(false)
const checkAll = ref<boolean>(false)
const cascade = ref<boolean>(true)
const copyTarget = ref<RowData>({})
const currentTarget = ref<RowData>({})

const getToolBarOptions = computed((): DropdownOption[] => [
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
        disabled: expandAll.value,
      },

      {
        key: 'collapse',
        label: t('app.button.collapse'),
        icon: () => (
          <WIcon height="20" icon="mdi:arrow-collapse-vertical"></WIcon>
        ),
        disabled: !expandAll.value,
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
        disabled: checkAll.value || !getProps.value.multiple,
      },
      {
        key: 'inverse',
        label: t('app.button.inverse'),
        icon: () => <WIcon height="20" icon="mdi:select-inverse"></WIcon>,
        disabled: !checkAll.value || !getProps.value.multiple,
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
          !getProps.value.multiple || cascade.value,
      },
      {
        key: 'independent',
        label: t('app.button.independent'),
        icon: () => (
          <WIcon height="20" icon="carbon:checkbox-checked"></WIcon>
        ),
        disabled:
          !getProps.value.multiple || !cascade.value,
      },
    ],
  },
])

const getKeyField = computed(() => getProps.value.treeProps!.keyField!)

const contextMenuOptions = computed<DropdownMixedOption[]>(() => [
  {
    key: 'copy',
    label: t('app.button.copy'),
    disabled: !!copyTarget.value[getKeyField.value],
    icon: () => <WIcon height="20" icon="mdi:content-copy"></WIcon>,
  },
  {
    key: 'paste',
    label: t('app.button.paste'),
    disabled: !copyTarget.value[getKeyField.value],
    icon: () => <WIcon height="20" icon="mdi:content-paste"></WIcon>,
  },
])

const [registerDropdown, { openDropdown, closeDropdown }] = useDropdown({
  dropdownProps: {
    options: contextMenuOptions,
    onSelect: (key) => {
      if (key === 'copy')
        copyTarget.value = cloneDeep(toRaw(currentTarget.value))

      if (key === 'paste') {
        getProps.value.onPaste!(
          toRaw(copyTarget.value),
          toRaw(currentTarget.value),
        )

        nextTick(() => {
          copyTarget.value = {}
        })
      }

      closeDropdown()
    },
  },
})

const getCombinedKeys = computed(() => checkedKeys.value.concat(indeterminateKeys.value))

function onSelectedKeys(keys: TreeKey[]) {
  selectedKeys.value = keys
  if (!getProps.value.multiple)
    value.value = keys[0]
}

function onCheckedKeys(keys: TreeKey[]) {
  checkedKeys.value = keys
  if (getProps.value.multiple)
    value.value = getCombinedKeys.value
}

function onUpdateIndeterminateKeys(keys: TreeKey[]) {
  indeterminateKeys.value = keys
  if (getProps.value.multiple)
    value.value = getCombinedKeys.value
}

function onToolbarSelect(key: string) {
  if (key === 'expand') {
    expandedKeys.value = treeToArr(
      cloneDeep(getProps.value.treeProps!.data!),
    ).map(i => i[getKeyField.value]) as string[]

    expandAll.value = true
  }

  if (key === 'collapse') {
    expandedKeys.value = []

    expandAll.value = false
  }

  if (key === 'check') {
    checkedKeys.value = treeToArr(
      cloneDeep(getProps.value.treeProps!.data!),
    ).map(i => i[getKeyField.value]) as string[]

    checkAll.value = true

    onCheckedKeys(checkedKeys.value)
  }

  if (key === 'inverse') {
    checkedKeys.value = []

    checkAll.value = false

    onCheckedKeys(checkedKeys.value)
  }

  if (key === 'cascade') {
    checkedKeys.value = []
    indeterminateKeys.value = []

    cascade.value = true

    onFeedback()

    onCheckedKeys(checkedKeys.value)
  }

  if (key === 'independent') {
    checkedKeys.value = []
    indeterminateKeys.value = []

    cascade.value = false

    onFeedback()

    onCheckedKeys(checkedKeys.value)
  }
}

function nodeProps({ option }: { option: TreeOption }): ReturnType<TreeNodeProps> {
  return {
    onContextmenu: getProps.value.presetContextMenu
      ? (e: MouseEvent) => {
          e.preventDefault()

          if (!getProps.value.multiple)
            value.value = option[getKeyField.value] as TreeKey

          currentTarget.value = option
          openDropdown(e)
        }
      : undefined,
  }
}

function onRenderPrefix({ option }: TreeRenderProps) {
  return getProps.value.presetPrefixIcon
    ? (
        <WIcon icon={option.icon as string} height="18"></WIcon>
      )
    : undefined
}

function onRenderSuffix({ option }: TreeRenderProps) {
  return (getProps.value.treeProps?.draggable || getProps.value.deletable)
    ? (
        <WTransition name="fade-right">
          {selectedKeys.value[0] === option[getKeyField.value] && (
            <div
              class="flex flex-row flex-nowrap items-center justify-center"
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              {getProps.value.treeProps!.draggable
              && userPermission.hasPermission(getProps.value.auths?.update) && (
                <WIcon
                  height="18"
                  class="cursor-move"
                  icon="ant-design:drag-outlined"
                >
                </WIcon>
              )}

              {getProps.value.deletable
              && userPermission.hasPermission(getProps.value.auths?.delete) && (
                <WIconButton
                  icon-props={{
                    icon: 'ant-design:delete-outlined',
                  }}
                  button-props={{
                    type: 'error',
                  }}
                  tooltip
                  tooltipMsg={t('app.button.delete')}
                  confirm
                  onConfirm={() => {
                    getProps.value.onTreeNodeItemDelete!(toRaw(option))
                  }}
                >
                </WIconButton>
              )}
            </div>
          )}
        </WTransition>
      )
    : undefined
}

const getBottomChildKeys = computed(() => {
  const res: TreeKey[] = []

  formatTree(getProps.value.treeProps!.data!, {
    format: (node) => {
      if (!node[getProps.value.treeProps?.childrenField || 'children'])
        res.push(node[getKeyField.value] as string)
    },
  })

  return res
})

function onFeedback() {
  if (getProps.value.multiple) {
    if (cascade.value) {
      checkedKeys.value = (value.value as TreeKey[])?.filter(i => getBottomChildKeys.value.includes(i))
      indeterminateKeys.value = (value.value as TreeKey[])?.filter(i => !getBottomChildKeys.value.includes(i))

      nextTick(() => {
        if (nTreeRef.value) {
          checkedKeys.value = nTreeRef.value.getCheckedData().keys!
          indeterminateKeys.value = nTreeRef.value.getIndeterminateData().keys!
        }
      })
    }
    else {
      checkedKeys.value = value.value as TreeKey[]
    }
  }
  else { selectedKeys.value = [value.value] as TreeKey[] }
}

onMounted(onFeedback)

emits('hook', { setProps })

defineExpose({
  setProps,
})
</script>

<template>
  <div class="w-full">
    <n-input
      v-if="getProps.toolbar"
      v-model:value="pattern"
      style="width: 90% !important"
      class="mb-2 ml-4"
      clearable
      round
      size="small"
      :disabled="getProps.treeProps?.disabled"
    >
      <template #suffix>
        <n-dropdown
          trigger="hover"
          :options="getToolBarOptions"
          show-arrow size="small"
          :disabled="getProps.treeProps?.disabled"
          @select="onToolbarSelect"
        >
          <WIcon height="20" icon="ant-design:more-outlined" class="cursor-pointer" />
        </n-dropdown>
      </template>
    </n-input>

    <WScrollbar :height="getProps.maxHeight ?? 'auto'">
      <n-tree
        ref="nTreeRef"
        :style="{ height: getProps.maxHeight }"
        v-bind="getProps.treeProps"
        :cascade="cascade"
        :selected-keys="selectedKeys"
        :checked-keys="checkedKeys"
        :expanded-keys="expandedKeys"
        :indeterminate-keys="indeterminateKeys"
        :checkable="getProps.multiple"
        :pattern="pattern"
        :node-props="nodeProps"
        :render-prefix="onRenderPrefix"
        :render-suffix="onRenderSuffix"
        @update:selected-keys="onSelectedKeys"
        @update:checked-keys="onCheckedKeys"
        @update:indeterminate-keys="onUpdateIndeterminateKeys"
      />
    </WScrollbar>

    <WDropdown @hook="registerDropdown" />
  </div>
</template>
