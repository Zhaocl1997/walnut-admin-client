<script lang="ts" setup>
import type { SelectBaseOption } from 'naive-ui/lib/select/src/interface'

defineOptions({
  name: 'AppLocalePicker',
})

const appLocale = useAppStoreLocale()

const langLists = ref<SelectBaseOption[]>([])

async function onGetLangList() {
  const res = await AppI18nGetLangLists()
  langLists.value = res
}

onMounted(() => {
  onGetLangList()
})
</script>

<template>
  <div>
    <n-popselect v-model:value="appLocale.locale" :options="langLists">
      <w-icon icon="carbon:language" width="24" />
    </n-popselect>
  </div>
</template>
