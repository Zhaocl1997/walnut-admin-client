<script lang="ts" setup>
import type { WAppFullScreenProps } from '.'

defineOptions({
  name: 'AppFullScreen',
})

const props = withDefaults(defineProps<WAppFullScreenProps>(), {
  size: '24',
})
</script>

<template>
  <div>
    <n-tooltip trigger="hover">
      <template #default>
        {{ isFullscreen ? $t('app.button.minimize') : $t('app.button.maximize') }}
      </template>

      <template #trigger>
        <WIcon
          :icon="
            isFullscreen
              ? 'ant-design:fullscreen-exit-outlined'
              : 'ant-design:fullscreen-outlined'
          "
          :width="size"
          @click="clickEvent"
        />
      </template>
    </n-tooltip>
  </div>
</template>
