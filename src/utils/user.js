import Base64 from './base64'

let KEY_USER_NAME = "USER_NAME"
let KEY_USER_INFO = "KEY_USER_INFO"
let KEY_USER_PSW = "KEY_USER_PSW"
let KEY_USER_TOKEN = "KEY_USER_TOKEN"

/**
 * 用户登陆数据
 */
var User = {
  userPsw: null,
  userToken: null,
  userInfo: null,

  /**
   * 保存用户数据
   * @param  {[type]} name 用户名
   * @param  {[type]} psw  登陆秘密
   */
  saveUserAndPsw(name, psw) {
    this.clear()
    var base64 = 'Basic ' + Base64.encode(name + ':' + psw)
    wx.setStorageSync(KEY_USER_PSW, base64)
    this.userPsw = null
  },

  saveToken(token) {
    this.clear()
    var base64 = 'bearer ' + token
    wx.setStorageSync(KEY_USER_TOKEN, base64)
    this.userToken = null
  },

  saveUserName(name) {
    wx.setStorageSync(KEY_USER_NAME, name)
  },

  /**
   * 获取用户名
   */
  getUserName() {
    return wx.getStorageSync(KEY_USER_NAME)
  },

  /**
   * 获取授权密钥
   */
  getAuthorization() {
    if (!this.userPsw) {
        this.userPsw = wx.getStorageSync(KEY_USER_PSW)
    }
    if (this.userPsw) {
      return this.userPsw
    }

    if (!this.userToken) {
        this.userToken = wx.getStorageSync(KEY_USER_TOKEN)
    }
    if (this.userToken) {
      return this.userToken
    }
    return null
  },

  saveUserInfo(user) {
    wx.setStorageSync(KEY_USER_INFO, JSON.stringify(user))
  },

  getUserInfo() {
    if (!this.userInfo) {
      var user = wx.getStorageSync(KEY_USER_INFO)
      if (user) {
        this.userInfo = JSON.parse(user)
      }
    }
    return this.userInfo
  },

  clear() {
    this.userPsw = null
    this.userToken = null
    this.userInfo = null
    wx.removeStorageSync(KEY_USER_PSW)
    wx.removeStorageSync(KEY_USER_TOKEN)
    wx.removeStorageSync(KEY_USER_INFO)
  }
}

export default User
