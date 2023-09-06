const isReducedMotion = useSharedPreferredReducedMotion()

const useSharedDark = createSharedComposable(() => {
  return useDark({
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: AppConstPersistKey.DARK_MODE,
    disableTransition: isReducedMotion.value,
  })
})

export const isDark = useSharedDark()

// https://github.com/unocss/unocss/blob/ac1253b910fb0f0f09ace3733c972c09659ddf0f/playground/src/composables/dark.ts
export function toggleDark(e: MouseEvent) {
  // @ts-expect-error: Transition API
  const isAppearanceTransition = document.startViewTransition && !isReducedMotion.value

  if (!isAppearanceTransition || !e) {
    isDark.value = !isDark.value
    return
  }

  // @ts-expect-error: Transition API
  const transition = document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  })

  const x = e.clientX
  const y = e.clientY

  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: isDark.value
          ? [...clipPath].reverse()
          : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-out',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}
