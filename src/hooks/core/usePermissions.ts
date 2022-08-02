export const usePermissions = () => {
  const userPermission = useAppStoreUserPermission()

  const hasPermission = (p?: string) => {
    if (!p) return true
    return userPermission.permissions.includes(p)
  }

  return {
    permissions: userPermission.permissions,
    hasPermission,
  }
}
