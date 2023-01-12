<script lang="ts" setup>
const appLock = useAppStoreLock()

const loading = ref(false)

const onUnlock = () => {
  loading.value = true

  setTimeout(async () => {
    await appLock.unLock()
    loading.value = false
  }, 1000)
}
</script>

<template>
  <n-button text :disabled="loading" class="absolute top-8 left-1/2 -translate-x-1/2" @click="onUnlock">
    <w-icon icon="ant-design:unlock-outlined" height="24" />
  </n-button>
</template>

<style lang="less" scoped>

</style>
