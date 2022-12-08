const modes = Object.fromEntries(
  Object.values(AppConstColorMode).map((i) => [i, i])
)

export const _APP_COLOR_MODE_ = useColorMode({
  modes,
  attribute: 'color-mode',
})
