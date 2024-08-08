<script lang="ts" setup>
const props = withDefaults(
  defineProps<{ source: any, copiedDuring?: number, icon?: boolean }>(),
  { copiedDuring: 3000 },
)

const { t } = useAppI18n()

const { copy, copied } = useClipboard({
  copiedDuring: props.copiedDuring,
})

async function onClick() {
  await copy(props.source)
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'WCopy',
})
</script>

<template>
  <n-button
    v-if="!icon"
    dashed
    size="tiny"
    :type="copied ? 'success' : 'info'"
    @click="onClick"
  >
    {{ copied ? t('app.base.success') : t('app.button.copy') }}
  </n-button>

  <n-button v-else :type="copied ? 'success' : 'info'" text @click="onClick">
    <w-icon
      height="24"
      :icon="
        copied ? 'ant-design:check-circle-outlined' : 'ant-design:copy-outlined'
      "
    />
  </n-button>
</template>
