import Config from '@/config'
import md5 from "js-md5"
import _axios, { post, get } from '@/plugins/axios'
import Util from '@/libs/util'
import { saveTokens, saveAccessToken, getToken} from '../libs/token'
import { saveUserInfo } from '../libs/userInfo'
// import store from '@/store'

export default class User {
  /**
   * 获取动态验证码
   * @param {string} userCode
   * **/
  static getCheckCode(userCode) { 
    return `${Config.baseURL}/v1/auth/login/getCheckCode?userCode=${userCode}`
  }

  /**
   * 登录系统
   * @param {object} data 登录信息
   * @param {boolean} type true-登录 false-找回密码
   */
  static async registerOrForgetPassWord(data, type) {
    if (type) {
      data.password = md5(data.password)
    } else { 
      data.passWord = md5(data.passWord)
    }
    let res = {};
    if (type) {
      res = await post('/v1/auth/login/password', data)
    } else { 
      res = await post('/v1/auth/update/pass/word', data)
    }
    const { token, refreshToken } = res.data.response.oAuthTokenVO;
    saveTokens(token, refreshToken);
    saveAccessToken(token);
    saveUserInfo(res.data.response);
    return res.data.response;
  }



  /**
   * 登陆获取tokens
   * @param {string} username 用户名
   * @param {string} password 密码
   */
  // static async getToken(username, password) {
  //   const tokens = await post('cms/user/login', {
  //     username,
  //     password,
  //   })
  //   saveTokens(tokens.access_token, tokens.refresh_token)
  //   return tokens
  // }

  /**
   * 忘记密码时发送验证码
   * @param {object} data 用户信息 
   */
  static async sendSMS(data) {
    const info = await get(Util.createURL('/v1/auth/sendSmsForUpdatePassword', data))
    // return _axios({
    //   method: 'get',
    //   url: 'cms/user/register',
    //   data,
    //   handleError: true,
    // })
    return info
  }

  /**
   * 更新用户状态
   * @param {object} data （token，schoolId,schoolType）
   */

  static async upDateToken(data) { 
    const res = await get(Util.createURL('/v1/auth/login/token', data))
    const { token, refreshToken } = res.data.response.oAuthTokenVO;
    saveTokens(token, refreshToken);
    saveAccessToken(token);
    saveUserInfo(res.data.response);
    return res.data.response;
  }
  /**
   * 教育局账号直接登录
   * @param {object} data （token，schoolId）
   */

  static async loginSchoolByOrgantoken(data) { 
    const res = await get(Util.createURL('/v1/auth/loginSchoolByOrgantoken', data))
    const { token, refreshToken } = res.data.response.oAuthTokenVO;
    saveTokens(token, refreshToken);
    saveAccessToken(token);
    saveUserInfo(res.data.response);
    return res.data.response;
  }
  
  /**
   * 获取用户绑定学校列表
   */

  static async querySchoolList() { 
    const TOKEN = getToken('token');
    const res = await get(`/v1/auth/query/login/school/list?token=${TOKEN}`)
    return res.data.response;
  }

  /**
   * 消息已读反馈
   * @param {string} noticeId 消息ID
   */

  static async teacherReadMessage(noticeId) { 
    const res = await get(`/v1/education/teacherReadMessage?noticeId=${noticeId}`)
    return res.data.response;
  }

  /**
   * 获取消息列表
   */

  static async getMessageList() { 
    const res = await get('/v1/education/queryEducationInfoList')
    return res.data.response;
  }
  /**
   * 获取当前用户信息和所拥有的权限
   */
  // static async getPermissions() {
  //   const info = await get('cms/user/permissions')
  //   const storeUser = store.getters.user === null ? {} : store.getters.user
  //   return Object.assign({ ...storeUser }, info)
  // }

  /**
   * 用户修改密码
   * @param {string} newPassword 新密码
   * @param {string} confirmPassword 确认新密码
   * @param {string} oldPassword 旧密码
   */
  // static updatePassword({ old_password, new_password, confirm_password }) {
  //   return put('cms/user/change_password', {
  //     new_password,
  //     confirm_password,
  //     old_password,
  //   })
  // }
}
