export const useAppTextSelection = () => {
  const state = useTextSelection()

  watchEffect(() => {
    console.log(state.text.value)
  })
}
