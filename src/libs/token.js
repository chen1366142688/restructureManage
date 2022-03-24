/**
 * 存储tokens
 * @param {string} accessToken
 * @param {string} refreshToken
 */
export function saveTokens(accessToken, refreshToken) {
  sessionStorage.setItem('token', accessToken)
  sessionStorage.setItem('refresh_token',refreshToken)
}

/**
 * 存储access_token
 * @param {string} accessToken
 */
export function saveAccessToken(accessToken) {
  sessionStorage.setItem('token', accessToken)
}

/**
 * 获得某个token
 * @param {string} tokenKey
 */
export function getToken(tokenKey) {
  return sessionStorage.getItem(tokenKey)
}

/**
 * 移除token
 */
export function removeToken() {
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('refresh_token')
}
