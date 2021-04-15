import { ref } from 'vue'

export interface useMouseOptions {
  /**
   * @description Initial values
   */
  initialValue?: { x: number; y: number }
}

/**
 * @description The easiest useMouse!
 */
export const useMouse = (options: useMouseOptions = {}) => {
  const { initialValue = { x: 0, y: 0 } } = options

  const x = ref(initialValue.x)
  const y = ref(initialValue.y)

  const mouseHandler = (event: MouseEvent) => {
    x.value = event.pageX
    y.value = event.pageY
  }

  window &&
    window.addEventListener('mousemove', mouseHandler, { passive: true })

  return {
    x,
    y,
  }
}
