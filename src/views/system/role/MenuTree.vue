<template>
  <div class="w-full">
    <n-space vertical>
      <n-alert v-if="!checkable" type="info" closable>
        Drag node to change order or change parent node
      </n-alert>

      <n-alert v-if="!checkable" type="info" closable>
        Right click node to delete
      </n-alert>

      <n-alert v-show="!checkable && copyTarget._id" type="warning" closable>
        Right click a node to paste copied node
      </n-alert>

      <n-tree
        :checkable="checkable"
        :disabled="disabled"
        block-line
        :draggable="!checkable"
        virtual-scroll
        :data="treeData"
        :render-label="onRenderLabel"
        :render-prefix="onRenderPrefix"
        :render-suffix="onRenderSuffix"
        key-field="_id"
        :expanded-keys="expandedKeys"
        :checked-keys="checkedKeys"
        :selected-keys="checkable ? [] : [value]"
        :node-props="nodeProps"
        @update:checked-keys="onUpdateCheckedKeys"
        @update:expanded-keys="onUpdateExpandedKeys"
        @update:selected-keys="onUpdateSelectedKeys"
        @drop="onDrop"
        style="max-height: 500px"
      ></n-tree>
    </n-space>

    <n-dropdown
      v-if="!checkable"
      trigger="manual"
      placement="bottom-start"
      :show="showDropdown"
      :options="dropdownOptions"
      :x="x"
      :y="y"
      @select="onDropdownSelect"
      @clickoutside="showDropdown = false"
    ></n-dropdown>
  </div>
</template>

<script lang="tsx">
  export default defineComponent({
    name: 'MenuTree',

    defaultView: false,
  })
</script>

<script lang="tsx" setup>
  import type { DropdownOption, TreeDropInfo, TreeOption } from 'naive-ui'
  import type { Key } from 'naive-ui/lib/tree/src/interface'
  import { arrToTree, orderTree, formatTree, easyOmit } from 'easy-fns-ts'
  import { menuAPI } from '/@/api/system/menu'

  // TODO 99
  import WIcon from '/@/components/UI/Icon'
  import WButton from '/@/components/UI/Button'
  import WTransition from '/@/components/Extra/Transition'

  const props = defineProps({
    value: [String, Array] as PropType<Key | Key[]>,
    checkable: Boolean as PropType<boolean>,
    disabled: Boolean as PropType<boolean>,
    setFormData: Function as PropType<(data: AppMenu) => void>,
  })

  const emit = defineEmits(['update:value'])

  const { t } = useAppI18n()

  const checkedAll = ref(false)
  const expandAll = ref(false)

  const showDropdown = ref(false)
  const currentCtxNode = ref<AppMenu>({})
  const copyTarget = ref<AppMenu>({})

  const x = ref(0)
  const y = ref(0)

  const dropdownOptions = computed((): DropdownOption[] => [
    {
      key: 'delete',
      label: 'Delete',
    },
    {
      key: 'copy',
      label: 'Copy',
    },
    {
      key: 'paste',
      label: 'Paste',
      disabled: !copyTarget.value._id,
    },
  ])

  const rootId = ref<string>()
  const resData = ref<AppMenu[]>()
  const treeData = ref<TreeDataItem<AppMenu>[]>([])
  const expandedKeys = ref<string[]>()
  const checkedKeys = ref<string[]>()

  watchEffect(() => {
    if (props.checkable) {
      checkedKeys.value = props.value as string[]
    }
  })

  const onInit = async () => {
    const res = await menuAPI.list()

    // build, order and format
    const data = formatTree<AppMenu>(
      orderTree<AppMenu>(
        arrToTree<AppMenu>(
          res.data.map((i) => ({ ...i, hover: false })),
          { id: '_id' }
        )
      ),
      {
        format: (node) =>
          node.children!.length === 0
            ? {
                ...node,
                children: null,
              }
            : node,
      }
    )

    treeData.value = data[0].children!
    rootId.value = data[0]._id

    resData.value = res.data.filter((i) => i._id !== data[0]._id)
  }

  // custom tree label render
  const onRenderLabel = ({ option }: { option: TreeOption }) =>
    option.type === MenuTypeConst.ELEMENT
      ? (option.permission as string)
      : t(option.title as string)

  // custom tree node prefix
  const onRenderPrefix = ({ option }: { option: TreeOption }) => (
    <WIcon icon={option.icon} height="18"></WIcon>
  )

  const onRenderSuffix = ({ option }: { option: TreeOption }) => {
    return (
      <WTransition name="fade-right">
        <div key="delete" v-show={option.hover} class="flex items-center">
          <WIcon
            height="18"
            class="cursor-move"
            icon="ant-design:drag-outlined"
          ></WIcon>

          <WButton
            confirm
            icon-button
            icon="ant-design:delete-outlined"
            text-prop={t('app:button:delete')}
            onClick={(e: MouseEvent) => {
              console.log('delete')
            }}
            type="error"
            height="18"
          ></WButton>
        </div>
      </WTransition>
    )
  }

  // check all node when multiple
  const onCheckAll = () => {
    if (!props.checkable) return

    if (!checkedAll.value) {
      checkedKeys.value = resData.value?.map((i) => i._id!)
      checkedAll.value = true
    } else {
      checkedKeys.value = []
      checkedAll.value = false
    }

    emit('update:value', checkedKeys.value)
  }

  // expand all node
  const onExpandAll = () => {
    if (expandedKeys.value?.length) {
      expandedKeys.value = []
      expandAll.value = false
    } else {
      expandedKeys.value = resData.value?.map((i) => i._id!)
      expandAll.value = true
    }
  }

  // drag menu to change parent node
  const onDrop = async ({ node, dragNode }: TreeDropInfo) => {
    const newNode = Object.assign(dragNode, { pid: node._id })

    await menuAPI.update(newNode as AppMenu)

    await onInit()
  }

  // checked keys update
  const onUpdateCheckedKeys = (keys: string[]) => {
    checkedKeys.value = []
    checkedKeys.value = keys
    emit('update:value', checkedKeys.value)
  }

  // expanded keys update
  const onUpdateExpandedKeys = (keys: string[]) => {
    expandedKeys.value = keys
  }

  // selected keys update
  const onUpdateSelectedKeys = (keys: string[]) => {
    if (props.checkable || !keys) return
    emit('update:value', keys[0])
  }

  // tree node context menu
  const nodeProps = ({ option }: { option: TreeOption }) => {
    return {
      onContextmenu(e: MouseEvent) {
        currentCtxNode.value = option as AppMenu
        showDropdown.value = true
        x.value = e.clientX
        y.value = e.clientY
        e.preventDefault()
      },
      onmouseenter() {
        option.hover = true
      },
      onmouseleave() {
        option.hover = false
      },
    }
  }

  // dropdown select
  const onDropdownSelect = async (key: string) => {
    if (key === 'delete') {
      await menuAPI.delete(currentCtxNode.value._id!)

      await onInit()
    }

    if (key === 'copy') {
      copyTarget.value = currentCtxNode.value
    }

    if (key === 'paste') {
      console.log(currentCtxNode.value, 321)

      console.log(copyTarget.value, 123)

      console.log(props.setFormData)

      props.setFormData!({
        ...easyOmit(copyTarget.value, ['_id', 'createdAt', 'updatedAt']),
        pid: currentCtxNode.value._id,
      })

      nextTick(() => {
        copyTarget.value = {}
      })
    }

    showDropdown.value = false
  }

  // expose
  defineExpose({
    onCheckAll,
    onExpandAll,
    onGetExpandStatus: () => expandAll.value,
    onGetTreeData: () => treeData.value,
    onGetRootId: () => rootId.value,
    onRefresh: () => onInit(),
  })

  onMounted(() => {
    onInit()
  })
</script>
