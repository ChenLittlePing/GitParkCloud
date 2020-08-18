
import BaseApi from '../graphql-api.js'
import documents from './search-doc'
import Base64 from '../../utils/base64.js'

/**
 * 用户相关网络接口
 */
var SearchApi = {

  async searchRepos(key, after) {
    const query = JSON.stringify({
      query: documents.searchRepos(key, after)
    })

    return await BaseApi.request(query)
  },

  async searchUsers(key, after) {
    const query = JSON.stringify({
      query: documents.searchUsers(key, after)
    })

    return await BaseApi.request(query)
  }
}

export default SearchApi
