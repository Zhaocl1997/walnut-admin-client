const documentVisibility = useDocumentVisibility()

export const _APP_DOCUMENT_VISIBLE_ = computed(
  () => documentVisibility.value === 'visible'
)
