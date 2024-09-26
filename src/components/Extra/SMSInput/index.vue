<script lang="ts" setup>
import type { ICompExtraSMSInputProps } from '.'
import type { WVerifyInst } from '@/components/Extra/Verify'

defineOptions({
  name: 'WCompExtraSMSInput',
})

const props = withDefaults(defineProps<ICompExtraSMSInputProps>(), {
  retrySeconds: 60,
})

const emits = defineEmits<{ verifySuccess: [startCountdown: Fn] }>()

const buttonRef = shallowRef()
const verifyRef = shallowRef<WVerifyInst>()

function onVerify() {
  if (props.simpleVerify)
    verifyRef.value?.onOpenModal()
  else
    buttonRef.value!.onStartCountdown()
}

async function onClick() {
  if (!props.onBeforeCountdown) {
    onVerify()
  }
  else {
    const canVerify = await props.onBeforeCountdown()

    if (canVerify) {
      onVerify()
    }
    else {
      AppConsoleWarn('SMSInput', 'cannot start verify')
    }
  }
}

function onVerifySuccess() {
  emits('verifySuccess', () => buttonRef.value!.onStartCountdown())
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

  <!-- TODO this may not be a good design, need to pass `simple-verify` prop and `@verify-success` to start count down -->
  <WVerify
    v-if="simpleVerify"
    ref="verifyRef"
    @success="onVerifySuccess"
  />
</template>
