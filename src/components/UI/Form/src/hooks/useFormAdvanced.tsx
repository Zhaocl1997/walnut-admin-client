import type { WForm } from '../types'
import type { ComputedRef, Ref } from 'vue'
import type { DialogProps, DrawerProps, ModalProps } from 'naive-ui'

import {
  NModal,
  NDrawer,
  NDrawerContent,
  NButton,
  NSpace,
  NSpin,
} from 'naive-ui'

export const useFormAdvanced = (
  render: Fn,
  props: ComputedRef<WForm.Props>,
  formRef: Ref<Nullable<WForm.Inst.NFormInst>>
) => {
  const { t } = useAppI18n()
  const show = ref(false)
  const loading = ref(false)

  const onOpen = () => (show.value = true)
  const onClose = () => {
    if (loading.value) {
      return
    }

    show.value = false

    return false
  }

  const onYes = async () => {
    await formRef.value!.validate()

    loading.value = true

    // if error, we want loading stop, but drawer do not disappear
    // so `loading.value = false` is always excuting
    // only when have ret, close drawer and show message
    const handler = async (
      baseApi: AnyObject,
      apiFn: Fn,
      formData: AnyObject
    ) => {
      const ret = await apiFn.call(baseApi, formData)
      loading.value = false

      if (ret) {
        onClose()
        useAppMessage().success('Operation Success!')
      }
    }

    props.value.advancedProps?.onYes!(handler)
  }

  const onNo = () => {
    formRef.value!.restoreValidation()

    props.value.advancedProps?.onNo!(onClose)
  }

  const renderAdvanced = () => {
    const renderAction = () => (
      <NSpace size="small">
        <NButton
          size="small"
          type="primary"
          onClick={onYes}
          disabled={loading.value}
          loading={loading.value}
        >
          {(props.value.advancedProps as ModalProps).positiveText ??
            t('component.base.action.confirm')}
        </NButton>

        <NButton size="small" onClick={onNo} disabled={loading.value}>
          {(props.value.advancedProps as ModalProps).negativeText ??
            t('component.base.action.cancel')}
        </NButton>
      </NSpace>
    )

    if (props.value.preset === 'modal') {
      return (
        <NModal
          v-model={[show.value, 'show']}
          {...(props.value.advancedProps as ModalProps)}
          preset="dialog"
          loading={loading.value}
          onClose={onClose}
          closable={!loading.value}
        >
          {{
            default: () => (
              <div class="border-t-1 border-b-1 p-4 border-gray-300">
                <NSpin show={loading.value}>{render()}</NSpin>
              </div>
            ),
            action: () => renderAction(),
          }}
        </NModal>
      )
    }

    if (props.value.preset === 'drawer') {
      return (
        <NDrawer
          v-model={[show.value, 'show']}
          maskClosable={props.value.advancedProps!.maskClosable as boolean}
          width={(props.value.advancedProps! as DrawerProps).width}
          onUpdateShow={(show) => {
            !show && onNo()
          }}
        >
          <NDrawerContent
            title={props.value.advancedProps?.title as string}
            closable={!loading.value}
          >
            {{
              default: () => <NSpin show={loading.value}>{render()}</NSpin>,
              footer: () => renderAction(),
            }}
          </NDrawerContent>
        </NDrawer>
      )
    }
  }

  return {
    onOpen,
    onClose,
    onYes,
    renderAdvanced,
  }
}
