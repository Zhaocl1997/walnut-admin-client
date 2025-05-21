import type { WForm } from '../types'

// TODO 111
import WDrawer from '@/components/UI/Drawer'
import WModal from '@/components/UI/Modal'

export function useFormDialog<T>(props: ComputedRef<WForm.Props<T>>, formRef: Ref<WForm.Inst.NFormInst>) {
  return defineComponent({
    setup(_, { slots, expose }) {
      const { t } = useAppI18n()

      const show = ref(false)
      const loading = ref(false)

      const done = () => (loading.value = false)

      const onOpen = async (beforeHook?: Fn) => {
        loading.value = true

        if (beforeHook)
          await beforeHook(done)
        else
          done()

        show.value = true
      }

      const onClose = () => {
        show.value = false

        return false
      }

      const onYes = async () => {
        try {
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
                return Promise.reject(new Error('Request Error'))
              }
            }
            // NOTICE do not catch here, we want block and do not excute code below
            // catch (err) {
            //   console.log('useFormDialog', err)
            // }
            finally {
              done()
            }
          }

          props.value.dialogProps?.onYes!(apiHandler, () => {
            done()
            onClose()
          })
        }
        catch (err) {
          console.log(err)
        }
      }

      const onNo = () => {
        if (!props.value.useDescription)
          formRef.value!.restoreValidation()

        props.value.dialogProps?.onNo!(onClose)
      }

      const onGetTitle = (title: string) => {
        const uniqueKey = props.value.localeUniqueKey

        if (
          uniqueKey
          && (props.value.useDescription || props.value.dialogProps?.detailTitle)
        ) {
          return (
            `${t(`table.${uniqueKey}.advancedTitle`)} ${t('app.button.detail')}`
          )
        }

        const actionType = unref(props.value?.dialogProps?.actionType)

        return uniqueKey && actionType
          ? `${t(`app.button.${actionType}`)} ${t(`table.${uniqueKey}.advancedTitle`)}`
          : title
      }

      onDeactivated(() => {
        onClose()
      })

      expose({
        onOpen,
        onClose,
      })

      return () => {
        const title = onGetTitle(props.value.dialogProps?.title as string)
        const width = props.value.dialogProps?.width
        const height = props.value.dialogProps?.height
        const draggable = props.value.dialogProps?.draggable
        const fullscreen = !loading.value && props.value.dialogProps?.fullscreen
        const maskClosable = !loading.value && props.value.dialogProps?.maskClosable
        const closable = !loading.value && props.value.dialogProps?.closable
        const defaultButton = getBoolean(props.value.dialogProps?.defaultButton, true)
        const autoFocus = getBoolean(props.value.dialogProps?.autoFocus, false)
        // MARK
        // default modal/drawer use show to toggle visiblility for performance
        const displayDirective = props.value.dialogProps?.displayDirective ?? 'show'

        if (props.value.dialogPreset === 'modal') {
          return (
            <WModal
              v-model={[show.value, 'show']}
              title={title}
              width={width}
              height={height}
              maskClosable={maskClosable}
              closable={closable}
              onYes={onYes}
              onNo={onNo}
              loading={loading.value}
              defaultButton={defaultButton}
              autoFocus={autoFocus}
              display-directive={displayDirective}
              draggable={draggable}
              fullscreen={fullscreen}
            >
              {slots?.default()}
            </WModal>
          )
        }

        if (props.value.dialogPreset === 'drawer') {
          return (
            <WDrawer
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
              resizable={props.value.dialogProps?.resizable}
              defaultWidth={props.value.dialogProps?.defaultWidth}
              defaultHeight={props.value.dialogProps?.defaultHeight}
              display-directive={displayDirective}
            >
              {slots?.default()}
            </WDrawer>
          )
        }
      }
    },
  })
}
