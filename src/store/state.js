import { routers } from '@/router/router';
export default {
  loginAgain: false,//是否重新登录
  active: {
    name: '', //左侧菜单选中
    parentCode: '',//顶部菜单选中
    parentName: '' // 用于子菜单展开
  },
  user: {}, //当前用户
  permissions: [], // 每个用户的所有权限
  routers,
  shakingedRouter:[]
}