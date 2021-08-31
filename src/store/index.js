import Vue from 'vue'
import Vuex from 'vuex'
import socket from '../socket'

Vue.use(Vuex)

const state = {
  nickname: '',
  nicknames: [],
  holder: '',
  lines: []
}

const mutations = {
  updateNickname (state, nickname) {
    state.nickname = nickname || ''
  },
  updateNicknames (state, nicknames) {
    state.nicknames = nicknames || []
  },
  updateHolder (state, holder) {
    state.holder = holder || ''
  },
  updateLines (state, lines) {
    state.lines = lines || []
  }
}

const actions = {
  //确认昵称是否占用
  checkUserExist(context, nickname) {
    return new Promise((resolve, reject) => {
      socket.emit('check_user_exist', nickname, isExist => {
        resolve(isExist)
      })
    })
  },

  //发消息
  sendUserEnter(context) {
    const nickname = localStorage.getItem('nickname')
    socket.emit('enter', nickname)
    context.commit('updateNickname', nickname)
  }

}

const getters = {}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
