
export default async function cloud(funName, data) {
  try {
    var res = await wx.cloud.callFunction({
      name: funName,
      data: data
    })
    if (res.result.code === 200) {
      return res.result.data
    } else {
      throw res.result.msg
    }
  } catch (e) {
    if (typeof e === 'string') {
      throw e
    } else {
      // eslint-disable-next-line no-throw-literal
      throw '服务器异常'
    }
  }
}
