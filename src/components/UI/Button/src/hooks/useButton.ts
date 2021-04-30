import type { SetupContext } from 'vue'
import type { WButtonProps } from '../types'

import { computed, ref, unref } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { easyOmit } from 'easy-fns-ts'

import { useI18n } from '/@/locales'
import { getDefaultSlotText } from '/@/utils/shared'
import { extendPropKeys } from '../props'

export const useButton = (
  props: WButtonProps,
  ctx: SetupContext<'click'[]>
) => {
  const { emit, slots, attrs } = ctx

  const { t } = useI18n()

  const originText = getDefaultSlotText(slots)

  let retryDelay = unref(props.retryDelay)
  const loadDelay = unref(props.loadDelay)

  const loading = ref(false)
  const disabled = ref(false)
  const delayText = ref('')

  const onClick = (event: EventListener) => {
    if (retryDelay) {
      disabled.value = true

      const intervalId = setInterval(() => {
        delayText.value = t('component.button.retry', { retryDelay })

        --retryDelay!

        if (retryDelay! < 0) {
          retryDelay = props.retryDelay
          delayText.value = originText
          disabled.value = false

          clearInterval(intervalId)
        }
      }, 1000)
    }

    if (loadDelay) {
      loading.value = true

      setTimeout(() => {
        loading.value = false
      }, +loadDelay * 1000)
    }

    emit('click', event)
  }

  const getDisabled = computed(() => disabled.value || props.disabled)
  const getLoading = computed(() => loading.value || props.loading)
  const getBindValue = computed(() => {
    return {
      ...attrs,
      ...easyOmit(props, extendPropKeys),
      onClick: props.debounce
        ? useDebounceFn(onClick, +props.debounce)
        : onClick,
      disabled: getDisabled.value,
      loading: getLoading.value,
    }
  })

  return {
    getBindValue,
    delayText,
  }
}
