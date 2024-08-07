export namespace IServerInfo {
  export interface CPU {
    cores: number
    brand: string
    speed: number
    manufacturer: string
  }

  export interface Mem {
    total: number
    free: number
    used: number
    avaiable: number
  }

  export interface OS {
    hostname: string
    arch: string
    platform: string
    distro: string
  }

  export interface System {
    manufacturer: string
    model: string
    version: string
    uuid: string
  }

  export interface Disk {
    name: string
    size: number
    device: string
    type: string
  }

  export interface Battery {
    voltage: number
    designedCapacity: number
    currentCapacity: number
    percent: number
  }

  export interface Time {
    current: number
    uptime: number
    timezone: string
    timezoneName: string
  }

  export interface Network {
    iface: string
    ip4: string
    mac: string
    netSpeed: string
  }
}

export function getCpuInfo() {
  return AppAxios.get<IServerInfo.CPU>({
    url: '/app/monitor/server/cpu',
  })
}

export function getMemInfo() {
  return AppAxios.get<IServerInfo.Mem>({
    url: '/app/monitor/server/mem',
  })
}

export function getOSInfo() {
  return AppAxios.get<IServerInfo.OS>({
    url: '/app/monitor/server/os',
  })
}

export function getSysInfo(scopePermission?: string) {
  return AppAxios.get<IServerInfo.System>(
    {
      url: '/app/monitor/server/sys',
      _scoped_permission: scopePermission,
    },
  )
}

export function getDiskInfo() {
  return AppAxios.get<IServerInfo.Disk[]>({
    url: '/app/monitor/server/disk',
  })
}

export function getBatteryInfo() {
  return AppAxios.get<IServerInfo.Battery>({
    url: '/app/monitor/server/battery',
  })
}

export function getTimeInfo() {
  return AppAxios.get<IServerInfo.Time>({
    url: '/app/monitor/server/time',
  })
}

export function getNetworkInfo(scopePermission?: string) {
  return AppAxios.get<IServerInfo.Network>(
    {
      url: '/app/monitor/server/network',
      _scoped_permission: scopePermission,
    },
  )
}
