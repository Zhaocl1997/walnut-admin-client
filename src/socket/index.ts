import { io } from 'socket.io-client'

// five params in config
// fourth is custom socket path => https://socket.io/docs/v4/client-options/#path
// fifth is custom socket namespace => https://socket.io/docs/v4/namespaces/
const { ws } = useAppEnv('proxy')

const useProxy = +ws[0] === 1

// use proxy,
const url = useProxy ? `/${ws[4]}` : `${ws[2]}/${ws[4]}`
const path = useProxy ? ws[1] : ws[3]

console.log(url, path)

export const AppSocket = io(url, {
  path,
})

AppSocket.on('connect', () => {
  AppLog('Socket connected.')
})

AppSocket.on('error', (e) => {
  console.log(e)
})

AppSocket.on('ping', () => {
  console.log('socket ping')
})

AppSocket.on('onMessage', (data) => {
  console.log(data)
})
