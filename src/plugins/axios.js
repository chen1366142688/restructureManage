// ajax 封装插件, 使用 axios
import Vue from 'vue'
import axios from 'axios'
import Config from '@/config'
import ErrorCode from '@/config/error-code'
import md5 from 'js-md5'
import store from '@/store'
import Util from '@/libs/util'
import { getToken } from '@/libs/token'
console.log(Config)
const { secretKey, appKey, baseURL} = Config
const config = {
  baseURL: baseURL || '',
  timeout: 5 * 1000, // 请求超时时间设置
  crossDomain: true,
  // withCredentials: true, // Check cross-site Access-Control
  // 定义可获得的http响应状态码
  // return true、设置为null或者undefined，promise将resolved,否则将rejected
  validateStatus(status) {
    return status >= 200 && status < 510
  },
}

// const retryTime = 2 // 请求失败重试次数
// const retryDelay = 1500 // 请求失败重试间隔

// 创建请求实例
const _axios = axios.create(config)
_axios.interceptors.request.use(
  originConfig => {
    // 有 API 请求重新计时
    Vue.prototype.$_chen_jump()
    const reqConfig = { ...originConfig }
    let paramStr = '', secretParamsData = null;
    let haveParam = false;
    // step1: 容错处理
    if (!reqConfig.url) {
      /* eslint-disable-next-line */
      console.error('request need url')
      throw new Error({
        source: 'axiosInterceptors',
        message: 'request need url',
      })
    }

    if (!reqConfig.method) {
      // 默认使用 get 请求
      reqConfig.method = 'get'
    }
    // 大小写容错
    reqConfig.method = reqConfig.method.toLowerCase()

    // 参数容错
    if (reqConfig.method === 'get') {
      const urlParams = reqConfig.url.split('?');
      if (!reqConfig.params) {
        reqConfig.params = reqConfig.data || {}// 防止字段用错
      }
      reqConfig.url = urlParams[0];
      if (urlParams.length > 1) { //通过地址传参数的
        reqConfig.params = urlParams[1]
        const paramsData = reqConfig.params.split('&')
        const paramsObj = new Object();
        paramsData.forEach(paramKey => {
          let [first, last] = paramKey.split('=');
          paramsObj[first] = Util.trim(Util.createAloneParams(last))
        })
        reqConfig.params = paramsObj
        secretParamsData = paramsObj
        haveParam = true
      } else { //通过data传参的或者没有参数
        if (JSON.stringify(reqConfig.params) !== '{}') { //有参数才做处理
          reqConfig.params = Util.createParams(reqConfig.params) //处理不规范的参数，转为空字符串，并且去空格
          secretParamsData = reqConfig.params
          haveParam = true
        } else {
          secretParamsData = ''
        }
      }
      if (haveParam) { //排序拼接
          const keyList = Object.keys(reqConfig.params).sort();
          keyList.forEach((keyItem) => {
            paramStr += keyItem + reqConfig.params[keyItem];
          })
      }
    } else if (reqConfig.method === 'post') {
      if (!reqConfig.data) {
        reqConfig.data = reqConfig.params || {}// 防止字段用错
      }
      secretParamsData = reqConfig.data
    } else {
      // TODO: 其他类型请求数据格式处理
      /* eslint-disable-next-line */
      console.warn(`其他请求类型: ${reqConfig.method}, 暂无自动处理`)
    }

    paramStr += secretKey
    const paramsData = JSON.stringify(secretParamsData);
    if (reqConfig.data) {//post需要加上参数 
      paramStr += paramsData;
    }
    paramStr = Util.replaceParams(paramStr);
    paramStr = md5(encodeURIComponent(paramStr)).toUpperCase();
    paramStr = `${paramStr}encodeutf8`;
    
    console.log('请求信息',reqConfig)
    reqConfig.headers['sign'] = paramStr;
    reqConfig.headers['appKey'] = appKey;
    reqConfig.headers['token'] = getToken('token') || '';
    reqConfig.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
    return reqConfig
  },
  error => {
    Promise.reject(error)
  },
)

// Add a response interceptor
_axios.interceptors.response.use(
  async res => {
    let { code, msg } = res.data // eslint-disable-line
    if (res.status.toString().charAt(0) === '2') {
      if (code === 10000) {
        return res.config.handleCode ? res.data : res   //handleCode:true  表示只返回data，是为了以前的接口是直接返回的res做处理
      } else { 
        return new Promise(async (resolve, reject) => { 
          // 第一种情况：默认直接提示后端返回的异常信息；特殊情况：如果本次请求添加了 handleError: true，用户自己try catch，框架不做处理
          if (res.config.handleError) {
            return reject(res)
          }
          // 第二种情况：采用前端自己的一套异常提示信息；特殊情况：如果本次请求添加了 showBackend: true, 弹出后端返回错误信息。
          if (Config.useFrontEndErrorMsg && !res.config.showBackend) {
            // 弹出前端自定义错误信息
            const errorArr = Object.entries(ErrorCode).filter(v => v[0] === code.toString())
            // 匹配到前端自定义的错误码
            if (errorArr.length > 0 && errorArr[0][1] !== '') {
              msg = errorArr[0][1] // eslint-disable-line
            } else {
              msg = ErrorCode['777']
            }
          }
          if (code === 30003 || code === 30005) {
            store.actions.setLoginStatus(true);
            return;
          }
          Vue.prototype.$Message.error(msg)
          reject()
        })
      }
    }
  },
  error => {
    if (!error.response) {
      Vue.prototype.$Message.error('请检查 API 是否异常')
      console.log('error', error)
    }

    // 判断请求超时
    if (error.code === 'ECONNABORTED' && error.msg.indexOf('timeout') !== -1) {
      Vue.prototype.$Message.warning('请求超时')
    }
    return Promise.reject(error)
  },
)

// eslint-disable-next-line
Plugin.install = function(Vue, options) {
  // eslint-disable-next-line
  Vue.axios = _axios
  window.axios = _axios
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios
      },
    },
    $axios: {
      get() {
        return _axios
      },
    },
  })
}

if (!Vue.axios) {
  Vue.use(Plugin)
}

// 导出常用函数

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function post(url, data = {}, params = {}) {
  return _axios({
    method: 'post',
    url,
    data,
    params,
  })
}

/**
 * @param {string} url
 * @param {object} params
 */
export function get(url, params = {}) {
  return _axios({
    method: 'get',
    url,
    params,
  })
}

/**
 * @param {string} url
 * @param {object} data
 * @param {object} params
 */
export function put(url, data = {}, params = {}) {
  return _axios({
    method: 'put',
    url,
    params,
    data,
  })
}

/**
 * @param {string} url
 * @param {object} params
 */
export function _delete(url, params = {}) {
  return _axios({
    method: 'delete',
    url,
    params,
  })
}

export default _axios
