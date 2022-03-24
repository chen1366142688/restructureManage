import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import state from './state'
import mutations from './mutations'
import * as getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  reducer: stateData => ({
    // eslint-disable-line
    user: stateData.user,
    permissions: stateData.permissions,
    routers: stateData.routers,
    shakingedRouter: stateData.shakingedRouter,
    loginAgain: stateData.loginAgain,
    active: stateData.active
  }),
})


export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [vuexLocal.plugin],
})
