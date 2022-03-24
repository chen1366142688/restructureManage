import axios from 'axios';
import { bind } from 'file-loader';
import env from '../../build/pro.env';
import { cloneDeep, throttle, debounce } from 'lodash'
const util = {

};

const ajaxUrl = env === 'development'
    ? 'http://127.0.0.1:8081'
    : env === 'production'
    ? 'https://www.url.com'
    : 'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.map(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && itAccess.isArray()) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    let routerObj = {};
    routers.forEach(item => {
        if (item.name === 'otherRouter') {
            item.children.forEach((child, i) => {
                if (child.name === name) {
                    routerObj = item.children[i];
                }
            });
        } else {
            if (item.children.length === 1) {
                if (item.children[0].name === name) {
                    routerObj = item.children[0];
                }
            } else {
                item.children.forEach((child, i) => {
                    if (child.name === name) {
                        routerObj = item.children[i];
                    }
                });
            }
        }
    });
    return routerObj;
};

util.handleTitle = function (vm, item) {
    return item.title;
};

util.setCurrentPath = function (vm, name) {
    let title = '';
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.handleTitle(vm, item);
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = util.handleTitle(vm, child);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            });
        }
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '',
                name: 'home_index'
            }
        ];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    } else {
        let currentPathObj = vm.$store.state.app.routers.filter(item => {
            if (item.children.length <= 1) {
                return item.children[0].name === name;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    if (childArr[i].name === name) {
                        return true;
                    }
                    i++;
                }
                return false;
            }
        })[0];
        if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '',
                    name: 'home_index'
                }
            ];
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: name
                }
            ];
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name;
            })[0];
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: currentPathObj.name
                },
                {
                    title: childObj.title,
                    path: currentPathObj.path + '/' + childObj.path,
                    name: name
                }
            ];
        }
    }
    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
    let pageOpenedList = vm.$store.state.app.pageOpenedList;
    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) {  // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }
    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (item.children) {
                return name === item.children[0].name;
            } else {
                return name === item.name;
            }
        });
        tag = tag[0];
        if (tag) {
            tag = tag.children ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            vm.$store.commit('increateTag', tag);
        }
    }
    vm.$store.commit('setCurrentPageName', name);
};

util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function (vm) {
    // 权限菜单过滤相关
    vm.$store.commit('updateMenulist');
};

util.s_to_hs = function (s) {
    var h;
    h = Math.floor(s / 60);
    s = s % 60;
    h += '';
    s += '';
    h = (h.length === 1) ? '0' + h : h;
    s = (s.length === 1) ? '0' + s : s;
    return `${h}\'${s}\'\'`;
};
util.random_string = function (len) {
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};

util.hasParams = function (store, route) {
    let pars = null;
    if (store.state.pageParams.listPagePars.has(route.name)) {
      pars = store.state.pageParams.listPagePars.get(route.name);
    }
    return pars;
};
util.Trim = function (str,global) { //去除字符空格
  let result;
  result = str.replace(/(^\s+)|(\s+$)/g,"");
  if(global.toLowerCase()=="g")
  result = result.replace(/\s/g,"");
  return result;
}
const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const chnUnitSection = ['', '万', '亿', '万亿', '亿亿'];
const chnUnitChar = ['', '十', '百', '千'];
util.NumberToChinese = function (num) {
    var unitPos = 0;
    var strIns = '', chnStr = '';
    var needZero = false;
    if (num === 0) {
      return chnNumChar[0];
    }
    while (num > 0) {
      var section = num % 10000;
      if (needZero) {
        chnStr = chnNumChar[0] + chnStr;
      }
      strIns = util.SectionToChinese(section);
      strIns += (section !== 0) ? chnUnitSection[unitPos] : chnUnitSection[0];
      chnStr = strIns + chnStr;
      needZero = (section < 1000) && (section > 0);
      num = Math.floor(num / 10000);
      unitPos++;
    }
    return chnStr;
};

util.SectionToChinese = function (section) {
    var strIns = '', chnStr = '';
    var unitPos = 0;
    var zero = true;
    while (section > 0) {
      var v = section % 10;
      if (v === 0) {
        if (!zero) {
          zero = true;
          chnStr = chnNumChar[v] + chnStr;
        }
      } else {
        zero = false;
        strIns = chnNumChar[v];
        strIns += chnUnitChar[unitPos];
        chnStr = strIns + chnStr;
      }
      unitPos++;
      section = Math.floor(section / 10);
    }
    return chnStr;
};
util.createURL = function (url, param) {
  let urlLink = '';
  for (let key in param) { 
    param[key] = (param[key] === 'ALL' || param[key] == 999 || param[key] == 9999 || param[key] === 'NaN' || param[key] === 'null') ? '' : param[key]
    urlLink += `&${key}=${param[key]}`;
  }
  urlLink = `${url}${urlLink ? '?' : ''}${urlLink.substr(1)}`;
  return urlLink.replace(' ', '');
};






util.trim = (str) => {
  let deepStr = str;
  if (Object.prototype.toString.call(str) === '[object String]') {
    deepStr = str.replace(/(^\s*)|(\s*$)/g, '');
  }
  return deepStr;
}

util.replaceParams = (str) => {
  str = str.replace(/ /g, '').replace(/!/g, '').replace(/~/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\'/g, '');
  return str;
}

util.createParams = (params) => {
  Object.keys(params).forEach(key => { 
    const ITEM = params[key] + '';
    if (ITEM === 'undefined' || ITEM === 'null' || ITEM === 'NaN' || ITEM === '99' || ITEM === '999' || ITEM === '999' || ITEM === '9999') {
      return '';
    } else { 
      return util.trim(ITEM);
    }
  })
};

util.createAloneParams = (params) => {
  const ITEM = params + '';
  if (ITEM === 'undefined' || ITEM === 'null' || ITEM === 'NaN' || ITEM === '99' || ITEM === '999' || ITEM === '999' || ITEM === '9999') {
    return '';
  } else { 
    return util.trim(ITEM);
  }
};

/**
 * 深度遍历，深拷贝
 * @param {*} data
 */
 util.deepClone = data => cloneDeep(data)





export default util;
