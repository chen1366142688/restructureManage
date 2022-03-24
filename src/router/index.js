import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import {routers} from './router';
import axios from 'axios';
import md5 from 'js-md5';
import store from '@/store';
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
  // 如果缓存中有左侧列表，设置选中状态
    if (sessionStorage.getItem('menuList') != null && sessionStorage.getItem('menuList') != '' && sessionStorage.getItem('menuList') != undefined) {
        const menuList = sessionStorage.getItem('menuList').split(',');
        const activeName = sessionStorage.getItem('activeName');
        let newArr = menuList.some((val, index, arr) => { return val == to.name; });
        // 如果列表中包含当前的name就设置其选中
        if (!newArr) {
            if (activeName != null && activeName != '' && activeName != undefined) {
                setTimeout(() => {
                    if (document.getElementById(activeName)) {
                        document.getElementById(activeName).parentNode.parentNode.className = 'ivu-menu-submenu ivu-menu-item-active ivu-menu-opened';
                        let elementArr = siblings(document.getElementById(activeName));
                        for (let vals of elementArr) { vals.className = 'ivu-menu-item'; }
                        setTimeout(() => {
                            document.getElementById(activeName).className = 'ivu-menu-item ivu-menu-item-active ivu-menu-item-selected';
                        }, 10);
                    }
                }, 100);
            }
        } else {
            sessionStorage.setItem('activeName', to.name);
            setTimeout(() => {
                if (document.getElementById(to.name)) {
                    document.getElementById(to.name).parentNode.parentNode.className = 'ivu-menu-submenu ivu-menu-item-active ivu-menu-opened';
                    let elementArr = siblings(document.getElementById(to.name));
                    for (let vals of elementArr) { vals.className = 'ivu-menu-item'; }
                    setTimeout(() => {
                    document.getElementById(to.name).className = 'ivu-menu-item ivu-menu-item-active ivu-menu-item-selected';
                    },10)
                }
            }, 100);
        }
    }
    iView.LoadingBar.start();
    next();
});

router.afterEach((to) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

// axios.create
axios.interceptors.response.use(
  response => {
        if (response.data.code === 30003 || response.data.code === 30005) {
            store.commit('setLoginStatus', true);
            return;
        }
        return response;
    },
    error => {
        return error;
    });

axios.interceptors.request.use(config => {
    if (config.method === 'post') {
        for (let o in config.data) {
            config.data[o] = trim(config.data[o]);
        }
    }
    let param = (config.url.split('?').length > 1) ? config.url.split('?')[1] : '';
    for (let i in param) {
        if (param[i] == undefined) {
            param[i] = '';
        }
    }
    let paramStr = '';
    let paramMap = new Map();
    let keyList = [];
    let haveParam = false;
    if (param) {
        let params =  param.split('&');
        if (params && params.length > 0) {
            for (let val of params) {
                if (val && val.length > 0) {
                    paramMap.set(val.split('=')[0], trim(val.split('=')[1]));
                    keyList.push(val.split('=')[0]);
                    haveParam = true;
                }
            }
        }
    }
    if (haveParam) {
        let keyListSort = keyList.sort();
        for (let keyItem of keyListSort) {
            if (paramMap.get(keyItem)) {
                if (paramStr) {
                    paramStr = paramStr + keyItem + paramMap.get(keyItem);
                } else {
                    paramStr = keyItem + paramMap.get(keyItem);
                }
            }
        }
    }
    paramStr = `${paramStr}355b61ed8d0648fa56E39A1658CA0C4FFF62B0425C0FD16055A21676`;
    let jsonData = JSON.stringify(config.data);
    if (config.data) { 
        paramStr = paramStr + jsonData; 
    };
    paramStr = paramStr.replace(/ /g, '').replace(/!/g, '').replace(/~/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\'/g, '');
    paramStr = md5(encodeURIComponent(paramStr)).toUpperCase();
    paramStr = paramStr + 'encodeutf8';
    config.headers['sign'] = paramStr;
    config.headers['appKey'] = '355b61ed8d0648fa';
    config.headers['token'] = sessionStorage.getItem('token');
    return config;
    }, err => {
    return Promise.resolve(err);
})
function siblings (elm) {
    if (!elm) { return; }
    var a = [];
    var p = elm.parentNode.children;
    for (var i = 0, pl = p.length; i < pl; i++) {
        if (p[i] !== elm) a.push(p[i]);
    }
    return a;
}
/*只做了第一层参数的去空格*/
function trim (s) {
    if (typeof(s) == 'string') {
        s = s.replace(/(^\s*)|(\s*$)/g, '');
    }
    return s;
}
