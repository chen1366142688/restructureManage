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
  shakingedRouter: [],
  isShowExportBtn: false, // 是否显示数据档案-历史数据-上报学生导入、按学生生成的按钮
  listPagePars: new Map() //存储每个路由对应的搜索条件进行筛选项的回显
}