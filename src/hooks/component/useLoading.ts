import type { Ref, VNode } from 'vue'

import { ElLoading } from 'element-plus'
import { easyDeepMerge } from 'easy-fns-ts'

import { useI18n } from '/@/locales'

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

export const useLoading = (options: Partial<ElLoadingOptions>) => {
  const { t } = useI18n()

  let instance: ElLoadingInstance | undefined

  const defaultOptions: Partial<ElLoadingOptions> = {
    text: t('component.loading.text'),
    customClass: 'w-loading',
  }

  const getMergedOptions = () => {
    return easyDeepMerge(defaultOptions, options)
  }

  const startLoading = (startOptions: Partial<ElLoadingOptions>) => {
    if (instance) {
      return
    }

    instance = ElLoading.service(
      easyDeepMerge(getMergedOptions(), startOptions)
    )
  }

  const endLoading = () => {
    instance && instance.close()
    instance = undefined
  }

  return {
    startLoading,
    endLoading,
  }
}
