<script lang="ts" setup>
import type { CascaderOption } from 'naive-ui'
import type { ICompBusinessAreaCascaderProps } from '.'
import {
  getAreaChildrenByPcode,
  getAreaFeedbackByCode,
} from '@/api/shared/area'

defineOptions({
  name: 'WAreaCascader',
  inheritAttrs: false,
})

const { value = null, depth = 4, showPath = true, multiple = false } = defineProps<ICompBusinessAreaCascaderProps>()

const emits = defineEmits<{ (e: 'update:value', value: string): void }>()

const options = ref<TreeNodeItem<AppSharedArea>[]>([])

async function onLoad(option: CascaderOption) {
  const res = await getAreaChildrenByPcode(option.code as string)
  option.children = res.map(i => ({
    ...i,
    depth: (option.depth as number) + 1,
    isLeaf: (option.depth as number) + 1 === depth,
  }))
}

async function onInit() {
  const res = await getAreaChildrenByPcode()
  options.value = res.map(i => ({
    ...i,
    isLeaf: depth === 0,
    depth: 0,
  }))
}

function onUpdateValue(value: string) {
  emits('update:value', value)
}

async function onFeedback() {
  if (!value || value.length === 0)
    return

  // single feedback
  if (!multiple && typeof value === 'string') {
    const feedback = await getAreaFeedbackByCode(value)

    options.value = feedback
  }

  // multiple feedback
  if (
    multiple
    && Array.isArray(value)
  ) {
    const feedbacks = await getAreaFeedbackByCode(value.join(','))

    options.value = feedbacks
  }
}

onBeforeMount(async () => {
  await onInit()
  await onFeedback()
})
</script>

<template>
  <n-cascader
    :value="value"
    :options="options"
    :show-path="showPath"
    :multiple="multiple"
    clearable
    label-field="name"
    value-field="code"
    remote
    max-tag-count="responsive"
    check-strategy="child"
    :on-load="onLoad"
    @update-value="onUpdateValue"
  />
</template>
