<script lang="ts" setup>
import type { AppSystemDictDataPicked } from '@/api/system/dict'
import type { WFormItemDictProps } from './types'

defineOptions({
  name: 'WFormItemExtendDict',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<WFormItemDictProps>(), {
  dictRenderType: 'select',
})

const emits = defineEmits(['update:value'])

const { t } = useAppI18n()

const dictValue = ref()
const options = ref<AppSystemDictDataPicked>([])
const getTOptions = computed(() =>
  options.value.map(i => ({
    label: t(i.label!),
    value: i.value,
  })),
)

function onUpdateValue(v: any) {
  emits('update:value', v)
}

async function onInit() {
  const res = await useDict(props.dictType)
  options.value = res!.dictData

  dictValue.value = props.value
}

onMounted(onInit)
</script>

<template>
  <WSelect
    v-if="dictRenderType === 'select'"
    v-model:value="dictValue"
    :options="getTOptions"
    v-bind="renderComponentProps"
    @update:value="onUpdateValue"
  />

  <w-checkbox
    v-if="dictRenderType === 'checkbox'"
    v-model:value="dictValue"
    :options="getTOptions"
    v-bind="renderComponentProps"
    multiple
    @update:value="onUpdateValue"
  />

  <w-radio
    v-if="dictRenderType === 'radio'"
    v-model:value="dictValue"
    :options="getTOptions"
    v-bind="renderComponentProps"
    @update:value="onUpdateValue"
  />
</template>
