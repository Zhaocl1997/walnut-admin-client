<script lang="ts" setup>
import Battery from './src/Battery.vue'
import Network from './src/Network.vue'

const appLock = useAppStoreLock()

const now = useNow()
const fps = useFps()

const loading = ref(false)

const onUnlock = () => {
  loading.value = true

  setTimeout(async () => {
    await appLock.unLock()
    loading.value = false
  }, 1000)
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'Lock',
})
</script>

<template>
  <div
    class="h-screen w-screen relative bg-black bg-opacity-{99} text-white overflow-hidden absolute top-0 left-0 bottom-0 right-0"
  >
    <n-button
      text
      :disabled="loading"
      class="absolute top-8 left-1/2 -translate-x-1/2"
      @click="onUnlock"
    >
      <w-icon icon="ant-design:unlock-outlined" height="24" />
    </n-button>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
      <n-time
        :time="now"
        format="yyyy/MM/dd"
        class="text-2xl 2xl:text-4xl tracking-wide"
      />
    </div>

    <div
      class="absolute bottom-7.5 right-4"
      style="transform: translateX(-50%)"
    >
      <Battery class="mr-2" />
      <Network />
    </div>

    <div class="text-white absolute top-2 left-2">
      {{ fps }}
    </div>

    <div
      class="text-white h-full w-full flex items-center justify-center self-center"
    >
      <WFlipClock />
    </div>
  </div>
</template>
