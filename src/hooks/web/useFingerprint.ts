import type { UnknownComponents } from '@fingerprintjs/fingerprintjs'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load({ monitoring: false })

export const fpId = useAppStorage(AppConstPersistKey.FP_ID, '')

export const useFingerprint = async () => {
  if (fpId.value)
    return

  const userProfile = useAppStoreUserProfile()

  // Get the visitor identifier when you need it.
  const fp = await fpPromise
  const result = await fp.get()

  const components: UnknownComponents = {
    ...result.components,
    ua: { value: window.navigator.userAgent, duration: Infinity },
    ip: { value: userProfile.info.ip, duration: Infinity },
    country: { value: userProfile.info.country, duration: Infinity },
    province: { value: userProfile.info.province, duration: Infinity },
    city: { value: userProfile.info.city, duration: Infinity },
    area: { value: userProfile.info.area, duration: Infinity },
  }

  const visiterId = FingerprintJS.hashComponents(components)

  fpId.value = visiterId
}
