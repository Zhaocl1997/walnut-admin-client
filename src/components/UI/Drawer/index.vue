<script lang="ts" setup>
import type { ICompUIDrawerProps } from '.'

defineOptions({
  name: 'WDrawer',
})

withDefaults(defineProps<ICompUIDrawerProps>(), {
  closable: false,
  loading: false,
  defaultButton: true,
})

defineEmits<{ yes: [], no: [] }>()
</script>

<template>
  <n-drawer native-scrollbar :auto-focus="false">
    <n-drawer-content :native-scrollbar="false" :closable="closable">
      <template #header>
        <WTitle prefix="bar" :help-message="helpMessage">
          {{ title }}
        </WTitle>
      </template>

      <template #default>
        <n-spin :show="loading">
          <slot />
        </n-spin>
      </template>

      <template #footer>
        <n-space v-if="defaultButton" size="small">
          <n-button
            size="small"
            :on-click="() => $emit('no')"
            :disabled="loading"
          >
            {{ $t('app.button.no') }}
          </n-button>

          <n-button
            size="small"
            type="primary"
            :on-click="() => $emit('yes')"
            :disabled="loading"
            :loading="loading"
          >
            {{ $t('app.button.yes') }}
          </n-button>
        </n-space>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>
