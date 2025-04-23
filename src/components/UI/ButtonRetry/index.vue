<script lang="ts" setup>
import type { ICompUIButtonRetryProps } from '.'
import { buttonRetryMapPersistent } from '.'

defineOptions({
  name: 'WCompUIButtonRetry',
})

const { retrySeconds = 60, retryKey } = defineProps<ICompUIButtonRetryProps>()

const { t } = useAppI18n()

const retryText = ref<string>()
const _intervalSeconds = ref<number>(retrySeconds)

const getRetrySeconds = computed<number>({
  get() {
    if (retryKey) {
      return buttonRetryMapPersistent.value.get(retryKey)!
    }
    return _intervalSeconds.value!
  },
  set(newValue) {
    if (retryKey) {
      buttonRetryMapPersistent.value.set(retryKey, newValue ?? retrySeconds)
    }
    else {
      _intervalSeconds.value = newValue
    }
  },
})

const { pause, resume } = useIntervalFn(() => {
  retryText.value = t('comp.button.retry', {
    retryDelay: getRetrySeconds.value,
  })

  --getRetrySeconds.value!

  if (getRetrySeconds.value! < 0) {
    pause()

    retryText.value = undefined

    if (retryKey) {
      buttonRetryMapPersistent.value.set(retryKey, retrySeconds)
    }
    else {
      _intervalSeconds.value = retrySeconds
    }
  }
}, 1000, { immediate: false, immediateCallback: true })

// init
onBeforeMount(() => {
  if (retryKey) {
    if (getRetrySeconds.value) {
      if (getRetrySeconds.value !== retrySeconds) {
        resume()
      }
    }
    else {
      buttonRetryMapPersistent.value.set(retryKey, retrySeconds)
    }
  }
})

defineExpose({
  onStartCountdown: () => resume(),
})
</script>

<template>
  <WButton :disabled="!!retryText" :debounce="0">
    <slot v-if="!retryText" />
    <span v-else>{{ retryText }}</span>
  </WButton>
</template>
