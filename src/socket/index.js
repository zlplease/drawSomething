import io from 'socket.io-client'

const socket = io()

socket.on('connect', () => {
  console.log('连接成功')
})

export default socket
