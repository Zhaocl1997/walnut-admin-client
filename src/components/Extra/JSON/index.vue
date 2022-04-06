<template>
  <div ref="WJSONRef" class="relative min-h-16">
    <n-code :code="getJSON" language="json" word-wrap :trim="false"></n-code>

    <w-transition appear name="fade-right">
      <n-button
        class="absolute top-2 right-2"
        v-show="isHovered"
        dashed
        size="tiny"
        :type="copied ? 'success' : 'info'"
        @click="() => copy()"
      >
        {{ copied ? t('app:base:success') : t('app:button:copy') }}
      </n-button>
    </w-transition>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'WJSON',

    props: {
      value: {
        type: [Object, Array, String] as PropType<any>,
        default: '',
      },

      height: {
        type: String as PropType<string>,
        default: '100px',
      },

      width: {
        type: String as PropType<string>,
        default: '100%',
      },
    },

    setup(props) {
      const { t } = useAppI18n()

      const WJSONRef = ref()
      const getJSON = computed(() =>
        typeof props.value === 'string'
          ? JSON.stringify(JSON.parse(props.value), null, 2)
          : JSON.stringify(props.value, null, 2)
      )

      const isHovered = useElementHover(WJSONRef)
      const { copy, copied } = useClipboard({ source: getJSON.value })

      return {
        t,
        WJSONRef,
        getJSON,
        copy,
        copied,
        isHovered,
      }
    },
  })
</script>
