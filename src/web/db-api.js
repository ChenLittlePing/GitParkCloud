/**
 * 云数据库操作类
 */

import cloud from './cloud-api'

var DBApi = {

  /**
   * 操作云数据库数据
   * @param tb 数据表名称
   * @param method 数据表操作方法（add,get,update,delete）
   * @param data 参数集{}
   */
  async curd(tb, method, data) {
    var params = {
      tb: tb,
      method: method,
      data: data
    }
    let query = {
      body: params,
      method: 'POST'
    }
    return await cloud("database", query)
  },

  /**
   * 查询评论数据
   * @param repoId 项目id
   * @param parentId 母评论id
   * @param page 当前页码
   * @param pageSize 每页大小（默认1000，可为空，在小程序端默认及最大上限为20，在云函数端默认及最大上限为1000，本方法调用云函数，故每页大小最大为1000）
   */
  async queryComments(params) {
    if (!params) {
      params = {}
    }
    params["orderBy"] = "createTime"
    params["orderBySort"] = "desc"
    return this.curd("tb_comment", "get", params)
  },

  /**
   * 添加评论数据
   * @param comment 评论信息
   */
  async addComment(comment) {
    return this.curd("tb_comment", "addComment", comment)
  },


  test() {
    // let tb = "tb_comment"
    // let method = "add"
    // let comment = {
    //   from_id: "1",
    //   from_name: "clintonbembryjr",
    //   from_avatar: "https://avatars0.githubusercontent.com/u/68755093",
    //   to_id: "2",
    //   to_name: "chezhe",
    //   to_avatar: "https://avatars2.githubusercontent.com/u/2902414",
    //   content: "666"
    // }
    // this.curd(tb, method, comment)
    var params = {
      page: 1,
      pageSize: 10,
      name: "chezhe"
    }
    this.curd("tb_comment", "get", params).then(
      (res) => {
        console.log(res)
      }
    )
  }

}


export default DBApi