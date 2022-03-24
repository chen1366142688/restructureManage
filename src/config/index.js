import ENV_CONFIG from '../../build/config'
import dev from '../../build/dev.env'
import pro from '../../build/pro.env'

const Config = {
  baseURL: ENV_CONFIG === 'dev' ? dev.BASE_URL : pro.BASE_URL,
  stagnateTime: 1 * 60 * 60 * 1000, // 无操作停滞时间  默认1小时
  openAutoJumpOut: true, // 是否开启无操作跳出
  notLoginRoute: ['login'], // 无需登录即可访问的路由 name,
  sideBarLevel: 3, // 侧边栏层级限制, 3表示三级, 可设置 2 和 3
  showSidebarSearch: true, // 默认打开侧边栏搜索
  defaultRoute: '/about', // 默认打开的路由
  useFrontEndErrorMsg: false, // 默认采用后端返回异常
  secretKey: '355b61ed8d0648fa56E39A1658CA0C4FFF62B0425C0FD16055A21676',
  appKey: '355b61ed8d0648fa',
  answerUrl: 'https://html-test.tanmasports.com/page/',//答题系统测试环境--正式环境去掉-test
  zhURL: 'https://zhschool.tanmasports.com'//珠海
}

export default Config
