// 云函数入口文件
const cloud = require('wx-server-sdk')
const request = require('./request')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  if (!event.owner || !event.repo || !event.ref) {
    return {
      'code': 400,
      'msg': '参数不完整'
    }
  }

  let path = `/repos/${event.owner}/${event.repo}/contents${event.path ? `/${event.path}` : ''}?ref=${event.ref}`

  let opt = {
    host: 'api.github.com',
    method: event.method,
    path: path,
    headers: {
      'Authorization': event.headers['authorization'] || '',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36',
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      'Accept': 'application/json'
    }
  }

  let [success, data] = await request(opt)

  if (success) {
    var json = data
    if (json.content) { // 如果是文件，先进行Base64解码
      let Base64 = require('./base64')
      let content = Base64.decode(data.content)
      if (isMarkDown(data.name)) { // 如果是markdown转换为towxml可以显示的格式
        let Towxml = require('towxml')
        let towxml = new Towxml()

        // 将文件转换成为towxml支持的json数据
        content = content.replace(/<!--.+-->/igm, '')
        content = towxml.toJson(content, 'markdown')
      }
      json.content = content
    }
    return {
      'code': 200,
      'data': json
    }
  } else {
    return {
      'code': 500,
      'msg': data
    }
  }
}

function isMarkDown(name) {
  if (name.indexOf('.') >= 0) {
    var split = name.split('.')
    if (split && split.length > 1) {
      if (split[1] === 'md') {
        return true
      }
    }
  }
  return false
}
