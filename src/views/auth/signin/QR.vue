<template>
  <div class="vstack items-center justify-center gap-y-2">
    <div class="relative">
      <img
        :src="qrcode"
        alt="QR Code"
        :class="[{ 'blur-sm brightness-80 contrast-50': !isActive }]"
      />

      <w-transition appear>
        <div v-if="!isActive" class="abs-center">
          <div class="mb-2 whitespace-nowrap font-bold">
            {{ t('form:app:signin:qrcode:expired') }}
          </div>

          <n-button size="tiny" type="info" round @click="onRefreshQRCode">
            {{ t('form:app:signin:qrcode:refresh') }}
          </n-button>
        </div>
      </w-transition>
    </div>

    <span>{{ t('form:app:signin:scan') }}</span>
  </div>
</template>

<script lang="ts" setup>
  import { useQRCode } from '@vueuse/integrations/useQRCode'

  const { t } = useAppI18n()

  const num = ref(0)

  const url = ref(`https://walnut-admin-doc.netlify.app/?t=${Date.now()}`)

  const qrcode = useQRCode(url)

  const { pause, isActive, resume } = useIntervalFn(() => {
    num.value++

    if (num.value > 3) {
      num.value = 0
      pause()
    }
  }, 1000)

  const onRefreshQRCode = () => {
    url.value = `https://walnut-admin-doc.netlify.app/?t=${Date.now()}`

    resume()
  }
</script>

<script lang="ts">
  // https://www.cnblogs.com/Arunoido/p/13937030.html?ivk_sa=1024320u
  export default defineComponent({
    name: 'SignInWithQR',

    defaultView: false,
  })
</script>
