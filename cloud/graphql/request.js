const https = require('https')

module.exports = async function request(opt, body) {
  try {
    var success = true
    var content = ''
    var response = await new Promise((resolve, reject) => {
      var req = https.request(opt, (res) => {
        if (res.statusCode === 200) {
          res.on('data', (body) => {
            content = content + body // 拼接数据，并转化为string
          })
          .on('end', () => {
            var back = JSON.parse(content)
            resolve(back.data)
          })
        } else {
          reject(res.statusMessage)
        }
      })
      .on('error', (e) => {
        reject(e)
      })
      // 写入请求参数
      req.write(body)
      // 发送http请求
      req.end()
    })
  } catch (e) {
    success = false
    if (typeof e === 'string') {
      response = e
    } else {
      response = e && e.message ? e.message : e.toString()
    }
  }

  return [success, response]
}
