const { menu } = useAppState()

/**
 * @description Action - Menu - Reset
 */
export const menuActionReset = () => {
  menu.value.menus.length = 0
  menu.value.keepAliveRouteNames.length = 0
  menu.value.indexMenuName = ''
  menu.value.permissions.length = 0
}
