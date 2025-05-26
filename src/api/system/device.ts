import { BaseAPI } from '../base'

export const deviceAPI = new BaseAPI<AppSystemDictType>({
  model: 'system',
  section: 'device',
})

/**
 * @description initial device
 */
export async function initialDevice() {
  return AppAxios.post<{ deviceId: string }>({
    url: '/system/device/initial',
    data: {
      rawDeviceId: fpId.value,
      deviceName: `${detectDeviceType()}_${fpId.value.slice(0, 6)}`.toLocaleUpperCase(),
      sr: {
        width: window.screen.width,
        height: window.screen.height,
      },
      vp: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      hardwareInfo: {
        cpuCores: getCPUCoreCount(),
        memory: getMemoryGB(),
        gpu: await getGPUArchitecture(),
      },
      ipHistory: [GeoIPInfo.value.ip],
      geoLocation: {
        type: 'Point',
        coordinates: [GeoIPInfo.value.longitude, GeoIPInfo.value.latitude],
      },
      deviceInfo: {
        // @ts-expect-error https://developer.mozilla.org/zh-CN/docs/Web/API/NetworkInformation/effectiveType
        netType: navigator.connection.effectiveType,
        platform: navigator.platform,
        isp: GeoIPInfo.value.isp,
      },
      locationInfo: {
        country: GeoIPInfo.value.country,
        city: GeoIPInfo.value.city,
        region: GeoIPInfo.value.region,
      },
    } as AppSystemDevice,
  })
}
