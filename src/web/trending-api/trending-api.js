
import cloud from '../cloud-api'

var TrendingApi = {
  async trending(since) {
    const data = {
      since: since,
      method: 'GET'
    }

    return await cloud('trending', data)
  }
}

export default TrendingApi
