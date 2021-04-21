<template>
  <w-dropdown
    v-model="app.locale"
    :options="langLists"
    size="medium"
    trigger="click"
  >
    <template #default>
      <div>
        <w-icon icon="ant-design:dribbble-outlined" width="24"></w-icon>
        <div
          v-if="showText"
          class="inline font-sans text-base font-semibold text-gray-600 absolute bottom-0.5 whitespace-nowrap"
        >
          {{ getLangText }}
        </div>
      </div>
    </template>
  </w-dropdown>
</template>

<script lang="ts">
  import type { PropType } from 'vue'
  import { defineComponent, computed, watchEffect } from 'vue'

  import { langLists } from '/@/locales'
  import { useAppContext } from '/@/App'
  import { useLocale } from './useLocale'

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

      const getLangText = computed(
        () => langLists.find((item) => item.value === app.value.locale)?.label
      )

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
        getLangText,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
