import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import {routers} from './router';
Vue.use(VueRouter);
const RouterConfig = {
    routes: routers
};
export const router = new VueRouter(RouterConfig);
// 路由拦截
router.beforeEach((to, from, next) => {
  if (from.name) { 
    sessionStorage.setItem('fromName', from.name);
  }
  //课堂监控数据页面切换路由则清空滚动数据
  if (to.name !== 'classMonitoringData' && to.name !== 'classMonitoringStudentDetail') {
    sessionStorage.setItem('classMonitoringData-classMonitoringStudentDetail-scrollIndex', 0);
  }
  iView.LoadingBar.start();
  next();
});

router.afterEach((to) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});
