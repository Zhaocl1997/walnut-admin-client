export const useAppHijackF5 = () => {
  useEventListener('keydown', async (e) => {
    if (e.key === 'F5') {
      e.preventDefault()
      await useRedirect()
    }
  })
}
