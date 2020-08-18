// 云函数入口文件
//const cloud = require('wx-server-sdk')
const request = require('./request')

//cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {

  // const wxContext = cloud.getWXContext()
  // wxContext.OPENID
  // wxContext.APPID
  // wxContext.APPID
  
  var tb_name = event.body.tb
  var method_name = event.body.method
  var params = event.body.data

  let [success, result] = await request(tb_name, method_name, params)

  console.log(result)

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