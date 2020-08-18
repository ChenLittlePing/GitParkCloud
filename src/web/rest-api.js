
import wepy from "wepy"
import User from "../utils/user"
import Config from "../utils/config"

// let BASE_URL = 'https://api.github.com/'
let BASE_URL = Config.net.BASE_URL

/**
 * 网络请求基础工具
 */
var RestApi = {

  get(endPoint, params, success, fail) {
    this.request(endPoint, params, 'GET', success, fail)
  },

  post(endPoint, params, success, fail) {
    this.request(endPoint, params, 'POST', success, fail)
  },

  /**
   * GitHub v3 请求接口封装
   * @param  {[type]} params 请求参数
   * @param  {[type]} s      成功回调接口
   * @param  {[type]} f      失败回调接口
   */
  request(url, params, method, s, f) {
    var that = this
    var user = User.getAuthorization()
    wepy.request({
      url: this.buildUrl(BASE_URL + url, params),
      method: method,
      header: {
        'Authorization': user? user : '',
        'Content-Type': 'application/json'
      },
      success: function (data) {
        console.log(data);
        // that.callback(f, '服务器开了点小差')
        // return
        if (data.statusCode != 200 || data.data.errMsg ||
          data.data.status !== 'OK' || data.data.code < 0) {
          that.callback(f, data.data.errMsg)
        } else if(data.data.data.errors) {
          that.callback(f, data.data.data.errors[0].message)
        } else {
          that.callback(s, data.data.data)
        }
      },
      fail: function(data) {
        console.log(data);
        if (data.data && data.data.message) {
          that.callback(f, data.data.message)
        } else {
          that.callback(f, '服务器开了点小差')
        }
      }
    })
  },

  /**
   * 结果回调
   * @param  {[type]}   f 回调接口
   * @param  {[type]}   d 返回数据
   */
  callback(f, d) {
    if (f && typeof f == 'function') {
      f(d);
    }
  },

  buildUrl(url, params) {
    var keys = ''
    for (var key in params) {
      if (params[key] && params[key] != '') {
        keys += key + "=" + params[key] + "&"
      }
    }
    if (keys && keys !== '') {
      keys = keys.substring(0, keys.length -1)
      return (url + "?" + keys)
    } else {
      return url
    }
  }
}

export default RestApi
