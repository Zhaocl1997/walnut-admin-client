import { setFP } from '@/api/auth/fingerprint'
import FingerprintJS, { UnknownComponents } from '@fingerprintjs/fingerprintjs'

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load({ monitoring: false })

export const fpId = useAppStorage(AppConstPersistKey.FP_ID, '')

export const useFingerprint = async () => {
  if (fpId.value) return

  const userProfile = useAppStoreUserProfile()

  // Get the visitor identifier when you need it.
  const fp = await fpPromise
  const result = await fp.get()

  const components: UnknownComponents = {
    ...result.components,
    ua: { value: window.navigator.userAgent, duration: Infinity },
    ip: { value: userProfile.ip, duration: Infinity },
    cityName: { value: userProfile.cityName, duration: Infinity },
  }

  const visiterId = FingerprintJS.hashComponents(components)

  fpId.value = visiterId

  await setFP()
}
