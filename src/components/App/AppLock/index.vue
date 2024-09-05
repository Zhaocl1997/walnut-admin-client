<script lang="ts" setup>
defineOptions({
  name: 'AppLock',
})

const appLock = useAppStoreLock()
const { currentRoute } = useAppRouter()

async function onLock() {
  await appLock.lock(currentRoute)
}
</script>

<template>
  <div>
    <w-icon icon="ant-design:lock-outlined" height="24" @click="onLock" />
  </div>
</template>
