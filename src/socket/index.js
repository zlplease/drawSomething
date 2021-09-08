import io from 'socket.io-client'
import store from '@/store'
import { MessageBox, Notification } from 'element-ui'

const socket = io()

socket.on('connect', () => {
  console.log('连接成功')
})

socket.on('room_info', ({ nicknames, holder, lines }) => {
  console.log(nicknames, holder, lines)
  store.commit('updateNicknames', nicknames)
  store.commit('updateHolder', holder)
  store.commit('updateLines', lines)
})

socket.on('user_enter', nickname => {
  store.commit('addToNicknames', nickname)
})

socket.on('connect', () => {
  store.commit('updateConnected', true)
})

socket.on('disconnect', () => {
  store.commit('updateConnected', false)
})

socket.on('game_started', holder => {
  store.commit('updateHolder', holder)
  Notification.success(`${holder} 作为主持人开始了新游戏，大家可以开始踊跃猜答案啦！`)
})

socket.on('already_started', holder => {
  store.commit('updateHolder', holder)
  MessageBox.alert('当前已有游戏在进行中，主持人是：' + holder)
})

socket.on('game_stoped', () => {
  store.commit('updateHolder', '')
  store.commit('updateLines', [])

  Notification.warning('主持人终止了当前的游戏')
})

socket.on('starting_line', line => {
  store.commit('drawNewLine', line)
})

socket.on('updating_line', line => {
  store.commit('updateNewLine', line)
})

socket.on('game_answered', ({ alreadyDone, success, nickname, answer }) => {
  if (alreadyDone) {
    MessageBox.alert('当前答案已经被人猜中啦')
    return
  }

  if (!success) {
    Notification.error(`玩家 ${nickname}猜错了！ ${answer}`)
    return
  }

  MessageBox.alert(`玩家 ${nickname}猜中了正确答案：${answer}`)
})

socket.on('user_leave', nickname => {
  store.commit('delFromNicknames', nickname)
  if (nickname === store.state.holder) {
    store.commit('updateHolder', '')
    store.commit('updateLines',[])
    Notification.error('主持人离开了游戏！')
  }
})

export default socket