<script lang="ts" setup>
const appLock = useAppStoreLock()
const { currentRoute } = useAppRouter()

async function onLock() {
  await appLock.lock(currentRoute)
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'AppLock',
})
</script>

<template>
  <div>
    <w-icon
      icon="ant-design:lock-outlined"
      height="24"
      @click="onLock"
    />
  </div>
</template>
