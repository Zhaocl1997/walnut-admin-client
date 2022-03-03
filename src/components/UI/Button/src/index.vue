<script lang="tsx">
  import type { WButtonProps } from './types'

  import { props } from './props'

  export default defineComponent({
    name: 'WButton',

    props,

    emits: ['click'],

    setup(props: WButtonProps, { attrs, slots, emit, expose }) {
      const { t } = useAppI18n()

      const { hasPermission } = usePermissions()

      const disabled = ref(false)

      const buttonText = ref('')

      const getDisabled = computed(
        () => disabled.value || (props.disabled ?? attrs.disabled)
      )

      const buttonSlots = computed(() => {
        const def: {
          default?: Fn
          icon?: Fn
        } = {
          default: () => slots.default?.(),
        }

        props.icon && (def.icon = () => <w-icon icon={props.icon}></w-icon>)

        props.textProp && (def.default = () => [<div>{props.textProp}</div>])

        buttonText.value &&
          (def.default = () => [<div>{buttonText.value}</div>])

        return def
      })

      const onClick = (event: MouseEvent) => {
        const retryDelay = ref(props.retry)

        if (props.retry) {
          disabled.value = true

          const intervalId = setInterval(() => {
            buttonText.value = t('comp:button:retry', {
              retryDelay: retryDelay.value,
            })

            --retryDelay.value!

            if (retryDelay.value! < 0) {
              retryDelay.value = props.retry
              buttonText.value = (props.textProp ?? slots.default?.()) as string
              disabled.value = false

              clearInterval(intervalId)
            }
          }, 1000)
        }

        emit('click', event)
      }

      const renderButton = () =>
        props.iconButton ? (
          <n-tooltip placement="bottom">
            {{
              trigger: () => (
                <w-icon
                  onClick={props.confirm ? () => {} : onClick}
                  icon={props.icon}
                  height="24"
                  class="cursor-pointer"
                ></w-icon>
              ),
              default: () => props.textProp,
            }}
          </n-tooltip>
        ) : (
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
        props.confirm ? (
          <n-popconfirm onPositiveClick={onClick}>
            {{
              default: () => t('app:base:confirm'),
              trigger: () => renderButton(),
            }}
          </n-popconfirm>
        ) : (
          renderButton()
        )

      return () => hasPermission(props.auth) && renderConfirm()
    },
  })
</script>
