export function WithCapLockToolTip() {
  const { t } = useAppI18n()

  const tooltipShow = ref(false)
  const isFocus = ref(false)
  const capsLockState = useKeyModifier('CapsLock')

  function onShowTooltip() {
    if (!isFocus.value)
      return

    if (capsLockState.value)
      tooltipShow.value = true
    else
      tooltipShow.value = false
  }

  watchEffect(onShowTooltip)

  function onTargetFocus() {
    isFocus.value = true
  }

  function onTargetBlur() {
    isFocus.value = false
    tooltipShow.value = false
  }

  const WithCapLockWrapper = defineComponent({
    name: 'WithCapLockToolTip',

    inheritAttrs: false,

    setup(props, ctx) {
      console.log(123)

      return () => (
        <n-tooltip v-model={[tooltipShow.value, 'show']} trigger="manual" placement="right">
          {{
            default: () => t('comp.password.capslock'),
            trigger: () => ctx.slots.default!(),
          }}
        </n-tooltip>
      )
    },
  })

  return { onTargetFocus, onTargetBlur, WithCapLockWrapper }
}
