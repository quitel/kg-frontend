import request from '@/utils/request'

/**
 * 使用了封装的request工具,每个接口的请求都单独**导出**了一个方法,
 * 这样做的好处就是,任何位置需要请求的话,可以直接引用我们导出的请求方法
 * @param data
 * @returns {*}
 */


export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
