import type { WForm } from '../types'

export const useFormAdvanced = (
  render: Fn,
  props: ComputedRef<WForm.Props>,
  formRef: Ref<Nullable<WForm.Inst.NFormInst>>,
) => {
  const { t } = useAppI18n()

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
    // only when have result, close drawer and show message
    const apiHandler = async (apiFn: Fn, params: Recordable) => {
      try {
        const result = await apiFn(params)

        if (result) {
          onClose()
          useAppMsgSuccess()
        }
        else {
          return Promise.reject(new Error('Error'))
        }
      }
      finally {
        done()
      }
    }

    props.value.advancedProps?.onYes!(apiHandler, () => {
      done()
      onClose()
    })
  }

  const onNo = () => {
    if (!props.value.useDescription)
      formRef.value!.restoreValidation()

    props.value.advancedProps?.onNo!(onClose)
  }

  const onGetTitle = (title: string) => {
    const uniqueKey = props.value.localeUniqueKey

    if (
      uniqueKey
      && (props.value.useDescription || props.value.advancedProps?.detailTitle)
    ) {
      return (
        `${t(`table.${uniqueKey}.advancedTitle`)} ${t('app.button.detail')}`
      )
    }

    const actionType = unref(props.value?.advancedProps?.actionType)

    return uniqueKey && actionType
      ? `${t(`app.button.${actionType}`)} ${t(`table.${uniqueKey}.advancedTitle`)}`
      : title
  }

  const renderAdvanced = () => {
    const title = onGetTitle(props.value.advancedProps?.title as string)
    const width = props.value.advancedProps?.width
    const maskClosable = !loading.value && props.value.advancedProps?.maskClosable
    const closable = !loading.value && props.value.advancedProps?.closable
    const defaultButton = getBoolean(props.value.advancedProps?.defaultButton, true)
    const autoFocus = getBoolean(props.value.advancedProps?.autoFocus, false)
    // MARK
    // default modal/drawer use show to toggle visiblility for performance
    const displayDirective = props.value.advancedProps?.displayDirective ?? 'show'

    if (props.value.preset === 'modal') {
      return (
        <w-modal
          v-model={[show.value, 'show']}
          title={title}
          width={width}
          maskClosable={maskClosable}
          closable={closable}
          onYes={onYes}
          onNo={onNo}
          loading={loading.value}
          defaultButton={defaultButton}
          autoFocus={autoFocus}
          display-directive={displayDirective}
        >
          {render()}
        </w-modal>
      )
    }

    if (props.value.preset === 'drawer') {
      return (
        <w-drawer
          v-model={[show.value, 'show']}
          title={title}
          width={width}
          maskClosable={maskClosable}
          closable={closable}
          onUpdateShow={(show: boolean) => {
            !show && onNo()
          }}
          onYes={onYes}
          onNo={onNo}
          loading={loading.value}
          defaultButton={defaultButton}
          autoFocus={autoFocus}
          resizable={props.value.advancedProps?.resizable}
          defaultWidth={props.value.advancedProps?.defaultWidth}
          defaultHeight={props.value.advancedProps?.defaultHeight}
          display-directive={displayDirective}
        >
          {render()}
        </w-drawer>
      )
    }
  }

  onDeactivated(() => {
    onClose()
  })

  return {
    onOpen,
    onClose,
    onYes,
    onNo,
    renderAdvanced,
  }
}
