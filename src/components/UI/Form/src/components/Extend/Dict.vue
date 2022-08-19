<template>
  <w-select
    v-if="dictRenderType === 'select'"
    v-model:value="dictValue"
    @update:value="onUpdateValue"
    :options="getTOptions"
    v-bind="renderComponentProps"
  ></w-select>

  <w-checkbox
    v-if="dictRenderType === 'checkbox'"
    v-model:value="dictValue"
    @update:value="onUpdateValue"
    :options="getTOptions"
    v-bind="renderComponentProps"
    multiple
  ></w-checkbox>

  <w-radio
    v-if="dictRenderType === 'radio'"
    v-model:value="dictValue"
    @update:value="onUpdateValue"
    :options="getTOptions"
    v-bind="renderComponentProps"
  ></w-radio>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'WFormItemExtendDict',

    inheritAttrs: false,
  })
</script>

<script lang="ts" setup>
  import type { WForm } from '../../types'
  import type { AppDictTypeCommon } from '@/api/system/dict'
  import type { WCheckboxProps } from '@/components/UI/Checkbox'
  import type { WRadioProps } from '@/components/UI/Radio'
  import type { WSelectProps } from '@/components/UI/Select'

  interface InternalProps {
    value?: any
    dictType: string
    dictRenderType?: WForm.DictComponentType
    renderComponentProps?: WSelectProps | WCheckboxProps | WRadioProps
  }

  // TODO 888
  const props = withDefaults(defineProps<InternalProps>(), {
    dictRenderType: 'select',
  })
  const emits = defineEmits(['update:value'])

  const { t } = useAppI18n()

  const dictValue = ref()
  const options = ref<AppDictTypeCommon>([])
  const getTOptions = computed(() =>
    options.value.map((i) => ({
      label: t(i.label!),
      value: i.value,
    }))
  )

  const onUpdateValue = (v: any) => {
    emits('update:value', v)
  }

  const onInit = async () => {
    const res = await useDict(props.dictType)
    options.value = res!.dictData

    dictValue.value = props.value
  }

  onMounted(onInit)
</script>
