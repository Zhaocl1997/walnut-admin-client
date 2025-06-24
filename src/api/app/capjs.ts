const { httpUrl } = useAppEnvProxy()

export const authCapApiEndpoint = `${httpUrl}/auth/cap/`

const authCap = {
  USERNAME: '/auth/cap/need/userName',
} as const

/**
 * @description get need to implement capjs component to validate bot
 */
export function getNeedCapByUserName(userName: string) {
  return AppAxios.get<boolean>({
    url: authCap.USERNAME,
    params: { userName },
  })
}
