<template>
  <div class="relative w-min">
    <img
      :src="qrcode"
      alt="QR Code"
      :class="[{ 'blur-sm brightness-80 contrast-50': !isActive }]"
    />

    <w-transition appear>
      <div v-if="!isActive" class="abs-center">
        <div class="mb-2 whitespace-nowrap font-bold text-gray-200">
          {{ t('form:app:signin:qrcode:expired') }}
        </div>

        <n-button size="tiny" type="info" round @click="onRefresh">
          {{ t('form:app:signin:qrcode:refresh') }}
        </n-button>
      </div>
    </w-transition>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'WQRCode',
  })
</script>

<script lang="ts" setup>
  import { useQRCode } from '@vueuse/integrations/useQRCode'

  // TODO 888
  interface InternalProps {
    url: string
    expireSeconds?: number
  }

  const props = defineProps<InternalProps>()
  const emits = defineEmits(['refresh'])

  const { t } = useAppI18n()

  const count = ref(0)
  const insideUrl = toRef(props, 'url')

  const qrcode = useQRCode(insideUrl)

  const { pause, isActive, resume } = useIntervalFn(
    () => {
      count.value++

      if (count.value > props.expireSeconds!) {
        count.value = 0
        pause()
      }
    },
    1000,
    {
      immediateCallback: props.expireSeconds !== undefined,
    }
  )

  const onRefresh = () => {
    emits('refresh', resume)
  }
</script>
