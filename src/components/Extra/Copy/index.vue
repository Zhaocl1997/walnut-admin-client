<script lang="ts" setup>
import type { ICompExtraCopyProps } from '.'

defineOptions({
  name: 'WCopy',
})

const props = withDefaults(
  defineProps<ICompExtraCopyProps>(),
  { copiedDuring: 3000, icon: false },
)

const { copy, copied } = useClipboard({
  copiedDuring: props.copiedDuring,
  legacy: true,
})

async function onClick() {
  await copy(props.source)
}
</script>

<template>
  <n-button
    v-if="!icon"
    dashed
    size="tiny"
    :type="copied ? 'success' : 'info'"
    @click="onClick"
  >
    {{ copied ? $t('app.base.success') : $t('app.button.copy') }}
  </n-button>

  <!-- TODO button icon replace -->
  <n-button v-else :type="copied ? 'success' : 'info'" text @click="onClick">
    <template #icon>
      <WIcon
        height="24"
        :icon="
          copied ? 'ant-design:check-circle-outlined' : 'ant-design:copy-outlined'
        "
      />
    </template>
  </n-button>
</template>
