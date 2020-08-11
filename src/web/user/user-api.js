import graphql from '../graphql-api.js'
import documents from './user-doc'
import User from '../../utils/user'

/**
 * 用户相关网络接口
 */
var UserApi = {

  async login(name, psw) {
    User.saveUserAndPsw(name, psw)
    let query = JSON.stringify({
      query: documents.login()
    })

    let data = await graphql.request(query)
    return data
  },

  async loginByToken(token) {
    User.saveToken(token)
    let query = JSON.stringify({
      query: documents.login()
    })

    let data = await graphql.request(query)
    return data
  },

  async getUserInfo(login, after) {
    let query = JSON.stringify({
      query: documents.userInfo(login, after)
    })

    let data = await graphql.request(query)
    return data
  },

  async getOrgInfo(login, after, success, fail) {
    let query = JSON.stringify({
      query: documents.orgInfo(login, after)
    })

    return await graphql.request(query, success, fail)
  },

  async staredRepos(login, after) {
    let query = JSON.stringify({
      query: documents.staredRepos(login, after)
    })

    return await graphql.request(query)
  },

  async followers(login, after) {
    let query = JSON.stringify({
      query: documents.followers(login, after)
    })

    return await graphql.request(query)
  },

  async following(login, after) {
    let query = JSON.stringify({
      query: documents.following(login, after)
    })

    return await graphql.request(query)
  },

  async followUser(followId) {
    let query = JSON.stringify({
      query: documents.followUser(User.getUserInfo().id, followId)
    })

    return await graphql.request(query)
  },

  async unfollowUser(followId) {
    let query = JSON.stringify({
      query: documents.unfollowUser(User.getUserInfo().id, followId)
    })

    return await graphql.request(query)
  }
}

export default UserApi
