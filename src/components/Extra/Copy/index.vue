<script lang="ts" setup>
import type { ICompExtraCopyProps } from '.'

defineOptions({
  name: 'WCompExtraCopy',
})

const props = withDefaults(
  defineProps<ICompExtraCopyProps>(),
  { copiedDuring: 3000, icon: false },
)

const emits = defineEmits<{ click: [e: MouseEvent] }>()

const { copy, copied } = useClipboard({
  copiedDuring: props.copiedDuring,
  legacy: true,
})

async function onClick(e: MouseEvent) {
  if (!props.source)
    return
  await copy(props.source)
  emits('click', e)
}
</script>

<template>
  <n-button
    v-if="!icon"
    dashed
    size="tiny"
    :type="copied ? 'success' : 'info'"
    :disabled="!source"
    @click.stop="onClick"
  >
    {{ copied ? $t('app.base.success') : $t('app.button.copy') }}
  </n-button>

  <WIconButton
    v-else
    :icon-props="{ icon: copied ? 'ant-design:check-circle-outlined' : 'ant-design:copy-outlined' }"
    :button-props="{ type: copied ? 'success' : 'info', text: true, onClick, disabled: !source }"
  />
</template>
