import request from '@/utils/request'

/**
 * 使用了封装的request工具,每个接口的请求都单独**导出**了一个方法,
 * 这样做的好处就是,任何位置需要请求的话,可以直接引用我们导出的请求方法
 * @param data
 * @returns {*}
 */

export function getTotalNodeAndRelationCount(projectId) {
  return request({
    url: '/node/totalCount?projectId='+projectId,
    method: 'get',
    timeout: 5000000
  })
}



export function postgres2Neo4j(projectId,reImport) {
  return request({
    url: '/db/2neo4j/all?projectId='+projectId+'&reImport='+reImport,
    method: 'get',
    timeout: 500000000
  })
}

// export function rePostgres2Neo4j(projectId,reImport) {
//   return request({
//     url: '/db/2neo4j/reimportall?projectId='+projectId+'&reImport='+reImport,
//     method: 'get',
//     timeout: 500000000
//   })
// }

export function postgresTable2Neo4j(tableName) {
  return request({
    url: '/db/2neo4j/'+tableName,
    method: 'get',
    timeout: 500000000
  })
}

