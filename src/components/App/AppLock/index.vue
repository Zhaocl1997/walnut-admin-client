<script lang="ts" setup>
const appLock = useAppStoreLock()
const { currentRoute } = useAppRouter()

const onLock = async () => {
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
