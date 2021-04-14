import type { Slots, VNodeNormalizedChildren } from 'vue'
import { getCurrentInstance, onMounted, onUnmounted } from 'vue'
import { appError } from './log'

export const getDefaultSlotText = (slots: Slots): VNodeNormalizedChildren => {
  return (slots.default && slots.default()[0].children) || ''
}

export const isInSetup = () => {
  if (!getCurrentInstance()) {
    appError('Hook can only be used in `setup` function!')
  }
}

export const tryOnMounted = (fn: Fn) => {
  if (getCurrentInstance()) {
    onMounted(fn)
  }
}

export const tryOnUnMounted = (fn: Fn) => {
  if (getCurrentInstance()) {
    onUnmounted(fn)
  }
}
