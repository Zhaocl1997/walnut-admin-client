<script lang="ts" setup>
import type { ICompUIDrawerProps } from '.'

defineOptions({
  name: 'WCompUIDrawer',
})

const { closable = false, loading = false, defaultButton = true } = defineProps<ICompUIDrawerProps>()

const emits = defineEmits<{ yes: [], no: [] }>()

function onNo() {
  emits('no')
}

function onYes() {
  emits('yes')
}
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
        <slot v-if="$slots.footer" name="footer" />
        <n-space v-else-if="defaultButton" size="small">
          <n-button
            size="small"
            :on-click="onNo"
            :disabled="loading"
          >
            {{ $t('app.button.no') }}
          </n-button>

          <n-button
            size="small"
            type="primary"
            :on-click="onYes"
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
