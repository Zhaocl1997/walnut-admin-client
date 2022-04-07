<template>
  <div>
    <n-popselect :options="langLists" v-model:value="app.locale">
      <w-icon icon="carbon:language" width="24"></w-icon>
    </n-popselect>
  </div>
</template>

<script lang="ts">
  import type { SelectBaseOption } from 'naive-ui/lib/select/src/interface'
  import { AppI18nGetLangLists } from '/@/locales/backend'

  export default defineComponent({
    name: 'AppLocalePicker',

    setup() {
      const { app } = useAppState()

      const langLists = ref<SelectBaseOption[]>([])

      const onGetLangList = async () => {
        const res = await AppI18nGetLangLists()
        langLists.value = res
      }

      onMounted(() => {
        onGetLangList()
      })

      return {
        app,
        langLists,
      }
    },
  })
</script>
