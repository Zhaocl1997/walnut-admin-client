<script lang="ts">
export default defineComponent({
  name: 'WEmailInput',

  inheritAttrs: false,
})
</script>

<script lang="ts" setup>
import data, { defaultSuffix } from './data'

interface InternalProps {
  value?: string
  disabled?: boolean
}

const props = defineProps<InternalProps>()
const emits = defineEmits<{ (e: 'update:value', value: string): void }>()

const { language } = useSharedNavigatorLanguage()

const emailValue = ref<string>()

const transformOptions = (val: string[]) => val.map((suffix) => {
  const prefix = emailValue.value?.split('@')[0]
  return {
    label: prefix + suffix,
    value: prefix + suffix,
  }
})

const options = computed(() => {
  const iso2 = new Intl.Locale(language.value!).region
  const target = data.find(i => i.iso2 === iso2)

  return transformOptions(target ? target.suffix : defaultSuffix)
})

const onUpdateValue = (v: string) => {
  emits('update:value', v)
}

watch(() => props.value, (v) => {
  emailValue.value = v
}, { immediate: true })
</script>

<template>
  <n-auto-complete
    :value="emailValue"
    :disabled="disabled"
    :input-props="{
      autocomplete: 'disabled',
    }"
    blur-after-select
    clearable
    loading
    :options="options"
    placeholder="邮箱"
    @update:value="onUpdateValue"
  />
</template>

<style lang="scss" scoped>

</style>
