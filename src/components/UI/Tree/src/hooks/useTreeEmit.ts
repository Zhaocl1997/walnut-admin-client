import type { TreeKey, WTreeExposedMethods } from '../types'

export const useTreeEmit = (emit: Fn) => {
  const emitModelValue = (val: TreeKey | TreeKey[]) => {
    emit('update:modelValue', val)
  }

  const emitCheck = (...args: any[]) => {
    emit('check', ...args)
  }

  const emitNodeClick = (...args: any[]) => {
    emit('node-click', ...args)
  }

  const emitHook = (methods: WTreeExposedMethods) => {
    emit('hook', methods)
  }

  return {
    emitModelValue,
    emitCheck,
    emitNodeClick,
    emitHook,
  }
}
