import { getCurrentInstance } from 'vue'
import { createAsyncComponent } from '/@/utils/factory/asyncComponent'

export const useEditableColumnComponents = () => {
  const instance = getCurrentInstance()

  const components = {
    WTableInput: createAsyncComponent(() => import('/@/components/UI/Input')),
    WTableInputNumber: createAsyncComponent(
      () => import('/@/components/UI/InputNumber')
    ),
    WTableSelect: createAsyncComponent(() => import('/@/components/UI/Select')),
  }

  // @ts-ignore
  instance!.type.components = components

  return {}
}
