import request from '@/utils/request'
import form from '@/views/form'

/**
 * 获取表单提交数据，创建PersonVertex节点
 * @param vertex
 * @returns {*}
 */
export function addPersonVertex(vertex) {
  console.log('api中的getList，vertex:' + vertex)
  return request({
    url: '/node/savePerson',
    method: 'post',
    data: vertex
  })
}


export function uploadExcelFile(file,category) {
  console.log('api中的uploadExcelFile:' + file +', category:'+category)
  var formData = new FormData();
  formData.append("file",file)
  let url = getFileUploadUrl(category)
  console.log(url)
  return request({
    url: url,
    method: 'post',
    data: formData,
    timeout: 50000
    // headers: {//请求头，根据自身需求加或者不加
    //   "Content-Type": "multipart/form-data",
    // }
  })
}

/**
 * 获取接口
 * @param categoryId
 */
function getFileUploadUrl(categoryId) {
  let url = ''
  switch(parseInt(categoryId))
  {
    case 1:
      url = '/file/excel/import/chuxing'
      break;
    case 2:
      url = '/file/excel/import/fangchan'
      break;
    case 3:
      url = '/file/excel/import/huji'
      break;
    case 4:
      url = '/file/excel/import/hunyin'
      break;
    case 5:
      url = '/file/excel/import/weizhang'
      break;
    case 6:
      url = '/file/excel/import/jidongche'
      break;
    case 7:
      url = '/file/excel/import/xiangguanrenyuan'
      break;
    case 8:
      url = '/file/excel/import/jigou'
      break;
    case 9:
      url = '/file/excel/import/tongxunjizhu'
      break;
    case 10:
      url = '/file/excel/import/tongxunjilu'
      break;
    case 11:
      url = '/file/excel/import/tonghu'
      break;
    case 12:
      url = '/file/excel/import/yinhangchika'
      break;
    case 13:
      url = '/file/excel/import/yinhangliushui'
      break;
    case 14:
      url = '/file/excel/import/yunsou'
      break;
    default:
      url = '/file/excel/import/fangchan'
  }
  return url
}


/**
 * 获取主体人-房产关系列表
 * @returns {*}
 */
export function getPersonFangChanRelationtList() {
  console.log('调用getPersonFangChanRelationtList')
  return request({
    url: '/node/getPersonFangChanRelationtList',
    method: 'get',
    timeout: 50000
  })
}

/**
 * 获取主体人-出行关系列表
 * @returns {*}
 */
export function getPersonChuXingRelationtList() {
  console.log('调用getPersonChuXingRelationtList')
  return request({
    url: '/node/getPersonChuXingRelationtList',
    method: 'get',
    timeout: 50000
  })
}

/**
 * 获取主体人-乘坐关系列表
 * @returns {*}
 */
export function getPersonChengZuoRelationtList() {
  console.log('getPersonChengZuoRelationtList')
  return request({
    url: '/node/getPersonChengZuoRelationtList',
    method: 'get',
    timeout: 50000
  })
}

/**
 * 获取主体人-入住关系列表
 * @returns {*}
 */
export function getPersonRuZhuRelationtList() {
  console.log('getPersonChuXingRelationtList')
  return request({
    url: '/node/getPersonRuZhuRelationtList',
    method: 'get',
    timeout: 50000
  })
}

/**
 * 获取主体人-户籍关系列表
 * @returns {*}
 */
export function getPersonHuJiRelationtList() {
  console.log('调用getPersonHuJiRelationtList')
  return request({
    url: '/node/getPersonHuJiRelationtList',
    method: 'get',
    timeout: 50000
  })
}

/**
 * 获取主体人-婚姻关系列表
 * @returns {*}
 */
export function getPersonHunYinRelationtList() {
  console.log('调用getPersonHunYinRelationtList')
  return request({
    url: '/node/getPersonHunYinRelationtList',
    method: 'get',
    timeout: 50000
  })
}
/**
 * 获取主体人-违章关系列表
 * @returns {*}
 */
export function getPersonWeiZhangRelationtList() {
  console.log('调用getPersonWeiZhangRelationtList')
  return request({
    url: '/node/getPersonWeiZhangRelationtList',
    method: 'get',
    timeout: 50000
  })
}
/**
 * 获取主体人-机动车关系列表
 * @returns {*}
 */
export function getPersonJiDongCheRelationtList() {
  console.log('调用getPersonJiDongCheRelationtList')
  return request({
    url: '/node/getPersonJiDongCheRelationtList',
    method: 'get',
    timeout: 50000
  })
}
/**
 * 获取主体人-机构相关人员关系列表
 * @returns {*}
 */
export function getPersonXiangGuanRenYuanRelationtList() {
  console.log('调用getPersonXiangGuanRenYuanRelationtList')
  return request({
    url: '/node/getPersonXiangGuanRenYuanRelationtList',
    method: 'get',
    timeout: 50000
  })
}
/**
 * 获取联络员-机构关系列表
 * @returns {*}
 */
export function getPersonLianLuoYuanRelationtList() {
  console.log('调用getPersonLianLuoYuanRelationtList')
  return request({
    url: '/node/getPersonLianLuoYuanRelationtList',
    method: 'get',
    timeout: 50000
  })
}
/**
 * 获取法定代表人-机构关系列表
 * @returns {*}
 */
export function getPersonFaDingRelationtList() {
  console.log('调用getPersonFaDingRelationtList')
  return request({
    url: '/node/getPersonFaDingRelationtList',
    method: 'get',
    timeout: 50000
  })
}
/**
 * 获取财务负责人-机构关系列表
 * @returns {*}
 */
export function getPersonCaiWuRelationtList() {
  console.log('调用getPersonCaiWuRelationtList')
  return request({
    url: '/node/getPersonCaiWuRelationtList',
    method: 'get',
    timeout: 50000
  })
}
/**
 * 获取主题人-通讯机主关系列表
 * @returns {*}
 */
export function getPersonTongXunJiZhuRelationtList() {
  console.log('getPersonTongXunJiZhuRelationtList')
  return request({
    url: '/node/getPersonTongXunJiZhuRelationtList',
    method: 'get',
    timeout: 50000
  })
}


/**
 * 获取通讯机主-通讯机主关系列表
 * @returns {*}
 */
export function getPersonCallRelationtList(projectId,limit) {
  console.log('getPersonCallRelationtList')
  return request({
    url: '/node/getPersonCallRelationtList?projectId='+projectId+'&limit='+limit,
    method: 'get',
    timeout: 500000
  })
}
/**
 * 获取人员-人员关系列表
 * @returns {*}
 */
export function getCoPersonRelationList() {
  console.log('调用getCoPersonRelationList')
  return request({
    url: '/node/getCoPersonRelationList',
    method: 'get',
    timeout: 50000
  })
}

/**
 * 获取主体人-银行持卡关系列表
 * @returns {*}
 */
export function getPersonYinHangChiKaRelationtList() {
  console.log('调用getPersonYinHangChiKaRelationtList')
  return request({
    url: '/node/getPersonYinHangChiKaRelationtList',
    method: 'get',
    timeout: 50000
  })
}

/**
 * 生成测试数据
 * @param projectNum
 * @param batchNum
 * @returns {*}
 */
export function doInsertNodeAndRelation(projectNum,batchNum) {
  console.log('调用doInsertNodeAndRelation')
  return request({
    url: '/test/doInsertNodeAndRelation?projectNum='+projectNum+'&batchNum='+batchNum,
    method: 'get',
    timeout: 500000000
  })
}
