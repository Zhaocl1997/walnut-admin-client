import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

export let AppSocket: Nullable<Socket> = null

export function setupSocket() {
  // five params in config
  // fourth is custom socket path => https://socket.io/docs/v4/client-options/#path
  // fifth is custom socket namespace => https://socket.io/docs/v4/namespaces/
  const { ws } = useAppEnv('proxy')

  const useProxy = +ws[0] === 1

  // use proxy,
  const url = useProxy ? `/${ws[4]}` : `${ws[2]}/${ws[4]}`
  const path = useProxy ? ws[1] : ws[3]

  AppSocket = io(url, {
    path,
    query: { fingerprint: fpId.value },
  })

  AppSocket.on('connect', () => {
    console.info('Socket', 'Socket connected.')
  })

  AppSocket.on('error', (e) => {
    console.error('Socket', e)
  })

  // listen to force quit event, which could be excuted by admin
  AppSocket.on(AppSocketEvents.FORCE_QUIT, async (fingerprint) => {
    const userAuth = useAppStoreUserAuth()

    await userAuth.Signout(true, fingerprint)
  })
}
