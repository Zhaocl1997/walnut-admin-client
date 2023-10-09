import type { UnknownComponents } from '@fingerprintjs/fingerprintjs'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

// Initialize an agent at application startup.
export const fpId = useAppStorage(AppConstPersistKey.FP_ID, '', { usePresetKey: false, expire: Number.POSITIVE_INFINITY })

export async function useFingerprint() {
  if (fpId.value)
    return

  const fpPromise = FingerprintJS.load({ monitoring: false })

  // Get the visitor identifier when you need it.
  const fp = await fpPromise
  const result = await fp.get()

  // you can add your custom components here
  const components: UnknownComponents = {
    ...result.components,
  }

  const visiterId = FingerprintJS.hashComponents(components)

  fpId.value = visiterId
}
