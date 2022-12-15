<script lang="ts" setup>
import type { WButtonInst } from '@/components/UI/Button'
import type { WVerifyInst } from '@/components/Extra/Verify'

// TODO 888
interface InternalProps {
  retrySeconds?: number
  simpleVerify?: boolean
  onBeforeCountdown?: () => Promise<boolean>
  onSuccess?: (startCountdown: () => void) => Promise<void>
}

const props = withDefaults(defineProps<InternalProps>(), {
  retrySeconds: 60,
})

const { t } = useAppI18n()

const buttonRef = ref<WButtonInst>()
const verifyRef = ref<WVerifyInst>()

const onClick = async () => {
  if (!props.onBeforeCountdown)
    return

  const canVerify = await props.onBeforeCountdown()

  if (!canVerify)
    return

  if (props.simpleVerify)
    verifyRef.value?.onOpenModal()
  else
    onSuccess()
}

const onVerifySuccess = () => {
  nextTick(() => {
    onSuccess()
  })
}

const onSuccess = () => {
  if (!props.onSuccess)
    return

  props.onSuccess(() => buttonRef.value!.onStartCountdown())
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'SMSInput',
})
</script>

<template>
  <n-input v-bind="$attrs">
    <template #suffix>
      <w-button
        ref="buttonRef"
        type="info"
        text
        :retry="retrySeconds"
        manual-retry
        @click="onClick"
      >
        {{ t('comp.verifyInput.send') }}
      </w-button>
    </template>
  </n-input>

  <WVerify
    v-if="simpleVerify"
    ref="verifyRef"
    @success="onVerifySuccess"
  />
</template>
