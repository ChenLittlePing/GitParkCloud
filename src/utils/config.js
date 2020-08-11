
/**
 * 开发环境URL
 */
let DEV_URL = 'https://g0cczqbr.qcloud.la/gitpark/'

/**
 * 生产环境URL
 */
let PDT_URL = 'https://733771626.gitpark.club/gitpark/'

/**
 * 网络环境： 0：开发，1：生产
 */
let evn = 0

/**
 * 版本号
 */
let ver = 'v1.0'

/**
 * 网络配置
 */
let net = {
  BASE_URL: evn === 0 ? DEV_URL : PDT_URL
}

let cloudId = evn === 0 ? 'gitpark-clound-fun-axe0l' : 'gitpark-cloud-9ujwa'

module.exports = {
  evn,
  ver,
  net,
  cloudId
}
