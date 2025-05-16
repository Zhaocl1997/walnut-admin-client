<script lang="ts" setup>
defineOptions({
  name: 'TheContentExitFullContent',
})

const appSetting = useAppStoreSetting()

useEventListener('keydown', async (e) => {
  if (e.key === 'Escape') {
    appSetting.toggleLayout(true)
  }
})

function onClick() {
  appSetting.toggleLayout(true)
}
</script>

<template>
  <div class="m-4 mb-2">
    <n-button type="error" dashed @click="onClick">
      {{ $t('app.button.minimize') }}
    </n-button>
  </div>
</template>
