interface IServerInfo {
  cpu: {
    total: number
    usage: number
    free: number
    model: string
  }

  memory: {
    totalMemMb: number
    usedMemMb: number
    freeMemMb: number
    usedMemPercentage: number
    freeMemPercentage: number
  }

  os: {
    platform: string
    uptime: string
    ip: string
    hostname: string
    type: string
    arch: string
    version: string
  }
}

/**
 * @description get server information
 */
export const getAppMonitorServerInfo = () => {
  return AppAxios.get<IServerInfo>({
    url: '/app/monitor/server',
  })
}
