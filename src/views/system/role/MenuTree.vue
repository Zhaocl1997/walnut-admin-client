<template>
  <div>
    <n-tree
      :cascade="checkable"
      :checkable="checkable"
      :disabled="disabled"
      block-line
      draggable
      virtual-scroll
      :data="treeData"
      :render-label="onRenderLabel"
      :render-prefix="onRenderPrefix"
      key-field="_id"
      :expanded-keys="expandedKeys"
      :checked-keys="checkedKeys"
      :selected-keys="checkable ? [] : [value]"
      :node-props="nodeProps"
      @update:checked-keys="onUpdateCheckedKeys"
      @update:expanded-keys="onUpdateExpandedKeys"
      @update:selected-keys="onUpdateSelectedKeys"
      @drop="onDrop"
      style="max-height: 600px"
    ></n-tree>

    <n-dropdown
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
  import { arrToTree, orderTree, formatTree } from 'easy-fns-ts'
  import { menuAPI } from '/@/api/system/menu'

  // TODO 99
  import WIcon from '/@/components/UI/Icon'

  const props = defineProps({
    value: [String, Array] as PropType<Key | Key[]>,
    checkable: Boolean as PropType<boolean>,
    disabled: Boolean as PropType<boolean>,
  })

  const emit = defineEmits(['update:value'])

  const { t } = useAppI18n()

  const checkedAll = ref(false)
  const expandAll = ref(false)

  const showDropdown = ref(false)
  const x = ref(0)
  const y = ref(0)
  const dropdownOptions = ref<DropdownOption[]>([
    {
      key: 'delete',
      label: 'Delete',
    },
    {
      key: 'copy',
      label: 'Copy',
    },
  ])
  const currentCtxNode = ref<AppMenu>({})

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
      orderTree<AppMenu>(arrToTree<AppMenu>(res.data, { id: '_id' })),
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
    }
  }

  // dropdown select
  const onDropdownSelect = async (key: string) => {
    if (key === 'delete') {
      await menuAPI.delete(currentCtxNode.value._id!)

      await onInit()
    }

    if (key === 'copy') {
      console.log('copy node', currentCtxNode.value)
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
