<script lang="ts" setup>
defineOptions({
  name: 'AppFullScreen',
})

const props = withDefaults(defineProps<InternalProps>(), {
  size: '24',
})

// TODO 888
interface InternalProps {
  isFullscreen: boolean
  clickEvent: Fn
  size?: string
}
</script>

<template>
  <div>
    <n-tooltip trigger="hover">
      <template #default>
        {{ isFullscreen ? $t('app.button.minimize') : $t('app.button.maximize') }}
      </template>

      <template #trigger>
        <w-icon
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
