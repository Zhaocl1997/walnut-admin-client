<script lang="ts" setup>
import { type ICompUIButtonRetryProps, buttonRetryMapPersistent } from '.'

defineOptions({
  name: 'WButtonRetry',
})

const props = withDefaults(defineProps<ICompUIButtonRetryProps>(), {
  retrySeconds: 60,
})

const { t } = useAppI18n()

const retryText = ref<string>()
const _intervalSeconds = ref<number>(props.retrySeconds)

const getRetrySeconds = computed<number>({
  get() {
    if (props.retryKey) {
      return buttonRetryMapPersistent.value.get(props.retryKey)!
    }
    return _intervalSeconds.value!
  },
  set(newValue) {
    if (props.retryKey) {
      buttonRetryMapPersistent.value.set(props.retryKey, newValue ?? props.retrySeconds)
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

    if (props.retryKey) {
      buttonRetryMapPersistent.value.set(props.retryKey, props.retrySeconds)
    }
    else {
      _intervalSeconds.value = props.retrySeconds
    }
  }
}, 1000, { immediate: false, immediateCallback: true })

// init
onBeforeMount(() => {
  if (props.retryKey) {
    if (getRetrySeconds.value) {
      if (getRetrySeconds.value !== props.retrySeconds) {
        resume()
      }
    }
    else {
      buttonRetryMapPersistent.value.set(props.retryKey, props.retrySeconds)
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
