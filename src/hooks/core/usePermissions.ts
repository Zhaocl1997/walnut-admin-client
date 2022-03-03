export const usePermissions = () => {
  const { menu } = useAppState()

  const hasPermission = (p?: string) => {
    if (!p) return true
    return menu.value.permissions.includes(p)
  }

  return {
    permissions: menu.value.permissions,
    hasPermission,
  }
}
