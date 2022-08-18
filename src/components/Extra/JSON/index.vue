<template>
  <w-scrollbar :height="height">
    <div ref="WJSONRef" class="relative">
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
          {{ copied ? t('app.base.success') : t('app.button.copy') }}
        </n-button>
      </w-transition>
    </div>
  </w-scrollbar>
</template>

<script lang="ts" setup>
  // TODO 888
  interface InternalProps {
    value?: any
    height?: string
    width?: string
  }

  const props = withDefaults(defineProps<InternalProps>(), {
    value: {},
    height: '100px',
    width: '100%',
  })

  const { t } = useAppI18n()

  const WJSONRef = ref()
  const getJSON = computed(() =>
    typeof props.value === 'string'
      ? JSON.stringify(JSON.parse(props.value), null, 2)
      : JSON.stringify(props.value, null, 2)
  )

  const isHovered = useElementHover(WJSONRef)
  const { copy, copied } = useClipboard({ source: getJSON })
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WJSON',
  })
</script>
