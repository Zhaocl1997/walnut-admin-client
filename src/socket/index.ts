import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

/**
 * @description socket
 */
class SocketService {
  private static instance: SocketService
  private _socket: Socket | null = null

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService()
    }
    return SocketService.instance
  }

  public init(): void {
    if (this._socket) {
      console.info('Socket', 'Already initialized')
      return
    }

    const { ws } = useAppEnv('proxy')
    const useProxy = +ws[0] === 1
    const url = useProxy ? `/${ws[4]}` : `${ws[2]}/${ws[4]}`
    const path = useProxy ? ws[1] : ws[3]

    this._socket = io(url, {
      path,
      query: { fingerprint: fpId.value },
    })

    this._socket.on('connect', () => {
      // turbo-console-disable-next-line
      console.info('Socket', 'Socket connected.')
    })

    this._socket.on('error', (e) => {
      console.error('Socket', e)
    })

    this._socket.on(AppSocketEvents.FORCE_QUIT(), async () => {
      const userAuth = useAppStoreUserAuth()
      await userAuth.Signout()
    })

    // turbo-console-disable-next-line
    console.info('Socket', 'Socket initialized successfully')
  }

  public get socket(): Socket {
    if (!this._socket) {
      throw new Error('Socket not initialized. Call init() first.')
    }
    return this._socket
  }

  public destroy(): void {
    if (this._socket) {
      this._socket.disconnect()
      this._socket = null
      console.info('Socket', 'Socket disconnected.')
    }
  }
}

const socketService = SocketService.getInstance()

export function setupSocket() {
  socketService.init()
}

export const AppSocket = () => socketService.socket
