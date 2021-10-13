<script lang="tsx">
  import type { WButtonProps } from './types'
  import { computed, defineComponent, unref, ref } from 'vue'

  import { useDebounceFn } from '@vueuse/core'
  import { useI18n } from '/@/locales'

  import { props } from './props'

  export default defineComponent({
    name: 'WButton',

    props,

    emits: ['click'],

    setup(props: WButtonProps, { attrs, slots, emit, expose }) {
      const { t } = useI18n()

      const disabled = ref(false)

      const buttonText = ref('')

      const getDisabled = computed(() => disabled.value || props.disabled)

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
            buttonText.value = t('component.base.button.retry', {
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

      return () => (
        <n-button
          onClick={
            props.debounce ? useDebounceFn(onClick, props.debounce) : onClick
          }
          disabled={unref(getDisabled)}
        >
          {unref(buttonSlots)}
        </n-button>
      )
    },
  })
</script>
