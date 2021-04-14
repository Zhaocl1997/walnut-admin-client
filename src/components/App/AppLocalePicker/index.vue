<template>
  <w-dropdown
    v-model="lang"
    :options="langLists"
    @command="onCommand"
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
  import { defineComponent, computed, ref, watchEffect } from 'vue'

  import { useAppStore } from '/@/store'
  import { langLists } from '/@/locales'

  export default defineComponent({
    name: 'AppLocalePicker',

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

    setup(props: any) {
      const lang = ref('')

      const { getters, dispatch } = useAppStore()

      watchEffect(() => {
        lang.value = getters.lang
      })

      const getLangText = computed(
        () => langLists.find((item) => item.value === lang.value)?.label
      )

      const onCommand = (val) => {
        dispatch('app/commitAppLang', val)
        props.reload && location.reload()
      }

      return {
        lang,
        getLangText,
        langLists,
        onCommand,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
