<script lang="ts">
</script>

<script lang="ts" setup>
import type { WForm } from '../../types'
import type { AppSystemDictDataPicked } from '@/api/system/dict'
import type { WCheckboxProps } from '@/components/UI/Checkbox'
import type { WRadioProps } from '@/components/UI/Radio'
import type { WSelectProps } from '@/components/UI/Select'

defineOptions({
  name: 'WFormItemExtendDict',
  inheritAttrs: false,
})

// TODO 888
const props = withDefaults(defineProps<InternalProps>(), {
  dictRenderType: 'select',
})

const emits = defineEmits(['update:value'])

interface InternalProps {
  value?: any
  dictType: string
  dictRenderType?: WForm.DictComponentType
  renderComponentProps?: WSelectProps | WCheckboxProps | WRadioProps
}

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
