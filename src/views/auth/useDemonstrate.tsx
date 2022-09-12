export const useDemonstrate = () => {
  const signInRef = ref<{ setFormData: (n: string, p: string) => {} }>()

  const onClick = () => {
    signInRef.value?.setFormData('visitor', '2020')
  }

  useAppNotiInfo('', {
    closable: false,
    duration: 5000,
    title: 'Demonstrate only',
    keepAliveOnHover: true,
    placement: 'top-left',
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

  return { signInRef }
}
