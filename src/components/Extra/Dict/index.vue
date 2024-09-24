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

const dictValue = defineModel<BaseDataType | BaseDataType[]>('value', { required: true })

const { t } = useAppI18n()

const options = ref<AppDictTypeCommon[]>([])
const getTOptions = computed(() =>
  options.value.map(i => ({
    label: t(i.label!),
    value: i.value,
  })),
)

async function onInit() {
  if (!props.dictType) {
    AppWarn('WDict need to provide `dictType` prop')
  }
  const res = await useDict(props.dictType)
  options.value = res!
}

onBeforeMount(onInit)
</script>

<template>
  <WSelect
    v-if="dictRenderType === 'select'" v-model:value="dictValue" :options="getTOptions"
    v-bind="renderComponentProps"
  />

  <WCheckbox
    v-if="dictRenderType === 'checkbox'" v-model:value="dictValue" :options="getTOptions"
    v-bind="renderComponentProps" multiple
  />

  <WRadio
    v-if="dictRenderType === 'radio'" v-model:value="dictValue" :options="getTOptions"
    v-bind="renderComponentProps"
  />
</template>
