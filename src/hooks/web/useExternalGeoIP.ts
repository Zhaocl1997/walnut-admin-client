import axios from 'axios'
import { isEmpty } from 'lodash-es'

export const GeoIPInfo = useAppStorage<Partial<ExternalGeoIPInfo>>(AppConstPersistKey.GEO_IP_INFO, {}, { usePresetKey: false, expire: Number.POSITIVE_INFINITY })

export async function useExternalGeoIP() {
  if (!isEmpty(GeoIPInfo.value))
    return

  const res = await axios.get<ExternalGeoIPInfo>(EXTERNAL_LINKS.GEOIP)

  if (res.status === 200)
    GeoIPInfo.value = res.data
}
