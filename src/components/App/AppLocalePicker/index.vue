<template>
  <div>
    <n-popselect :options="langLists" v-model:value="app.locale">
      <w-icon icon="ant-design:dribbble-outlined" width="24"></w-icon>
    </n-popselect>
  </div>
</template>

<script lang="ts">
  import { langLists } from '/@/locales'
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
