import * as types from './mutation-types'
import { removeToken } from '../libs/token'
import { removeUserInfo } from '../libs/userInfo'
import { router } from '@/router/index';


export default {
  setUserAndState({ commit }, user) {
    // 设置全局用户状态
    commit(types.SET_USER, user)
  },
  setHistoryActive({ commit }, active) {
    commit(types.SET_HISTORY_ACTIVE, active)
  },
  setShakingedRouter({ commit }) {
    commit(types.SET_TOP_MENU)
  },
  setLoginStatus({ commit }, status) {
    commit(types.SET_LOGIN_STATUS, status)
  },
  loginOut({ commit }) { 
    removeToken()
    removeUserInfo()
    router.push({
      name: "login"
    })
  }
}