<template>
  <div>
    <n-space size="small">
      <n-button @click="onCheckAll">Check all/Uncheck</n-button>
      <n-button @click="onExpandAll">Expand/Collapse</n-button>
    </n-space>

    <n-tree
      cascade
      checkable
      block-line
      virtual-scroll
      :data="treeData"
      :render-label="onRenderLabel"
      key-field="_id"
      :expanded-keys="expandedKeys"
      :checked-keys="checkedKeys"
      @update:checked-keys="onUpdateCheckedKeys"
      @update:expanded-keys="onUpdateExpandedKeys"
      style="height: 400px"
    />
  </div>
</template>

<script lang="ts" setup>
  import { arrToTree, orderTree, formatTree } from 'easy-fns-ts'
  import { menuAPI } from '/@/api/system/menu'

  const props = defineProps({
    value: Array as PropType<string[]>,
  })

  const emit = defineEmits(['update:value'])

  const { t } = useAppI18n()

  const checkedAll = ref(false)

  const resData = ref<AppMenu[]>()
  const treeData = ref<TreeDataItem<AppMenu>[]>([])
  const expandedKeys = ref<string[]>()
  const checkedKeys = ref<string[]>()

  const onGetMenus = async () => {
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

    resData.value = res.data.filter((i) => i._id !== data[0]._id)
  }

  const onRenderLabel = ({ option }: { option: AppMenu }) => {
    return option.type === MenuTypeConst.ELEMENT
      ? option.permission
      : t(option.title!)
  }

  const onCheckAll = () => {
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
    } else {
      expandedKeys.value = resData.value?.map((i) => i._id!)
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

  onMounted(() => {
    onGetMenus()
  })
</script>
