export const useAppSecretKeys = createGlobalState<Ref<AppSecretKeysInterface>>(
  () => ref({})
)
