/**
 * 存储userInfo
 * @param {object} 存储userInfo
 */
 export function saveUserInfo(userInfo) {
  sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
}

/**
 * 获得userInfo中某个属性值
 * @param {string} userKey
 */
export function getUserInfoKey(userKey) {
  return JSON.parse(sessionStorage.getItem('userInfo'))[userKey]
}

/**
 * 获得userInfo
 * @param {string} userInfo
 */
 export function getUserInfo(userInfo) {
  return JSON.parse(sessionStorage.getItem(userInfo))
}

/**
 * 移除userInfo
 */
export function removeUserInfo() {
  sessionStorage.removeItem('userInfo')
}
