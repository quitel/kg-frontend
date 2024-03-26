import request from '@/utils/request'

export function pageListPerson(pageNum,pageSize,projectId) {
  console.log('api中的getList，params:')
  // let url = '/node/pageListPerson/'+pageNum+'/'+pageSize
  // console.log(url)
  return request({
    url: '/node/pageListPerson/'+pageNum+'/'+pageSize+'/'+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
