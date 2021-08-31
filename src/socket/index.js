import io from 'socket.io-client'
import store from '@/store'

const socket = io()

socket.on('connect', () => {
  console.log('连接成功')
})

socket.on('room_info', ({ nicknames, holder, lines }) => {
  console.log(nicknames, holder, lines)
  store.commit('updateNicknames', nicknames)
  //store.commit('updateHolder', holder)
  //store.commit('updateLines', lines)
})

export default socket
