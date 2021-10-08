<template>
  <n-popselect :options="langLists" v-model:value="app.locale">
    <w-icon
      icon="ant-design:dribbble-outlined"
      width="24"
      class="cursor-pointer"
    ></w-icon>
  </n-popselect>
</template>

<script lang="ts">
  import type { PropType } from 'vue'
  import { defineComponent, watchEffect } from 'vue'

  import { langLists } from '/@/locales'
  import { useAppContext } from '/@/App'
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
      const { app } = useAppContext()

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
