<script lang="ts" setup>
import type { TreeSelectInst } from 'naive-ui'
import type { ICompUITreeSelectProps } from '.'
import { findPath } from 'easy-fns-ts'

defineOptions({
  name: 'Name',
})

const { treeSelectProps, multiple = false } = defineProps<ICompUITreeSelectProps>()

type TreeKey = StringOrNumber

const value = defineModel<TreeKey | TreeKey[]>('value', { required: true })

const internalValue = ref<TreeKey | TreeKey[]>()

const nTreeSelctRef = templateRef<TreeSelectInst>('nTreeSelctRef')

const expandedKeys = ref<TreeKey[]>()
const indeterminateKeys = ref<TreeKey[]>()

async function onUpdateValue(keys: TreeKey | TreeKey[]) {
  if (multiple && Array.isArray(keys)) {
    await nextTick()

    internalValue.value = keys
    value.value = keys.concat(indeterminateKeys.value)
  }
  else {
    internalValue.value = keys
    value.value = keys
  }
}

async function onFeedback() {
  try {
    if (multiple) {
      if (!Array.isArray(value.value) || !value.value.length)
        return

      // internal value
      internalValue.value = value.value

      await nextTick()
      const data = nTreeSelctRef.value.getCheckedData()
      const leafNodeKeyList = data.options.filter(i => !i.children || i.children.length === 0).map(i => i[treeSelectProps.keyField])
      const intersection = Array.from(new Set(leafNodeKeyList).intersection(new Set(internalValue.value)))
      internalValue.value = intersection

      // expanded keys
      const allNodes = new Set<TreeKey>([...internalValue.value.map(i => findPath(treeSelectProps?.options, n => n[treeSelectProps.keyField] === i) ?? []).flat().map(i => i[treeSelectProps.keyField] as TreeKey)])
      expandedKeys.value = Array.from(allNodes)
    }
    else {
      if (!value.value)
        return

      // internal value
      internalValue.value = value.value

      // expanded keys
      const targetNodeSingleTree = findPath(treeSelectProps?.options, n => n[treeSelectProps.keyField] === internalValue.value) as [] ?? []
      expandedKeys.value = targetNodeSingleTree.map(i => i[treeSelectProps.keyField])
    }
  }
  catch (error) {
    console.log(error)
  }
}

watch(
  () => value.value,
  async () => {
    await nextTick()
    await onFeedback()
  },
)

onMounted(onFeedback)

defineExpose({})
</script>

<template>
  <n-tree-select
    ref="nTreeSelctRef"
    v-model:expanded-keys="expandedKeys"
    v-model:indeterminate-keys="indeterminateKeys"
    :value="internalValue"
    v-bind="treeSelectProps"
    :multiple="multiple"
    :cascade="multiple"
    :checkable="multiple"
    @update:value="onUpdateValue"
  />
</template>
