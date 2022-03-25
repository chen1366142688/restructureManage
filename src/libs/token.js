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
 * 存储到sessionStorage.为了兼容以前代码而写。。。。
 * @param {string} storageKey
 */
export function saveStorageItem(storageKey, storageValue) {
  sessionStorage.setItem(storageKey, storageValue)
}

/**
 * @param {object} userInfo 用户登录信息存储，为了兼容以前代码而写。。。。
*/
export function setStorage(userInfo) {
  const { phoneNum, teacherId, schoolId, name, avatarUrl, menuList, schoolName, schoolType, schoolDistrict, weekCount, semesterStatus, isAdmin, yearSemester, semesterOver, schoolYear, single} = userInfo
  saveStorageItem('phoneNo', phoneNum)
  saveStorageItem('teacherId', teacherId)
  saveStorageItem('schoolId', schoolId)
  saveStorageItem('name', name)
  saveStorageItem('avatarUrl', avatarUrl)
  saveStorageItem('menuList', menuList)
  saveStorageItem('schoolName', schoolName)
  saveStorageItem('schoolType', schoolType)
  saveStorageItem('schoolDistrict', schoolDistrict)
  saveStorageItem('weekCount', weekCount)
  saveStorageItem('showMessageBox', true)
  saveStorageItem('semesterStatus', semesterStatus)
  saveStorageItem('isAdmin', isAdmin)
  saveStorageItem('yearSemester', yearSemester)
  saveStorageItem('semesterOver', semesterOver)
  saveStorageItem('schoolYear', schoolYear)
  saveStorageItem('single', single)
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


