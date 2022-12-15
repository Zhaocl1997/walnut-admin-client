<script lang="ts" setup>
// TODO 888
interface InternalProps {
  isFullscreen: boolean
  clickEvent: Fn
  size?: string
}

const props = withDefaults(defineProps<InternalProps>(), {
  size: '24',
})

const { t } = useAppI18n()
</script>

<script lang="ts">
export default defineComponent({
  name: 'AppFullScreen',
})
</script>

<template>
  <div>
    <n-tooltip trigger="hover">
      <template #default>
        {{ isFullscreen ? t('app.button.minimize') : t('app.button.maximize') }}
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
