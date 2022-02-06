export const useAppTextSelection = () => {
  const state = useTextSelection()

  watchEffect(() => {
    console.log(state.value.text)
  })
}
