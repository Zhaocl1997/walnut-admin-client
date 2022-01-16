<template>
  <n-tree
    :cascade="checkable"
    :checkable="checkable"
    :disabled="disabled"
    block-line
    virtual-scroll
    :data="treeData"
    :render-label="onRenderLabel"
    :render-prefix="onRenderPrefix"
    key-field="_id"
    :expanded-keys="expandedKeys"
    :checked-keys="checkedKeys"
    :selected-keys="checkable ? [] : [value]"
    @update:checked-keys="onUpdateCheckedKeys"
    @update:expanded-keys="onUpdateExpandedKeys"
    @update:selected-keys="onUpdateSelectedKeys"
    style="height: 400px"
  />
</template>

<script lang="tsx" setup>
  import { arrToTree, orderTree, formatTree } from 'easy-fns-ts'
  import { menuAPI } from '/@/api/system/menu'

  const props = defineProps({
    value: [String, Array] as PropType<string | string[]>,
    checkable: Boolean as PropType<boolean>,
    disabled: Boolean as PropType<boolean>,
  })

  const emit = defineEmits(['update:value'])

  const { t } = useAppI18n()

  const checkedAll = ref(false)
  const expandAll = ref(false)

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
          node.children.length === 0
            ? {
                ...node,
                children: null,
              }
            : node,
      }
    )

    treeData.value = data[0].children
    rootId.value = data[0]._id

    resData.value = res.data.filter((i) => i._id !== data[0]._id)
  }

  const onRenderLabel = ({ option }: { option: AppMenu }) =>
    option.type === MenuTypeConst.ELEMENT ? option.permission : t(option.title!)

  const onRenderPrefix = ({ option }: { option: AppMenu }) => (
    <w-icon icon={option.icon} height="18"></w-icon>
  )

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

  const onExpandAll = () => {
    if (expandedKeys.value?.length) {
      expandedKeys.value = []
      expandAll.value = false
    } else {
      expandedKeys.value = resData.value?.map((i) => i._id!)
      expandAll.value = true
    }
  }

  const onUpdateCheckedKeys = (keys: string[]) => {
    checkedKeys.value = []
    checkedKeys.value = keys
    emit('update:value', checkedKeys.value)
  }

  const onUpdateExpandedKeys = (keys: string[]) => {
    expandedKeys.value = keys
  }

  const onUpdateSelectedKeys = (keys: string[]) => {
    if (props.checkable || !keys) return
    emit('update:value', keys[0])
  }

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
