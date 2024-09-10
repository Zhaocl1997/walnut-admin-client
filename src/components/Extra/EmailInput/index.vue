<script lang="ts" setup>
import data, { defaultSuffix } from './data'
import type { ICompExtraEmailInputProps } from '.'

defineOptions({
  name: 'WEmailInput',
  inheritAttrs: false,
})

defineProps<ICompExtraEmailInputProps>()
const value = defineModel<MaybeNullOrUndefined<string>>('value', { required: true })

const { language } = useSharedNavigatorLanguage()

function transformOptions(val: string[]) {
  return val.map((suffix) => {
    const prefix = value.value?.split('@')[0]
    return {
      label: prefix + suffix,
      value: prefix + suffix,
    }
  })
}

const getOptions = computed(() => {
  const iso2 = new Intl.Locale(language.value!).region
  const target = data.find(i => i.iso2 === iso2)

  return transformOptions(target ? target.suffix : defaultSuffix)
})
</script>

<template>
  <n-auto-complete
    v-model:value="value!"
    :disabled="disabled"
    :input-props="{
      autocomplete: 'disabled',
    }"
    clearable blur-after-select
    :options="getOptions"
    :placeholder="$t('comp.emailInput.ph')"
  />
</template>
