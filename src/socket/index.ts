import { io } from 'socket.io-client'

export const socket = io(import.meta.env.VITE_API_TARGET)

socket.on('connect', () => {
  AppLog('Socket connected.')
})

socket.on('onMessage', (data) => {
  console.log(data)
})
