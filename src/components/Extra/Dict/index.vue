<script lang="ts" setup>
import type { IDictProps } from '.'
import type { AppDictTypeCommon } from '@/api/system/dict'

defineOptions({
  name: 'WFormItemExtendDict',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<IDictProps>(), {
  dictRenderType: 'select',
})

const emits = defineEmits(['update:value'])

const { t } = useAppI18n()

const dictValue = ref()
const options = ref<AppDictTypeCommon[]>([])
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
  options.value = res!

  dictValue.value = props.value
}

onBeforeMount(onInit)
</script>

<template>
  <WSelect
    v-if="dictRenderType === 'select'" v-model:value="dictValue" :options="getTOptions"
    v-bind="renderComponentProps" @update:value="onUpdateValue"
  />

  <WCheckbox
    v-if="dictRenderType === 'checkbox'" v-model:value="dictValue" :options="getTOptions"
    v-bind="renderComponentProps" multiple @update:value="onUpdateValue"
  />

  <WRadio
    v-if="dictRenderType === 'radio'" v-model:value="dictValue" :options="getTOptions"
    v-bind="renderComponentProps" @update:value="onUpdateValue"
  />
</template>
