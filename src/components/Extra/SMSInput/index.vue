<script lang="ts" setup>
import type { WVerifyInst } from '@/components/Extra/Verify'
import type { ICompExtraSMSInputProps } from '.'

defineOptions({
  name: 'WCompExtraSMSInput',
})

const { retrySeconds = 60, simpleVerify = false, onBeforeCountdown } = defineProps<ICompExtraSMSInputProps>()

const emits = defineEmits<{ verifySuccess: [startCountdown: Fn] }>()

const buttonRef = useTemplateRef<{ onStartCountdown: Fn }>('buttonRef')
const verifyRef = useTemplateRef<WVerifyInst>('verifyRef')

function onVerify() {
  if (simpleVerify)
    verifyRef.value?.onOpenModal()
  else
    buttonRef.value?.onStartCountdown()
}

async function onClick() {
  if (!onBeforeCountdown) {
    onVerify()
  }
  else {
    const canVerify = await onBeforeCountdown()

    if (canVerify) {
      onVerify()
    }
    else {
      console.warn('SMSInput', 'cannot start verify')
    }
  }
}

function onVerifySuccess() {
  emits('verifySuccess', () => buttonRef.value?.onStartCountdown())
}
</script>

<template>
  <n-input v-bind="$attrs" :input-props="{ autocomplete: 'one-time-code' }">
    <template #suffix>
      <WButtonRetry
        ref="buttonRef"
        type="info"
        text
        :retry-seconds="retrySeconds"
        :retry-key="retryKey"
        @click="onClick"
      >
        {{ $t('comp.verifyInput.send') }}
      </WButtonRetry>
    </template>
  </n-input>

  <!-- TODO this may not be a good design -->
  <WVerify
    v-if="simpleVerify"
    ref="verifyRef"
    @success="onVerifySuccess"
  />
</template>
