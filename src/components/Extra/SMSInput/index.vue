<script lang="ts" setup>
import type { WButtonInst } from '@/components/UI/Button'
import type { WVerifyInst } from '@/components/Extra/Verify'

defineOptions({
  name: 'SMSInput',
})

const props = withDefaults(defineProps<InternalProps>(), {
  retrySeconds: 60,
})

// TODO 888
interface InternalProps {
  retrySeconds?: number
  simpleVerify?: boolean
  onBeforeCountdown?: () => Promise<boolean>
  onSuccess?: (startCountdown: () => void) => Promise<void>
}

const buttonRef = ref<WButtonInst>()
const verifyRef = ref<WVerifyInst>()

async function onClick() {
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

function onVerifySuccess() {
  nextTick(() => {
    onSuccess()
  })
}

function onSuccess() {
  if (!props.onSuccess)
    return

  props.onSuccess(() => buttonRef.value!.onStartCountdown())
}
</script>

<template>
  <n-input v-bind="$attrs" :input-props="{ autocomplete: 'one-time-code' }">
    <template #suffix>
      <w-button
        ref="buttonRef"
        type="info"
        text
        :retry="retrySeconds"
        manual-retry
        @click="onClick"
      >
        {{ $t('comp.verifyInput.send') }}
      </w-button>
    </template>
  </n-input>

  <WVerify
    v-if="simpleVerify"
    ref="verifyRef"
    @success="onVerifySuccess"
  />
</template>
