/**
 * 存储active
 * @param {string} 存储active
 */
 export function saveActive(active) {
  sessionStorage.setItem('active', active)
}

/**
 * 获得active中某个属性值
 * @param {string} userKey
 */
export function getActiveKey(userKey) {
  return sessionStorage.getItem(userKey)
}

/**
 * 移除active
 */
export function removeActive() {
  sessionStorage.removeItem('userKey')
}
