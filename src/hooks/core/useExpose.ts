import { getCurrentInstance } from 'vue'

export interface useExposeOptions {
  apis: Recordable
  expose: (exposed: Record<string, any>) => void
  originalProxy?: boolean
}

export const useExpose = (options: useExposeOptions) => {
  const { apis, expose, originalProxy } = options

  const instance = getCurrentInstance()

  if (instance && originalProxy) {
    Object.assign(instance.proxy, apis)
    return
  }

  expose(apis)
}
