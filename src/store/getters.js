import Vue from 'vue'
import Util from '@/libs/util'

export const user = state => state.user

export const active = state => state.active

export const loginAgain = state => state.loginAgain

export const shakingedRouter = state => { 
  return catgoryTopMenu(state.shakingedRouter)
}
function catgoryTopMenu(list) {
  const topMenuRouter = [...list]
  const creatTopMenu = topMenuRouter.map(topRouterItem => { 
    let json = {};
    json.parentCode = topRouterItem.parentCode
    json.parentName = topRouterItem.parentName
    json.name = topRouterItem.name
    json.parentIcon = topRouterItem.parentIcon
    return json;
  })
  return uniqueRouter(creatTopMenu, 'parentCode');
}
function uniqueRouter(person, key) {
  const teamObj = {};
  const fliteredRouter = person.reduce((cur, next) => {
    teamObj[next[key]]
      ? ""
      : (teamObj[next[key]] = true && cur.push(next));
    return cur;
  }, []);
  return fliteredRouter;
}
    
    
// 获取有权限的舞台配置
export const permissionStageConfig = state => {
  const { routers, permissions } = state // eslint-disable-line
  const tempStageConfig = Util.deepClone(routers)
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

// 获取菜单配置
export const sideBarList = (state, getter) => {
  const { permissionStageConfig } = getter // eslint-disable-line
  function deepGetSideBar(target, level = 3) {
    // 集合节点处理
    if (Array.isArray(target)) {
      const acc = target.map(item => deepGetSideBar(item, level - 1))
      return acc.filter(item => item !== null)
    }

    // 检测是否需要在导航中显示
    if (!target.inNav) {
      return null
    }

    if (target.type === 'folder' && level !== 0) {
      // 处理 folder 模式
      const sideConfig = {}
      sideConfig.name = target.name
      sideConfig.title = target.title
      sideConfig.icon = target.icon
      sideConfig.path = target.route || Util.getRandomStr(6)
      sideConfig.children = target.children.map(item => deepGetSideBar(item, level - 1))
      sideConfig.children = sideConfig.children.filter(item => item !== null)
      return sideConfig
    }

    // 处理一级就是 view 的情况
    if (target.type === 'view') {
      const sideConfig = {}
      sideConfig.name = target.name
      sideConfig.title = target.title
      sideConfig.icon = target.icon
      sideConfig.path = target.route
      return sideConfig
    }

    // 处理 appTab 情况
    if (target.type === 'tab') {
      const sideConfig = {}
      sideConfig.name = target.name
      sideConfig.title = target.title
      sideConfig.icon = target.icon
      sideConfig.path = target.route
      // 如果 Tab 没有设置默认打开的路由, 则设置为第一个子节点路由
      if (!sideConfig.path) {
        if (target.children && target.children.length > 0 && target.children[0].route) {
          sideConfig.path = target.children[0].route
        }
      }
      return sideConfig
    }
    // 最后一层, 都当做子节点处理
    if (level <= 0) {
      const sideConfig = {}
      sideConfig.name = target.name
      sideConfig.title = target.title
      sideConfig.icon = target.icon
      sideConfig.path = Util.getRandomStr(6)
      if (target.children && target.children.length > 0 && target.children[0].route) {
        sideConfig.path = target.children[0].route
      }
      return sideConfig
    }
    return null
  }
  //路由定制化配置，后期再接入
  // const sideBar = deepGetSideBar(permissionStageConfig, sideBarLevel)
  if (permissionStageConfig.length <= 0) {
    // Vue.prototype.$Message.info('未找到可用的权限菜单，请检查权限配置')
    throw new Error('未找到可用的权限菜单，请检查权限配置')
  }
  return sideBar
}


//获取当前选中项左侧菜单 
export const sideLeftBarList = (state, getter) => { 
  const { active } = state // eslint-disable-line
  const { permissionStageConfig } = getter // eslint-disable-line
  const sideLeftBarList = permissionStageConfig.filter(val => val.parentCode === active.parentCode)
  return sideLeftBarList
}

