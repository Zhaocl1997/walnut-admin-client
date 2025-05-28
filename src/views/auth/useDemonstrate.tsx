export function useDemonstrate() {
  const naiveStore = useAppStoreNaive()
  const signInRef = useTemplateRef<{ setFormData: (n: string, p: string) => void }>('signInRef')

  const onClick = () => {
    signInRef.value?.setFormData('visitor', '2020')
  }

  useAppNotiInfo('', {
    duration: 60000,
    title: 'Demonstrate only',
    keepAliveOnHover: true,
    content: () => {
      return (
        <n-space vertical size="small">
          <div>Account: visitor</div>
          <div>Password: 2020</div>
          <n-button size="small" type="info" onClick={onClick}>
            Fill the form
          </n-button>
        </n-space>
      )
    },
  })

  tryOnUnmounted(() => {
    naiveStore.destroyCurrentNotiInst()
  })

  return { signInRef }
}
