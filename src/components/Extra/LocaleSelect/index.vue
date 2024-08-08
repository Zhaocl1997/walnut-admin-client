<script lang="ts" setup>
import type { SelectOption } from 'naive-ui'

defineOptions({
  name: 'WLocaleSelect',
  inheritAttrs: false,
})

const props = defineProps<InternalProps>()

const emits = defineEmits(['update:value'])

// TODO 888
interface InternalProps {
  value?: string
  prefix?: string
  presetKey?: string
}

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

const onUpdateValue = (v: string) => emits('update:value', v)

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
    <w-select
      v-model:show="show" :value="value" :options="options" clearable filterable :render-label="onRenderLabel"
      tooltip :virtual-scroll="false" @update:value="onUpdateValue"
    >
      <template #action>
        <n-space>
          <w-button size="small" icon="ant-design:plus-outlined" @click="onNewLocale">
            {{ $t('app.button.create') }}
          </w-button>

          <w-button
            size="small" icon="ant-design:sync-outlined" :loading="loading" :disabled="loading"
            @click="onRefresh"
          >
            {{ $t('app.base.refresh') }}
          </w-button>
        </n-space>
      </template>
    </w-select>
  </div>
</template>
