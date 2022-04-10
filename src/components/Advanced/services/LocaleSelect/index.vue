<template>
  <div class="hstack w-full gap-2">
    <w-select
      :value="value"
      :options="options"
      clearable
      filterable
      @update:value="onUpdateValue"
      :render-label="onRenderLabel"
      tooltip
    ></w-select>

    <w-a-icon
      icon="ant-design:plus-outlined"
      class="cursor-pointer"
      height="20"
      help-message="New Locale"
      @click="onNewLocale"
    ></w-a-icon>
  </div>
</template>

<script lang="ts" setup>
  import { SelectOption } from 'naive-ui'

  // TODO 888
  interface InternalProps {
    value?: string
    prefix?: string
  }

  const props = defineProps<InternalProps>()

  const emits = defineEmits(['update:value'])

  const { getLocaleMessage, locale } = useAppI18n()

  const options = computed(() =>
    Object.entries<string>(getLocaleMessage(locale.value))
      .map(([k, v]) => {
        if (!props.prefix || k.startsWith(props.prefix!)) {
          return { value: k, label: v }
        }

        return { value: undefined, label: undefined }
      })
      .filter((i) => i.value)
  )

  const onUpdateValue = (v: string) => emits('update:value', v)

  const onRenderLabel = (option: SelectOption) => {
    return option.label + ' (' + option.value + ')'
  }

  const onNewLocale = () => {
    useRouterPush({ name: 'Locale' })
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WLocaleSelect',
    inheritAttrs: false,
  })
</script>
