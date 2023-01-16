<script lang="ts" setup>
import type { SelectOption } from 'naive-ui'

// TODO 888
interface InternalProps {
  value?: string
  prefix?: string
  presetKey?: string
}

const props = defineProps<InternalProps>()

const emits = defineEmits(['update:value'])

const { locale, messages } = useAppI18n()
const loading = ref(false)

const options = computed(() =>
  Object.entries<any>(messages.value[`${locale.value}`])
    .map(([k, v]) => {
      if (!props.prefix || k.startsWith(props.prefix!))
        return { value: k, label: v }

      return { value: undefined, label: undefined }
    })
    .filter(i => i.value),
)

const onUpdateValue = (v: string) => emits('update:value', v)

const onRenderLabel = (option: SelectOption) => {
  return `${option.label} (${option.value})`
}

const onNewLocale = async () => {
  // The name below need to match locale management name field which is fetch from backend
  await useAppRouterPush({ name: 'Locale', query: { localeKey: props?.presetKey } })
}

const onRefresh = async () => {
  loading.value = true

  const appLocale = useAppStoreLocale()

  const locale = appLocale.locale

  const res = await AppI18nGetI18nMsg(locale, 0)

  AppI18n.global.setLocaleMessage(locale, res)

  loading.value = false
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'WLocaleSelect',
  inheritAttrs: false,
})
</script>

<template>
  <div class="hstack w-full gap-2">
    <n-select
      :value="value" :options="options" clearable filterable :render-label="onRenderLabel" tooltip
      @update:value="onUpdateValue"
    >
      <template #action>
        <n-space>
          <w-button size="small" icon="ant-design:plus-outlined" @click="onNewLocale">
            {{ $t('comp.localeSelect.new') }}
          </w-button>

          <w-button
            size="small" icon="ant-design:sync-outlined" :loading="loading" :disabled="loading"
            @click="onRefresh"
          >
            {{ $t('comp.localeSelect.refresh') }}
          </w-button>
        </n-space>
      </template>
    </n-select>
  </div>
</template>
