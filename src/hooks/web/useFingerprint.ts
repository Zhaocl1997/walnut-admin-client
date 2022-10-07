import { setFP } from '@/api/auth/fingerprint'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

// Initialize an agent at application startup.
const fpPromise = FingerprintJS.load({ monitoring: false })

export const fpId = useAppStorage(AppConstPersistKey.FP_ID, '')

export const useFingerprint = () => {
  ;(async () => {
    // Get the visitor identifier when you need it.
    const fp = await fpPromise
    const result = await fp.get()
    fpId.value = result.visitorId

    await setFP()
  })()
}
