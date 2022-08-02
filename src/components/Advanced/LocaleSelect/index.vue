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
    >
      <template #action>
        <n-space>
          <w-button
            size="small"
            icon="ant-design:plus-outlined"
            @click="onNewLocale"
          >
            New
          </w-button>

          <w-button
            size="small"
            icon="ant-design:sync-outlined"
            @click="onRefresh"
            :loading="loading"
            :disabled="loading"
          >
            Refresh
          </w-button>
        </n-space>
      </template>
    </w-select>
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
  const loading = ref(false)

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
    useAppRouterPush({ name: 'Locale' })
  }

  const onRefresh = async () => {
    loading.value = true

    const appLocale = useAppStoreLocale()

    const locale = appLocale.locale

    const res = await AppI18nGetI18nMsg(locale, 0)

    AppI18n.global.setLocaleMessage(locale, res.data)

    loading.value = false
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WLocaleSelect',
    inheritAttrs: false,
  })
</script>
