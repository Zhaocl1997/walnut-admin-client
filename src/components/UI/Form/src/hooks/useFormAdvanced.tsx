import type { WForm } from '../types'
import type { DrawerProps, ModalProps } from 'naive-ui'

export const useFormAdvanced = (
  render: Fn,
  props: ComputedRef<WForm.Props>,
  formRef: Ref<Nullable<WForm.Inst.NFormInst>>
) => {
  const { t } = useAppI18n()
  const { AppSuccess } = useAppMsgSuccess()

  const show = ref(false)
  const loading = ref(false)

  const done = () => (loading.value = false)

  const onOpen = async (beforeHook?: Fn) => {
    loading.value = true

    await beforeHook!(done)

    show.value = true
  }

  const onClose = () => {
    show.value = false

    return false
  }

  const onYes = async () => {
    await formRef.value!.validate()

    loading.value = true

    // if error, we want loading stop, but drawer do not disappear
    // so `loading.value = false` is always excuting
    // only when have ret, close drawer and show message
    const apiHandler = async (apiFn: Fn, params: Recordable) => {
      try {
        const ret = await apiFn(params)

        if (ret) {
          onClose()
          AppSuccess()
        } else {
          return Promise.reject()
        }
      } finally {
        done()
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

  const onGetTitle = (title: string) => {
    const uniqueKey = props.value.localeUniqueKey

    const actionType = unref(props.value?.advancedProps?.actionType)

    return uniqueKey && actionType
      ? t(`app:button:${actionType}`) +
          ' ' +
          t(`table:${uniqueKey}:advancedTitle`)
      : title
  }

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

  const renderAdvanced = () => {
    if (props.value.preset === 'modal') {
      return (
        <n-modal
          preset="dialog"
          v-model={[show.value, 'show']}
          title={onGetTitle(props.value.advancedProps?.title as string)}
          maskClosable={!loading.value}
          onUpdateShow={(show: boolean) => {
            !show && onNo()
          }}
          closable={!loading.value}
          loading={loading.value}
          show-icon={false}
        >
          {{
            default: () => (
              <div class="mt-4">
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
          title={onGetTitle(props.value.advancedProps?.title as string)}
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
