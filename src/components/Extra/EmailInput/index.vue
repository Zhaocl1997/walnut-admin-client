<script lang="ts">
</script>

<script lang="ts" setup>
import data, { defaultSuffix } from './data'

const props = defineProps<InternalProps>()

const emits = defineEmits<{ (e: 'update:value', value: string): void }>()

export default defineComponent({
  name: 'WEmailInput',

  inheritAttrs: false,
})

interface InternalProps {
  value?: string
  disabled?: boolean
}

const { language } = useSharedNavigatorLanguage()

const emailValue = ref<string>()

function transformOptions(val: string[]) {
  return val.map((suffix) => {
    const prefix = emailValue.value?.split('@')[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    }
  })
}

const options = computed(() => {
  const iso2 = new Intl.Locale(language.value!).region
  const target = data.find(i => i.iso2 === iso2)

  return transformOptions(target ? target.suffix : defaultSuffix)
})

function onUpdateValue(v: string) {
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

    clearable blur-after-select
    :options="options"
    :placeholder="$t('comp.emailInput.ph')"
    @update:value="onUpdateValue"
  />
</template>

<style lang="scss" scoped>

</style>
