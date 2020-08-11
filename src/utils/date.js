
let SECOND = 1000
let MINUTE = 60 * SECOND
let HOUR = 60 * MINUTE
let DAY = 24 * HOUR
let MONTH = 30 * DAY
let YEAR = 12 * MONTH

var DateUtil = {
  transformToWorld(strtime) {
    var date = new Date(strtime)
    var timestamp = date.getTime()

    var now = new Date()
    var nowTimestamp = now.getTime()

    var difftime = nowTimestamp - timestamp

    var time = Math.floor(difftime / YEAR)
    if (time >= 1) {
      return time + '年前'
    }

    time = Math.floor(difftime / MONTH)
    if (time >= 1) {
      return time + '个月前'
    }

    time = Math.floor(difftime / DAY)
    if (time >= 1) {
      return time + '天前'
    }

    time = Math.floor(difftime / HOUR)
    if (time >= 1) {
      return time + '小时前'
    }

    time = Math.floor(difftime / MINUTE)
    if (time >= 1) {
      return time + '分钟前'
    }

    time = Math.floor(difftime / SECOND)
    if (time >= 0) {
      return '刚刚'
    }
  }
}

export default DateUtil
