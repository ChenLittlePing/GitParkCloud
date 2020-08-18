/**
 * 数据库操作类
 */

const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database({
  throwOnNotFound: false
})
const _ = db.command

/**
  * 处理云函数请求
  * @param tb_name 数据表名称
  * @param method_name 数据表操作方法(get|add|update|delete)
  * @param params 参数集
  */
async function request(tb_name, method_name, params) {
  if (!tb_name) {
    return [false, "无效请求"]
  }
  if (method_name === "get") {
    return dbUtil.query(tb_name, params)
  } else if (method_name === "add") {
    return dbUtil.add(tb_name, params)
  } else if (method_name === "addComment") {
    return dbUtil.addComment(params)
  }
  return [false, "无效请求"]
}

var dbUtil = {
  /**
   * 查询数据
   */
  async query(tb_name, params) {
    try {
      var response = await new Promise(
        (resolve, reject) => {
          var dbc = db.collection(tb_name)
          if (params) {
            let orderBy = params.orderBy
            let orderBySort = params.orderBySort
            delete params["orderBy"]
            delete params["orderBySort"]
            let curPage = params.page
            var pageSize = params.pageSize
            delete params["page"]
            delete params["pageSize"]

            // 条件语句
            dbc = dbc.where(params)

            // 分页查询
            if (curPage) {
              pageSize = pageSize ? pageSize : 1000
              let startIndex = (curPage - 1) * pageSize
              dbc = dbc.skip(startIndex).limit(pageSize)
            }

            // 排序
            if (orderBy) {
              orderBySort = orderBySort ? orderBySort : "asc"
              dbc = dbc.orderBy(orderBy, orderBySort)
            }
          }
          dbc.get().then(
            (res) => {
              if (res.data) {
                resolve(res)
              } else {
                reject()
              }
            }
          )
        }
      )
      if (response.data) {
        return [true, response]
      } else {
        return [false, "查询数据失败"]
      }
    } catch(err) {
      var response = err.errMsg ? err.errMsg : err.toString()
      return [false, response]
    }
    
  },

  /**
   * 插入数据
   */
  async add(tb_name, params) {
    if (!params) {
      params = {}
    }
    params["createTime"] = new Date().getTime() // db.serverDate()
    try {
      let response = await db.collection(tb_name).add({
        data: params
      })
      if (response.errMsg.indexOf("ok") >= 0) {
        return [true, response]
      } else {
        return [false, response.errMsg]
      }
    } catch(err) {
      var response = err.errMsg ? err.errMsg : err.toString()
      return [false, response]
    }
  },

  /**
   * 插入评论数据
   */
  async addComment(params) {
    if (!params) {
      params = {}
    }
    params["createTime"] = new Date().getTime() // db.serverDate()
    let tb_name = "tb_comment"
    let parentId = params["parentId"]
    if (!parentId) {
      //母评论（也就是说，这条评论不是回复评论，则独立起来，不需要计算子评论数）
      params["amount"] = 0
      return this.add(tb_name, params)
    }
    try {
      let response = await db.runTransaction(async transaction => {
        let aRes = await transaction.collection(tb_name).add({
          data: params
        })
        let uRes = await transaction.collection(tb_name).doc(parentId).update({
          data: {
            amount: _.inc(1)
          }
        })
        if (aRes.errMsg.indexOf("ok") >= 0 && uRes.errMsg.indexOf("ok") >= 0) {
          return [true, "添加评论成功成功"]
        } else {
          await transaction.rollback(-100)
          return [false, "添加评论失败"]
        }
      })
      return response
    } catch (err) {
      var response = err.errMsg ? err.errMsg : err.toString()
      return [false, response]
    }
  }

}


module.exports = request