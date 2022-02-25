<template>
  <n-config-provider :theme="darkTheme">
    <w-icon
      icon="ant-design:lock-outlined"
      height="24"
      @click="onOpenEnterLockModal"
    ></w-icon>

    <n-modal :show="enterLockModalShow">
      <n-button @click="onLock">Lock App</n-button>
    </n-modal>

    <n-modal
      :show="app.isLock"
      class="h-screen w-screen relative bg-black bg-opacity-{99}"
    >
      <div class="absolute top-0 left-0 bottom-0 right-0">
        <n-button
          v-if="getShowUnlock"
          text
          @click="onUnlock"
          class="absolute top-8 left-1/2"
          style="transform: translateX(-50%)"
        >
          <w-icon icon="ant-design:unlock-outlined" height="24"></w-icon>
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

        <div class="text-white absolute top-2 left-2">{{ fps }}</div>

        <div
          class="text-white h-full w-full flex items-center justify-center self-center space-x-8"
          w:children="bg-gray-900 rounded-3xl font-bold flex items-center justify-center w-2/5 h-2/5 text-9xl"
          w:children:md="w-1/4 h-2/5 text-[10rem]"
          w:children:lg="w-1/4 h-3/5 text-[14rem]"
          w:children:xl="w-1/4 h-3/5 text-[16rem]"
          w:children:2xl="w-2/9 h-3/5 text-[18rem]"
        >
          <n-time :time="now" format="HH"></n-time>

          <n-time :time="now" format="mm"></n-time>

          <n-time v-if="!appMemo.isMobile" :time="now" format="ss"></n-time>
        </div>
      </div>
    </n-modal>
  </n-config-provider>
</template>

<script lang="ts" setup>
  import { darkTheme } from 'naive-ui'

  import Battery from './src/Battery.vue'
  import Network from './src/Network.vue'

  const { appMemo, app } = useAppState()

  const now = useNow()
  const fps = useFps()

  const enterLockModalShow = ref(false)

  const getShowUnlock = computed(
    () => app.value.lockMode === AppLockModeConst.MANUAL
  )

  const onOpenEnterLockModal = () => {
    // enterLockModalShow.value = true
    app.value.isLock = true
    app.value.lockMode = AppLockModeConst.MANUAL
  }

  const onLock = () => {
    // enterLockModalShow.value = false
    app.value.isLock = true
  }

  const onUnlock = () => {
    app.value.isLock = false
    app.value.lockMode = AppLockModeConst.AUTO
  }
</script>

<script lang="ts">
  export default defineComponent({
    name: 'AppLock',
  })
</script>
