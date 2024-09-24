export function WithCapLockToolTip(lock: Ref<boolean>) {
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

    setup(_, ctx) {
      const [DefineTemplate, ReuseTemplate] = createReusableTemplate()

      return () => (
        <>
          <DefineTemplate>{{ default: () => ctx.slots.default!() }}</DefineTemplate>
          {lock.value
            ? (
                <n-tooltip v-model={[tooltipShow.value, 'show']} trigger="manual" placement="right">
                  {{
                    default: () => t('comp.password.capslock'),
                    trigger: () => <ReuseTemplate></ReuseTemplate>,
                  }}
                </n-tooltip>
              )
            : <ReuseTemplate></ReuseTemplate>}
        </>
      )
    },
  })

  return { WithCapLockWrapper, onTargetFocus, onTargetBlur }
}
