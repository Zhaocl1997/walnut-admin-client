<script lang="tsx">
import type { WButtonProps } from './types'

import { props } from './props'

export default defineComponent({
  name: 'WButton',

  props,

  emits: ['click'],

  setup(props: WButtonProps, { attrs, slots, emit, expose }) {
    const { t } = useAppI18n()

    const userPermission = useAppStoreUserPermission()

    const disabled = ref(false)

    const buttonText = ref('')

    const getDisabled = computed(
      () => disabled.value || (props.disabled ?? attrs.disabled),
    )

    const getTextProp = computed(() => {
      if (typeof props.textProp === 'string')
        return props.textProp
      return props.textProp!()
    })

    const buttonSlots = computed(() => {
      const def: {
        default?: Fn
        icon?: Fn
      } = {
        default: () => slots.default?.(),
      }

      props.icon && (def.icon = () => <w-icon icon={props.icon}></w-icon>)

      getTextProp.value
      && (def.default = () => [<span>{getTextProp.value}</span>])

      buttonText.value
      && (def.default = () => [<span>{buttonText.value}</span>])

      return def
    })

    const onRetry = () => {
      const retryDelay = ref(props.retry)

      disabled.value = true

      const intervalId = setInterval(() => {
        buttonText.value = t('comp.button.retry', {
          retryDelay: retryDelay.value,
        })

        --retryDelay.value!

        if (retryDelay.value! < 0) {
          retryDelay.value = props.retry!
          buttonText.value = (getTextProp.value
          ?? slots.default?.()) as string
          disabled.value = false

          clearInterval(intervalId)
        }
      }, 1000)
    }

    const onClick = (event: MouseEvent) => {
      emit('click', event)

      if (props.retry && !props.manualRetry)
        onRetry()
    }

    expose({
      onStartCountdown: () => onRetry(),
    })

    const renderButton = () =>
      props.iconButton
        ? (
            <n-tooltip placement="bottom">
              {{
                trigger: () => (
                  <w-a-icon
                    onClick={
                      props.confirm
                        ? (e: MouseEvent) => {
                            e.stopPropagation()
                          }
                        : onClick
                    }
                    icon={props.icon}
                    height={attrs.height ?? '20'}
                    class="cursor-pointer"
                    type={attrs.type}
                  >
                  </w-a-icon>
                ),
                default: () => getTextProp.value,
              }}
            </n-tooltip>
          )
        : (
            <n-button
              onClick={
                props.confirm
                  ? undefined
                  : props.debounce
                    ? useDebounceFn(onClick, props.debounce)
                    : onClick
              }
              disabled={unref(getDisabled)}
            >
              {unref(buttonSlots)}
            </n-button>
          )

    const renderConfirm = () =>
      props.confirm
        ? (
            <n-popconfirm onPositiveClick={onClick}>
              {{
                default: () => t('app.base.confirm'),
                trigger: () => renderButton(),
              }}
            </n-popconfirm>
          )
        : (
            renderButton()
          )

    return () => userPermission.hasPermission(props.auth) && renderConfirm()
  },
})
</script>
