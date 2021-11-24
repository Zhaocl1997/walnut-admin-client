<template>
  <n-drawer>
    <n-drawer-content :native-scrollbar="false">
      <n-spin :show="loading">
        <slot></slot>
      </n-spin>

      <template #header>{{ title }}</template>

      <template #footer>
        <n-space size="small">
          <n-button
            size="small"
            type="primary"
            :onClick="() => $emit('yes')"
            :disabled="loading"
            :loading="loading"
          >
            {{ t('app:button:yes') }}
          </n-button>

          <n-button
            size="small"
            :onClick="() => $emit('no')"
            :disabled="loading"
          >
            {{ t('app:button:no') }}
          </n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts">
  import type { WDrawertProps } from './types'
  import { props } from './props'

  export default defineComponent({
    name: 'WDrawer',

    props,

    emits: ['yes', 'no'],

    setup(props: WDrawertProps) {
      const { t } = useAppI18n()

      return {
        t,
      }
    },
  })
</script>
