const reducedMotion = usePreferredReducedMotion()

export const _APP_CAN_SYSTEM_ANIMATE_ = computed(
  () => reducedMotion.value === 'no-preference'
)
