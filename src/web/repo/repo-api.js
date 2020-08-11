
import graphql from '../graphql-api.js'
import documents from './repo-doc.js'
import cloud from '../cloud-api'
import User from '../../utils/user.js'

var RepoApi = {

  async getRepoOverview(owner, name) {
    let query = JSON.stringify({
      query: documents.repoOverview(owner, name)
    })

    return await graphql.request(query)
  },

  async getRepoContent(owner, repo, branch, path) {
    let data = {
      owner: owner,
      repo: repo,
      ref: branch,
      method: 'GET',
      headers: {
        'authorization': User.getAuthorization()
      }
    }
    if (path) {
      data.path = path
    }
    return await cloud('overview', data)
  },

  async addStar(repoId) {
    let query = JSON.stringify({
      query: documents.addStar(User.getUserInfo().id, repoId)
    })

    return await graphql.request(query)
  },

  async removeStar(repoId) {
    let query = JSON.stringify({
      query: documents.removeStar(User.getUserInfo().id, repoId)
    })

    return await graphql.request(query)
  },

  async addWatching(repoId) {
    let query = JSON.stringify({
      query: documents.addWatching(User.getUserInfo().id, repoId)
    })

    return await graphql.request(query)
  },

  async removeWatching(repoId) {
    let query = JSON.stringify({
      query: documents.removeWatching(User.getUserInfo().id, repoId)
    })

    return await graphql.request(query)
  }
}

export default RepoApi
