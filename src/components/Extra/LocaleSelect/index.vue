<script lang="ts" setup>
import type { SelectOption } from 'naive-ui'
import type { ICompExtraLocaleSelectProps } from '.'

defineOptions({
  name: 'WLocaleSelect',
  inheritAttrs: false,
})

const props = defineProps<ICompExtraLocaleSelectProps>()
const value = defineModel<MaybeNullOrUndefined<string>>('value', { required: true })

const { locale, messages } = useAppI18n()
const loading = ref(false)
const show = ref(false)

const options = computed(() =>
  Object.entries<any>(messages.value[`${locale.value}`])
    .map(([k, v]) => {
      if (!props.prefix || k.startsWith(props.prefix!))
        return { value: k, label: v }

      return { value: undefined, label: undefined }
    })
    .filter(i => i.value),
)

function onRenderLabel(option: SelectOption) {
  return `${option.label} (${option.value})`
}

async function onNewLocale() {
  // The name below need to match locale management name field which is fetch from backend
  await useAppRouterPush({ name: 'Locale', query: { localeKey: props?.presetKey } })
}

async function onRefresh() {
  loading.value = true

  const appLocale = useAppStoreLocale()

  const locale = appLocale.locale

  const res = await AppI18nGetI18nMsg(locale, 0)

  AppI18n.global.setLocaleMessage(locale, res)

  loading.value = false
}

onDeactivated(() => {
  show.value = false
})
</script>

<template>
  <div class="w-full hstack gap-2">
    <WSelect
      v-model:show="show"
      v-model:value="value!"
      :options="options"
      clearable
      filterable
      :render-label="onRenderLabel"
      tooltip
    >
      <template #action>
        <n-space>
          <WButton size="small" icon="ant-design:plus-outlined" @click="onNewLocale">
            {{ $t('app.button.create') }}
          </WButton>

          <WButton
            size="small" icon="ant-design:sync-outlined" :loading="loading" :disabled="loading"
            @click="onRefresh"
          >
            {{ $t('app.base.refresh') }}
          </WButton>
        </n-space>
      </template>
    </WSelect>
  </div>
</template>
