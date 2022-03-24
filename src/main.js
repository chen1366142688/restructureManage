import Vue from 'vue';
import iView from 'iview';
import store from './store';
import { router } from './router/index';

import App from './app.vue';
import echarts from 'echarts';
import 'iview/dist/styles/iview.css';
import '../theme/index.less';
import './styles/common.less';
import '@/plugins'

Vue.use(iView);
Vue.prototype.$echarts = echarts;
Vue.prototype.$tableScroll = (table) => {
    table.$refs.body.scrollTop = 0;
    table.$refs.body.scrollLeft = 0;
};
Vue.prototype.$Message.config({
    top: 400,
    duration: 2
});
Vue.prototype.$catgoryParams = (param) => {
    param = param + '';
    if (param === 'undefined' || param === 'null' || param === 'NaN' || param === '99' || param === '999' || param === '999' || param === '9999') {
        return '';
    } else {
        return param;
    }
};
const AppInstance = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

// 设置 App 实例
window.App = AppInstance
