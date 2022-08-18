<template>
  <n-drawer native-scrollbar>
    <n-drawer-content :native-scrollbar="false" :closable="closable">
      <template #header>
        <w-title prefix="bar" :help-message="helpMessage">
          {{ title }}
        </w-title>
      </template>

      <template #>
        <n-spin :show="loading">
          <slot></slot>
        </n-spin>
      </template>

      <template #footer>
        <n-space size="small" v-if="defaultButton">
          <n-button
            size="small"
            :onClick="() => $emit('no')"
            :disabled="loading"
          >
            {{ t('app.button.no') }}
          </n-button>

          <n-button
            size="small"
            type="primary"
            :onClick="() => $emit('yes')"
            :disabled="loading"
            :loading="loading"
          >
            {{ t('app.button.yes') }}
          </n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script lang="ts" setup>
  // TODO 888
  interface InternalProps {
    closable?: boolean
    title?: string
    loading?: boolean
    helpMessage?: string
    defaultButton?: boolean
  }

  const props = withDefaults(defineProps<InternalProps>(), {
    closable: false,
    loading: false,
    defaultButton: true,
  })

  const emits = defineEmits(['yes', 'no'])

  const { t } = useAppI18n()
</script>

<script lang="ts">
  export default defineComponent({
    name: 'WDrawer',
  })
</script>
