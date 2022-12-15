export const useSharedColorMode = createSharedComposable(() => {
  const modes = Object.fromEntries(
    Object.values(AppConstColorMode).map(i => [i, i]),
  )

  return useColorMode({
    modes,
    attribute: 'color-mode',
  })
})
