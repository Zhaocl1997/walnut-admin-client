<script lang="ts" setup>
import type { CascaderOption } from 'naive-ui'
import {
  getAreaChildrenByPcode,
  getAreaFeedbackByCode,
  getAreaFeedbackByCodes,
} from '@/api/shared/area'

// TODO 888
interface InternalProps {
  value?: string | null | string[]
  depth?: number
  showPath?: boolean
  multiple?: boolean
}

const props = withDefaults(defineProps<InternalProps>(), {
  value: null,
  depth: 4,
  showPath: true,
  multiple: false,
})
const emits = defineEmits<{ (e: 'update:value', value: string): void }>()

const options = ref<TreeNodeItem<AppSharedArea>[]>([])

async function onLoad(option: CascaderOption) {
  const res = await getAreaChildrenByPcode(option.code as string)
  option.children = res.map(i => ({
    ...i,
    depth: (option.depth as number) + 1,
    isLeaf: (option.depth as number) + 1 === props.depth,
  }))
}

async function onInit() {
  const res = await getAreaChildrenByPcode()
  options.value = res.map(i => ({
    ...i,
    isLeaf: props.depth === 0,
    depth: 0,
  }))
}

function onUpdateValue(value: string) {
  emits('update:value', value)
}

async function onFeedback() {
  if (!props.value || props.value.length === 0)
    return

  // single feedback
  if (!props.multiple && typeof props.value === 'string') {
    if (props.value.length === 2)
      return

    const feedback = await getAreaFeedbackByCode(props.value)

    const index = options.value.findIndex(i => i.code === feedback[0].pcode)

    if (!options.value[index]?.children)
      options.value[index].children = feedback
  }

  // multiple feedback
  if (
    props.multiple
    && Array.isArray(props.value)
  ) {
    if (props.value[0].length === 2)
      return

    const feedbacks = await getAreaFeedbackByCodes(props.value.join(','))

    feedbacks.forEach((item) => {
      const index = options.value.findIndex(i => i.code === item[0].pcode)

      if (!options.value[index]?.children)
        options.value[index].children = item as TreeNodeItem<AppSharedArea>[]
    })
  }
}

onMounted(async () => {
  await onInit()
  await onFeedback()
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'WAreaCascader',

  inheritAttrs: false,
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
