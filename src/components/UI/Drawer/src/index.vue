<template>
  <n-drawer>
    <n-drawer-content
      :native-scrollbar="false"
      :header-style="
        headerFixed
          ? {
              position: 'absolute',
              width: '100%',
            }
          : {}
      "
      :footer-style="
        footerFixed
          ? {
              position: 'absolute',
              bottom: 0,
              width: '100%',
            }
          : {}
      "
    >
      <n-spin :show="$props.loading">
        <slot></slot>
      </n-spin>

      <template #header>{{ title }}</template>

      <template #footer>
        <n-space size="small">
          <n-button
            size="small"
            type="primary"
            :onClick="() => $emit('yes')"
            :disabled="$props.loading"
            :loading="$props.loading"
          >
            {{ t('component.base.action.confirm') }}
          </n-button>

          <n-button
            size="small"
            :onClick="() => $emit('no')"
            :disabled="$props.loading"
          >
            {{ t('component.base.action.cancel') }}
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

    props: props,

    emits: ['yes', 'no'],

    setup(props: WDrawertProps) {
      const { t } = useAppI18n()

      return {
        t,
      }
    },
  })
</script>
