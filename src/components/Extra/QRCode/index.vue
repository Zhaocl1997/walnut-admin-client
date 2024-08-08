<script lang="ts">
</script>

<script lang="ts" setup>
import { useQRCode } from '@vueuse/integrations/useQRCode'

defineOptions({
  name: 'WQRCode',
})

const props = defineProps<InternalProps>()

const emits = defineEmits(['refresh'])

// TODO 888
interface InternalProps {
  url: string
  expireSeconds?: number
  success?: boolean
}

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
  },
)

function onRefresh() {
  emits('refresh', resume)
}
</script>

<template>
  <div class="relative w-min">
    <img
      :src="qrcode"
      alt="QR Code"
      class="transition transition-all" :class="[
        { 'blur-sm brightness-80 contrast-50': !isActive || success },
      ]"
    >

    <w-transition appear>
      <div class="abs-center">
        <template v-if="!isActive">
          <div class="mb-2 whitespace-nowrap text-gray-200 font-bold">
            {{ t('comp.qrcode.expired') }}
          </div>

          <n-button size="tiny" type="info" round @click="onRefresh">
            {{ t('comp.qrcode.refresh') }}
          </n-button>
        </template>

        <n-result
          v-if="success"
          size="small"
          status="success"
          :description="t('app.base.success')"
          class="text-gray-100"
        />
      </div>
    </w-transition>
  </div>
</template>
