<template>
  <div>
    <n-popselect :options="langLists" v-model:value="appLocale.locale">
      <w-icon icon="carbon:language" width="24"></w-icon>
    </n-popselect>
  </div>
</template>

<script lang="ts" setup>
  import type { SelectBaseOption } from 'naive-ui/lib/select/src/interface'
  import { AppI18nGetLangLists } from '/@/locales/backend'

  const appLocale = useAppLocaleStore()

  const langLists = ref<SelectBaseOption[]>([])

  const onGetLangList = async () => {
    const res = await AppI18nGetLangLists()
    langLists.value = res
  }

  onMounted(() => {
    onGetLangList()
  })
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AppLocalePicker',
  })
</script>
