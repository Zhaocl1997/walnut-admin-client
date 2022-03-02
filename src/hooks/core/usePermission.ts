export const usePermission = () => {
  const { menu } = useAppState()

  const hasPermission = (p: string) => menu.value.permissions.includes(p)

  return {
    permissions: menu.value.permissions,
    hasPermission,
  }
}
