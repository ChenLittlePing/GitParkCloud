// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('./request')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  if (!event.since) {
    return {
      'code': 400,
      'msg': '参数不完整'
    }
  }

  let opt = {
    host: 'github-trending-api.now.sh',
    method: event.method,
    path: '/repositories?since=' + event.since,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  let [success, result] = await request(opt)
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
