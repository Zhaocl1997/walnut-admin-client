<script lang="ts" setup>
import type { Value } from 'naive-ui/es/select/src/interface'
import type { ICompExtraDictProps } from '.'

defineOptions({
  name: 'WCompExtraDict',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ICompExtraDictProps>(), {
  dictRenderType: 'select',
})

const dictValue = defineModel<Value>('value', { required: true })

const { t } = useAppI18n()

const { loading, execDict } = useDict(props.dictType)

const getTOptions = computed(() =>
  getDictDataFromMap(props.dictType)?.map(i => ({
    label: t(i.label!),
    value: i.value,
  })),
)

async function onInit() {
  if (!props.dictType) {
    console.warn('WDict', 'need to provide `dictType` prop')
    return
  }
  await execDict()
}

onBeforeMount(onInit)
</script>

<template>
  <n-spin :show="loading">
    <template v-if="!loading">
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
  </n-spin>
</template>
