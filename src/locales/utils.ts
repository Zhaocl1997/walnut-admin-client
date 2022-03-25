export const getLocaleMessageStartsWith = (startStr: string) => {
  const { getLocaleMessage, locale } = useAppI18n()

  // get key starts with input `startStr`
  const getMessages = computed(() =>
    Object.entries<string>(getLocaleMessage(locale.value))
      .map(([k, v]) => {
        if (k.startsWith(startStr)) {
          return { value: k, label: v }
        }
        return { value: undefined, label: undefined }
      })
      .filter((i) => i.value)
  )

  return getMessages
}
