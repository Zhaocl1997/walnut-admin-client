<script lang="ts" setup>
import type { Value } from 'naive-ui/es/select/src/interface'
import type { ICompExtraDictProps } from '.'
import type { AppDictTypeCommon } from '@/api/system/dict'

defineOptions({
  name: 'WCompExtraDict',
  inheritAttrs: false,
})

const props = withDefaults(defineProps<ICompExtraDictProps>(), {
  dictRenderType: 'select',
})

const dictValue = defineModel<MaybeNullOrUndefined<Value>>('value', { required: true })

const { t } = useAppI18n()

const { loading, execDict } = useDict(props.dictType)

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
  const res = await execDict()
  options.value = res!
}

onBeforeMount(onInit)
</script>

<template>
  <n-spin :show="loading">
    <template v-if="!loading">
      <!-- @vue-expect-error -->
      <WSelect
        v-if="dictRenderType === 'select'" v-model:value="dictValue" :options="getTOptions"
        v-bind="renderComponentProps"
      />

      <!-- @vue-expect-error -->
      <WCheckbox
        v-if="dictRenderType === 'checkbox'" v-model:value="dictValue" :options="getTOptions"
        v-bind="renderComponentProps" multiple
      />

      <!-- @vue-expect-error -->
      <WRadio
        v-if="dictRenderType === 'radio'" v-model:value="dictValue" :options="getTOptions"
        v-bind="renderComponentProps"
      />
    </template>
  </n-spin>
</template>
