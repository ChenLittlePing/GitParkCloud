/* eslint-disable no-throw-literal */

import wepy from 'wepy'
import User from '../utils/user'
import cloud from './cloud-api'

/**
 * 网络请求基础工具
 */
var BaseApi = {

  /**
   * GitHub v4 请求接口封装
   * @param  {[type]} params 请求参数
   */
  async request(params) {
    if (!User.getAuthorization()) {
      wepy.switchTab({
        url: '/pages/user/home'
      })
      throw '请先登录'
    }

    const data = {
      body: params,
      method: 'POST',
      headers: {
        'authorization': User.getAuthorization() || ''
      }
    }

    return await cloud('graphql', data)
  }
}

export default BaseApi
