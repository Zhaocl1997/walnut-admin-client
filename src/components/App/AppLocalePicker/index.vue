<template>
  <div>
    <n-popselect
      :options="langLists"
      v-model:value="app.locale"
      trigger="click"
    >
      <w-icon icon="carbon:language" width="24"></w-icon>
    </n-popselect>
  </div>
</template>

<script lang="ts">
  import type { SelectBaseOption } from 'naive-ui/lib/select/src/interface'
  import { AppI18nGetLangLists } from '/@/locales/backend'
  import { useLocale } from './useAppLocale'

  export default defineComponent({
    name: 'AppLocalePicker',

    inheritAttrs: false,

    props: {
      reload: {
        type: Boolean as PropType<boolean>,
        default: false,
      },

      showText: {
        type: Boolean as PropType<boolean>,
        default: false,
      },
    },

    setup(props) {
      const { app } = useAppState()

      const langLists = ref<SelectBaseOption[]>([])

      const onGetLangList = async () => {
        const res = await AppI18nGetLangLists()
        langLists.value = res
      }

      onMounted(() => {
        onGetLangList()
      })

      watchEffect(async () => {
        const { loadLocaleMessages, setI18nLanguage } = useLocale(
          app.value.locale
        )
        await loadLocaleMessages()
        setI18nLanguage()
        props.reload && location.reload()
      })

      return {
        app,
        langLists,
      }
    },
  })
</script>
