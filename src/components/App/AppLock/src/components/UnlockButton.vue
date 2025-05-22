<script lang="ts" setup>
defineOptions({
  name: 'WAppLockUnlockButton',
})

const appLock = useAppStoreLock()

const loading = ref(false)

function onUnlock() {
  loading.value = true

  const id = setTimeout(async () => {
    await appLock.unLock()
    loading.value = false
    clearTimeout(id)
  }, 1000)
}
</script>

<template>
  <n-button text :disabled="loading" class="absolute left-1/2 top-8 -translate-x-1/2" @click="onUnlock">
    <WIcon icon="ant-design:unlock-outlined" height="24" />
  </n-button>
</template>

<style lang="less" scoped>

</style>
