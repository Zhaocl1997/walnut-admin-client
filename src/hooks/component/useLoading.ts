import type { Ref, VNode } from 'vue'

// import { ElLoading } from 'element-plus'
import { easyDeepMerge } from 'easy-fns-ts'

export interface ElLoadingParentElement extends HTMLElement {
  vLoadingAddClassList?: () => void
}

export interface ElLoadingOptions {
  target: string | HTMLElement

  parent: ElLoadingParentElement
  background: string
  spinner: boolean | string
  text: string
  fullscreen: boolean
  body: boolean
  lock: boolean
  customClass: string
  visible: boolean
}

export interface ElLoadingInstance {
  parent?: Ref<ElLoadingParentElement>
  background?: Ref<string>
  spinner?: Ref<boolean | string>
  text?: Ref<string>
  fullscreen?: Ref<boolean>
  body?: Ref<boolean>
  lock?: Ref<boolean>
  customClass?: Ref<string>
  visible?: Ref<boolean>
  target?: Ref<string | HTMLElement>
  originalPosition?: Ref<string>
  originalOverflow?: Ref<string>
  setText: (text: string) => void
  close: () => void
  handleAfterLeave: () => void
  vm: VNode
  $el: HTMLElement
}

export const useLoading = (options?: Partial<ElLoadingOptions>) => {
  const { t } = useAppI18n()
  const loading = ref(false)

  let instance: ElLoadingInstance | undefined

  const defaultOptions: Partial<ElLoadingOptions> = {
    text: t('component.base.loading.text'),
    customClass: 'w-loading',
    background: 'rgba(255,255,255,0.4)',
  }

  const getMergedOptions = () => {
    return easyDeepMerge(defaultOptions, options)
  }

  const startLoading = (startOptions?: Partial<ElLoadingOptions>) => {
    loading.value = true
    // instance = ElLoading.service(
    //   easyDeepMerge(getMergedOptions(), startOptions)
    // )
  }

  const endLoading = () => {
    loading.value = false
    instance && instance.close()
    instance = undefined
  }

  return {
    loading,
    startLoading,
    endLoading,
  }
}
