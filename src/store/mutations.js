import * as types from './mutation-types'
import Util from '@/libs/util'

export default {
  [types.SET_USER](state, payload) {
    state.user = payload
  },

  [types.SET_LOGIN_STATUS](state, status) {
    state.loginAgain = status
  },

  [types.SET_USER_PERMISSIONS](state, permissions) {
    state.permissions = permissions
  },
  [types.SET_HISTORY_ACTIVE](state, active) {
    state.active = active
  },
  [types.SET_TOP_MENU](state) {
    const permissionStageConfig = state => {
      const { routers, permissions } = state // eslint-disable-line
      console.log('routersroutersroutersroutersrouters',state)
      const tempStageConfig = Util.deepClone(routers)
      console.log('tempStageConfig',tempStageConfig)
      const shookConfig = permissionShaking(tempStageConfig, permissions)
      return shookConfig
    }
    function permissionShaking(stageConfig, permissions) {
      const stageConfigClone = JSON.parse(JSON.stringify(stageConfig))
      const menuMainConfig = menuTreeShaking(stageConfigClone, permissions)
      menuMainConfig.forEach(menuItem => { 
        if (menuItem.children) { 
          menuItem.children = menuTreeShaking(menuItem.children, permissions);
        }
      })
      return menuMainConfig;
    }
    
    //筛选没有权限的节点
    function menuTreeShaking(stageConfig, permissions) { 
      const stageConfigClone = JSON.parse(JSON.stringify(stageConfig));
      const menuItemShaking = (stageConfig) => { 
        for (let i = 0; i < stageConfig.length; i++) { 
          if (permissions.indexOf(stageConfig[i].name) === -1) {
            stageConfig.splice(i, 1);
            menuItemShaking(stageConfig, permissions);
            break;
          }
        }
      }
      menuItemShaking(stageConfigClone)
      return stageConfigClone
    }
    const sideBarList = (state) => {
      const sideBar = permissionStageConfig(state)
      if (sideBar.length <= 0) {
        Vue.prototype.$Message.info('未找到可用的权限菜单，请检查权限配置')
        throw Error('未找到可用的权限菜单，请检查权限配置')
      }
      const [first] = sideBar
      const { name, children, parentCode} = first
      const [firstChild] = children
      console.log('firstChild',firstChild)
      state.active = {parentName: name, parentCode:parentCode, name: firstChild.name}
      return sideBar
    }
    state.shakingedRouter = sideBarList(state)
  },
}
