import type { WForm } from '../types'
import type { DrawerProps, ModalProps } from 'naive-ui'

export const useFormAdvanced = (
  render: Fn,
  props: ComputedRef<WForm.Props>,
  formRef: Ref<Nullable<WForm.Inst.NFormInst>>
) => {
  const { t } = useAppI18n()
  const show = ref(false)
  const loading = ref(false)

  const done = () => (loading.value = false)

  const onOpen = () => {
    loading.value = true
    show.value = true

    return { done }
  }
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
    const apiHandler = async (apiFn: Fn, params: AnyObject) => {
      const ret = await apiFn(params)
      loading.value = false

      if (ret) {
        onClose()
        useAppMessage().success('Operation Success!')
      }
    }

    props.value.advancedProps?.onYes(apiHandler, () => {
      done()
      onClose()
    })
  }

  const onNo = () => {
    formRef.value!.restoreValidation()

    props.value.advancedProps?.onNo(onClose)
  }

  const renderAdvanced = () => {
    const renderAction = () => (
      <n-space size="small">
        <n-button
          size="small"
          type="primary"
          onClick={onYes}
          disabled={loading.value}
          loading={loading.value}
        >
          {(props.value.advancedProps as ModalProps).positiveText ??
            t('app:button:yes')}
        </n-button>

        <n-button size="small" onClick={onNo} disabled={loading.value}>
          {(props.value.advancedProps as ModalProps).negativeText ??
            t('app:button:no')}
        </n-button>
      </n-space>
    )

    if (props.value.preset === 'modal') {
      return (
        <n-modal
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
                <n-spin show={loading.value}>{render()}</n-spin>
              </div>
            ),
            action: () => renderAction(),
          }}
        </n-modal>
      )
    }

    if (props.value.preset === 'drawer') {
      return (
        <w-drawer
          v-model={[show.value, 'show']}
          title={props.value.advancedProps?.title}
          width={(props.value.advancedProps as DrawerProps)?.width}
          maskClosable={!loading.value}
          onUpdateShow={(show: boolean) => {
            !show && onNo()
          }}
          onYes={onYes}
          onNo={onNo}
          loading={loading.value}
        >
          {render()}
        </w-drawer>
      )
    }
  }

  return {
    onOpen,
    onClose,
    onYes,
    onNo,
    renderAdvanced,
  }
}
