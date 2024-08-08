export interface useExposeOptions<T> {
  /**
   * @description Custom apis want to expose
   */
  apis: T | Recordable

  /**
   * @description The `expose` function in `SetupContext`
   */
  expose: (exposed: Record<string, any>) => void

  /**
   * @description Whether need the original exposed apis
   * @default false
   */
  originalProxy?: boolean
}

/**
 * @description Integrate entry expose
 */
export function useExpose<T>(options: useExposeOptions<T>) {
  const { apis, expose, originalProxy = false } = options

  const instance = getCurrentInstance()

  if (instance && originalProxy) {
    Object.assign(instance.proxy, apis)
    return
  }

  expose(apis)
}
