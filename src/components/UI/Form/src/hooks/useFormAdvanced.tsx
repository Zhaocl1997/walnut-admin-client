import type { WForm } from '../types'
import type { ComputedRef, Ref } from 'vue'
import type { ModalProps } from 'naive-ui'

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
    setTimeout(() => {
      loading.value = false
      onClose()
    }, 5000)
  }

  const onNo = () => {
    formRef.value!.restoreValidation()
    nextTick(() => {
      onClose()
    })
  }

  const renderAdvanced = () => {
    const renderAction = () => (
      <NSpace size="small">
        <NButton size="small" onClick={onNo} disabled={loading.value}>
          {(props.value.advancedProps as ModalProps).negativeText}
        </NButton>

        <NButton
          size="small"
          type="primary"
          onClick={onYes}
          disabled={loading.value}
          loading={loading.value}
        >
          {(props.value.advancedProps as ModalProps).positiveText}
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
          width={400}
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
