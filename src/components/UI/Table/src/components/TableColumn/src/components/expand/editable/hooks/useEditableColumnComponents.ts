import { getCurrentInstance } from 'vue'
import { createAsyncComponent } from '/@/utils/factory/asyncComponent'

export const useEditableColumnComponents = () => {
  const instance = getCurrentInstance()

  const components = {
    WInput: createAsyncComponent(() => import('/@/components/UI/Input')),
    WInputNumber: createAsyncComponent(
      () => import('/@/components/UI/InputNumber')
    ),
    WSelect: createAsyncComponent(() => import('/@/components/UI/Select')),
  }

  // @ts-ignore
  instance!.type.components = components

  return {}
}
