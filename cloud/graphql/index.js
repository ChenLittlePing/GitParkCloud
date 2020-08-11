// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('./request')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  let random = Math.random(100)
  let opt = {
    host: 'api.github.com',
    path: '/graphql',
    method: 'POST',
    headers: {
      'Authorization': event.headers['authorization'] || '',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.' + random + ' (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.' + random,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Content-Length': event.body.length
    }
  }

  let [success, result] = await request(opt, event.body)

  if (success) {
    return {
      'code': 200,
      'data': result
    }
  } else {
    return {
      'code': 500,
      'msg': result
    }
  }
}
