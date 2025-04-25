<script lang="ts" setup>
import type { IAppDictDataPicked } from '@/api/system/dict'
import type { ICompBusinessDictProps } from '.'

defineOptions({
  name: 'WCompBusinessDict',
})

const { renderType = 'select', dictType, componentProps } = defineProps<ICompBusinessDictProps>()

const dictValue = defineModel<any>('value', { required: true })

const { t } = useAppI18n()

const options = ref<IAppDictDataPicked[]>([])
const getTOptions = computed<OptionDataItem[]>(() =>
  options.value.map(i => ({
    label: t(i.label!),
    value: i.value as string,
  })),
)

async function onInit() {
  const res = await useDict(dictType)
  options.value = res.dictData.value?.dictData ?? []
}

onMounted(onInit)
</script>

<template>
  <!-- @vue-ignore -->
  <WSelect
    v-if="renderType === 'select'"
    v-model:value="dictValue"
    :options="getTOptions"
    v-bind="componentProps"
  />

  <!-- @vue-ignore -->
  <WCheckbox
    v-if="renderType === 'checkbox'"
    v-model:value="dictValue"
    :options="getTOptions"
    v-bind="componentProps"
    multiple
  />

  <!-- @vue-ignore -->
  <WRadio
    v-if="renderType === 'radio'"
    v-model:value="dictValue"
    :options="getTOptions"
    v-bind="componentProps"
  />
</template>
