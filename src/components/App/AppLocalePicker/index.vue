<template>
  <w-dropdown
    v-model="locale"
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
  import { getAppContext } from '/@/App'
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
      const { locale } = getAppContext()

      const getLangText = computed(
        () => langLists.find((item) => item.value === locale.value)?.label
      )

      watchEffect(async () => {
        const { loadLocaleMessages, setI18nLanguage } = useLocale(locale.value)
        await loadLocaleMessages()
        setI18nLanguage()
        props.reload && location.reload()
      })

      return {
        locale,
        langLists,
        getLangText,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
