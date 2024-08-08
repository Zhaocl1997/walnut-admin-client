export function useAppTextSelection() {
  const state = useTextSelection()

  watchEffect(() => {
    console.log(state.text.value)
  })
}
