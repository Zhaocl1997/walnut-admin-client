<template>
  <div>
    <w-icon
      icon="ant-design:lock-outlined"
      height="24"
      @click="onOpenEnterLockModal"
    ></w-icon>

    <n-modal :show="enterLockModalShow">
      <n-button @click="onLock">Lock App</n-button>
    </n-modal>

    <n-modal
      :show="lockShow"
      class="h-screen w-screen relative bg-black bg-opacity-90"
    >
      <div class="absolute top-0 left-0 bottom-0 right-0">
        <n-button
          @click="onUnlock"
          class="absolute top-8 left-1/2"
          style="transform: translateX(-50%)"
        >
          unlock
        </n-button>

        <div
          class="absolute bottom-8 left-1/2"
          style="transform: translateX(-50%)"
        >
          <n-time
            :time="now"
            format="yyyy/MM/dd"
            class="text-2xl 2xl:text-4xl tracking-wide"
          ></n-time>
        </div>

        <div
          class="absolute bottom-7.5 right-4"
          style="transform: translateX(-50%)"
        >
          <Battery class="mr-2" />
          <Network />
        </div>

        <div class="absolute top-2 left-2">{{ fps }}</div>

        <div
          class="h-full w-full flex items-center justify-center self-center space-x-8"
          w:children="w-2/5 h-2/5 bg-gray-900 rounded-3xl text-9xl font-bold flex items-center justify-center 2xl:(w-2/9 h-3/5 text-[18rem])"
        >
          <n-time :time="now" format="HH"></n-time>

          <n-time :time="now" format="mm"></n-time>

          <n-time v-if="!appMemo.isMobile" :time="now" format="ss"></n-time>
        </div>
      </div>
    </n-modal>
  </div>
</template>

<script lang="ts" setup>
  import Battery from './src/Battery.vue'
  import Network from './src/Network.vue'

  const { appMemo } = useAppState()

  const now = useNow()
  const fps = useFps()

  const enterLockModalShow = ref(false)
  const lockShow = ref(false)

  const onOpenEnterLockModal = () => {
    enterLockModalShow.value = true
  }

  const onLock = () => {
    enterLockModalShow.value = false
    lockShow.value = true
  }

  const onUnlock = () => {
    lockShow.value = false
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AppLock',
  })
</script>
