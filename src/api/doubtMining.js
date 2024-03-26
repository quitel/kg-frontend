import request from '@/utils/request'
import form from '@/views/form'

/**
 * 调用后端接口，传入主体人idNum，获取其可疑行为
 */

/**
 * 获取频繁通讯-人物节点关系列表
 * @returns {*}
 */
export function getPersonTongXinPinFanRelationtList(idNum,projectId,weight) {
  console.log('调用getPersonTongXinPinFanRelationtList')
  return request({
    url: '/node/getTongXinPinFanPersonList?idNum='+idNum+'&projectId='+projectId+'&weight='+weight,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取可以分数
 * @returns {*}
 */
export function getBertModelScores(strList,projectId) {
  console.log(strList)
  let f_list = []
  for (let item of strList.keys()) {
    f_list.push(
      {
        "idNum" : item,
        "feature":strList.get(item)
      }
    )
  }

  console.log('调用getBertModelScores')
  console.log(f_list)
  return request({
    url: '/node/getBertModelScores',
    method: 'post',
    data: {
      list:f_list,
      projectId:projectId
    },
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    timeout: 50000000,
  })
}
export function getBertModelScoresByGet(strList,projectId) {
  console.log(strList)
  let f_list = []
  for (let item of strList.keys()) {
    f_list.push(
      {
        "idNum" : item,
        "feature":strList.get(item)
      }
    )
  }
  var param = {
    list:f_list,
    projectId:projectId
  }
  var json = JSON.stringify(param)
  console.log('调用getBertModelScoresByGet')
  return request({
    url: '/node/getBertModelScoresByGet?param='+encodeURI(json),
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取关系、房产列表
 * @returns {*}
 */
export function getPersonWithTooManyHousesInfo(idNum,projectId,weight) {
  console.log('调用getPersonWithTooManyHousesInfo')
  return request({
    url: '/node/getPersonWithTooManyHousesInfo?idNum='+idNum+'&projectId='+projectId+'&weight='+weight,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取关系、机构列表
 * @returns {*}
 */
export function getPersonWithTooManyJiGouInfo(idNum,projectId,weight) {
  console.log('调用getPersonWithTooManyJiGouInfo')
  return request({
    url: '/node/getPersonWithTooManyJiGouInfo?idNum='+idNum+'&projectId='+projectId+'&weight='+weight,
    method: 'get',
    timeout: 50000000,
  })
}

/**
 * 获取关系、吉利数交易列表
 * @returns {*}
 */
export function getKeYiJiaoYiPersonList(idNum,projectId,weight) {
  console.log('调用getKeYiJiaoYiPersonList')
  return request({
    url: '/node/getKeYiJiaoYiPersonList?idNum='+idNum+'&projectId='+projectId+'&weight='+weight,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取凌晨频繁交易列表
 * @returns {*}
 */
export function getLingChenJiaoYiPersonList(idNum,projectId,weight) {
  console.log('调用getLingChenJiaoYiPersonList')
  return request({
    url: '/node/getLingChenJiaoYiPersonList?idNum='+idNum+'&projectId='+projectId+'&weight='+weight,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取名下机动车过多的主体人和家人
 * @returns {*}
 */
export function getPersonWithTooManyJiDongCheInfo(idNum,projectId,weight) {
  console.log(weight)
  console.log('调用getPersonWithTooManyJiDongCheInfo')
  return request({
    url: '/node/getPersonWithTooManyJiDongCheInfo?idNum='+idNum+'&projectId='+projectId+'&weight='+weight,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取获取主体人频繁整数交易
 * @returns {*}
 */
export function getPinFanZhengShuJiaoYiPersonList(idNum,projectId,weight) {
  console.log('调用getPinFanZhengShuJiaoYiPersonList')
  return request({
    url: '/node/getPinFanZhengShuJiaoYiPersonList?idNum='+idNum+'&projectId='+projectId+'&weight='+weight,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取同行人员列表
 * @returns {*}
 */
export function getTongXingPersonList(idNumList,projectId) {
  console.log('调用getTongXingPersonList')
  return request({
    url: '/node/getTongXingPersonList',
    method: 'post',
    data:{
      objectList:idNumList,
      projectId:projectId
    },
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    timeout: 50000000,
  })
}
export function getTongXingPersonListByGet(idNumList,projectId) {
  console.log('调用getTongXingPersonList')
  var paramBody = {
    objectList:idNumList,
    projectId:projectId
  }
  var json = JSON.stringify(paramBody);
  return request({
    url: '/node/getTongXingPersonListByGet?param='+encodeURI(json),
    method: 'get',
    timeout: 50000000,
    // headers: {
    //   "Access-Control-Allow-Origin": "*"
    // },
  })
}
/**
 * 获取所有主体人信息
 * @returns {*}
 */
export function getAllMainBodyInfo(projectId) {
  console.log('调用getAllMainBodyInfo')
  return request({
    url: '/node/listAllPerson?projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}

/**
 * 获取目标对象和其三跳内人物
 * @param projectId
 * @param idNum
 * @returns {AxiosPromise}
 */
export function getMainBodyAndCoPersonInfo(projectId,idNum) {
  console.log('调用getMainBodyAndCoPersonInfo')
  return request({
    url: '/node/listMainBodyAndCoPerson?projectId='+projectId+'&idNum='+idNum,
    method: 'get',
    timeout: 50000000,
  })
}

/**
 * 获取已经追加的人物
 * @param projectId
 * @param idNum
 * @returns {AxiosPromise}
 */
export function getAddPerson(projectId,idNum) {
  console.log('调用getAddPerson')
  return request({
    url: '/node/listAllAddPerson?projectId='+projectId+'&idNum='+idNum,
    method: 'get',
    timeout: 50000000,
  })
}
export function getsaveRelation(projectId,idNum) {
  console.log('调用getsaveRelation')
  return request({
    url: '/node/listAllSaveRelation?projectId='+projectId+'&idNum='+idNum,
    method: 'get',
    timeout: 50000000,
  })
}

/**
 * 根据身份证号找人
 * @param projectId
 * @param idNum
 * @returns {AxiosPromise}
 */
export function getPersonByIdNumInfo(projectId,idNum) {
  console.log('调用getPersonByIdNumInfo')
  return request({
    url: '/node/findByIdNum?projectId='+projectId+'&idNum='+idNum,
    method: 'get',
    timeout: 50000000,
  })
}

/**
 * 获取所有专案id
 * @returns {*}
 */
export function getAllDataBaseId(usrId) {
  console.log('调用getAllMainBodyInfo')
  return request({
    url: 'db/2neo4j/getAllDataBaseId?usrId='+usrId,
    method: 'get',
    timeout: 50000,
  })
}

export function getImgURL(projectId, idNum) {
  console.log('调用queryImgUrl')
  return request({
    url: 'test/getImgURL?projectId='+projectId+'&idNum='+idNum,
    method: 'get',
    timeout: 50000,
  })
}

/**
 * 根据用户id和专案id判断是否合法
 * @returns {*}
 */
export function getHeFaInfo(usrId,projectId) {
  console.log('getHeFaInfo')
  return request({
    url: 'db/2neo4j/getHeFaInfo?usrId='+usrId+'&projectId='+projectId,
    method: 'get',
    timeout: 500000,
  })
}
export function getExeTime(projectId) {
  console.log("getTime："+projectId)
  return request({
    url: 'test/testTime?projectId='+projectId,
    method: 'get',
    timeout: 500000,
  })
}

/**
 * 获取专案数据是否被拉取过
 * @returns {*}
 */
export function getSmFlag(projectId,sm) {
  console.log('getSmFlag')
  return request({
    url: 'db/2neo4j/getSmFlag?projectId='+projectId+'&sm='+sm,
    method: 'get',
    timeout: 50000000,
  })
}

/**
 * 获取专案数据是否被打过分数
 * @param projectId
 * @returns {AxiosPromise}
 */
export function getDaFenFlag(projectId) {
  console.log('getDaFenFlag')
  return request({
    url: 'db/2neo4j/getDaFenFlag?projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}

export function getModelScore(list,projectId) {
  console.log('getModelScore')
  return request({
    url: '/node/getModelScore',
    method: 'post',
    data:{
      list:list,
      projectId:projectId
    },
    // headers: {
    //   "Content-Type": "application/json;charset=UTF-8"
    // },
    timeout: 50000000,
  })
}
/**
 * 获取主体人吉利数交易明细列表
 * @returns {*}
 */
export function getJiaoYiDetailList(idNum,duiFangZhangHao,projectId) {
  console.log('getJiaoYiDetailList')
  return request({
    url: '/node/getJiaoYiDetailList?idNum='+idNum+'&duiFangZhangHao='+duiFangZhangHao+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取主体人吉利数交易明细列表
 * @returns {*}
 */
export function getTongXunDetailList(idNum,duiFangIdNum,projectId) {
  console.log('getTongXunDetailList')
  return request({
    url: '/node/getTongXunDetailList?idNum='+idNum+'&duiFangIdNum='+duiFangIdNum+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取主体人凌晨交易明细列表
 * @returns {*}
 */
export function getLingChenJiaoYiDetailList(idNum,duiFangZhangHao,projectId) {
  console.log('getLingChenJiaoYiDetailList')
  return request({
    url: 'node/getLingChenJiaoYiDetailList?idNum='+idNum+'&duiFangZhangHao='+duiFangZhangHao+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取主体人频繁整数交易明细列表
 * @returns {*}
 */
export function getPinFanZhengShuJiaoYiDetailList(idNum,duiFangZhangHao,dateList,projectId) {
  console.log('getPinFanZhengShuJiaoYiDetailList')
  return request({
    url: 'node/getPinFanZhengShuJiaoYiDetailList?idNum='+idNum+'&duiFangZhangHao='+duiFangZhangHao+'&dateList='+dateList+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}

/**
 * 获取主体人吉利数交易明细列表
 * @returns {*}
 */
export function getJiLiShuJiaoYiDetailList(idNum,duiFangZhangHao,projectId) {
  console.log('getJiLiShuJiaoYiDetailList')
  return request({
    url: 'node/getJiLiShuJiaoYiDetailList?idNum='+idNum+'&duiFangZhangHao='+duiFangZhangHao+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取主体人机动车信息明细列表
 * @returns {*}
 */
export function getJiDongCheDetailList(idNum,projectId) {
  console.log('getJiDongCheDetailList')
  return request({
    url: 'node/getJiDongCheDetailList?idNum='+idNum+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}

/**
 * 获取主体人房产信息明细列表
 * @returns {*}
 */
export function getFangChanDetailList(idNum,projectId) {
  console.log('getFangChanDetailList')
  return request({
    url: 'node/getFangChanDetailList?idNum='+idNum+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取主体人机构明细列表
 * @returns {*}
 */
export function getJiGouDetailList(idNum,projectId) {
  console.log('getJiGouDetailList')
  return request({
    url: 'node/getJiGouDetailList?idNum='+idNum+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取同行明细列表
 * @returns {*}
 */
export function getTongXingDetailList(m_idNum,o_idNum,projectId) {
  console.log('getTongXingDetailList')
  return request({
    url: 'node/getTongXingDetailList?m_idNum=' + m_idNum + '&o_idNum=' + o_idNum + '&projectId=' + projectId,
    method: 'get',
    timeout: 50000000,
  })
}

/**
 * 获取主体人的机构相关人员明细列表
 * @returns {*}
 */
export function getXiangGuanRenYuanDetailList(idNum,id,projectId) {
  console.log('getXiangGuanRenYuanDetailList')
  return request({
    url: 'node/getXiangGuanRenYuanDetailList?idNum=' + idNum + '&id=' + id + '&projectId=' + projectId,
    method: 'get',
    timeout: 50000000,
  })
}

/**
 * 获取主体人的当月通信明细列表
 * @returns {*}
 */
export function getTongXinDetailList(parentPhoneNum,childPhoneNum,comDateList,projectId) {
  console.log('getTongXinDetailList')
  return request({
    url: 'node/getTongXinDetailList?parentPhoneNum=' + parentPhoneNum + '&childPhoneNum=' + childPhoneNum+'&comDateList='+comDateList + '&projectId=' + projectId,
    method: 'get',
    timeout: 50000000,
  })
}

/**
 * 将所有可疑人员的特征和人工标注的分数传递给后端，调用模型训练
 * @returns {*}
 */
export function trainModel(featureScore) {
  console.log('trainModel')
  return request({
    url: 'node/trainModel',
    method: 'post',
    data: featureScore,
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    timeout: 50000000,
  })
}
export function trainModelByGet(featureScore) {
  console.log('trainModel')
  var json = JSON.stringify(featureScore);
  return request({
    url: 'node/trainModel?featureScore='+encodeURI(json),
    method: 'get',
    timeout: 50000000,
  })
}

/**
 * 获取通信次数
 * @param idNum
 * @param reletantidNums
 * @param projectId
 * @returns {AxiosPromise}
 */
export function getTongXinCount(idNum,reletantidNums,projectId) {
  console.log('调用getTongXinCount')
  return request({
    url: '/node/getTongXinCount?idNum='+idNum+'&reletantidNums='+reletantidNums+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}

/**
 * 获取交易次数
 * @param idNum
 * @param reletantidNums
 * @param projectId
 * @returns {AxiosPromise}
 */
export function getJiaoYiCount(idNum,reletantidNums,projectId) {
  console.log('调用getJiaoYiCount')
  return request({
    url: '/node/getJiaoYiCount?idNum='+idNum+'&reletantidNums='+reletantidNums+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
export function getTongXing(idNum,reletantidNums,projectId) {
  console.log('调用getTongXing')
  return request({
    url: '/node/getTongXing?idNum='+idNum+'&reletantidNums='+reletantidNums+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取房子
 * @param idNum
 * @param projectId
 * @returns {AxiosPromise}
 */
export function getPersonHouseList(idNum,projectId) {
  console.log('调用getPersonHouseList')
  return request({
    url: '/node/getPersonHouseList?idNum='+idNum+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取机动车
 * @param idNum
 * @param projectId
 * @returns {AxiosPromise}
 */
export function getPersonJiDongCheList(idNum,projectId) {
  console.log('调用getPersonJiDongCheList')
  return request({
    url: '/node/getPersonJiDongCheList?idNum='+idNum+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取相关机构
 * @param idNum
 * @param projectId
 * @returns {AxiosPromise}
 */
export function getPersonJiGouList(idNum,projectId) {
  console.log('调用getPersonJiGouList')
  return request({
    url: '/node/getPersonJiGouList?idNum='+idNum+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}

/**
 * 添加标记的人物关系
 * @param idNum
 * @param relationBodyIdNum
 * @param relation
 * @param projectId
 * @returns {AxiosPromise}
 */
export function addPersonRelation(idNum,relationBodyIdNum,relation,projectId) {
  console.log('调用addPersonRelation')
  return request({
    url: '/db/2neo4j/addPersonRelation?idNum='+idNum+'&relationBodyIdNum='+relationBodyIdNum+'&relation='+relation+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
export function addAllPersonRelation(idNum,relationBodyIdNums,relation,projectId) {
  console.log('调用addPersonRelation')
  return request({
    url: '/db/2neo4j/addAllPersonRelation?idNum='+idNum+'&relationBodyIdNums='+relationBodyIdNums+'&relation='+relation+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}


/**
 * 删除标记的人物关系
 * @param idNum
 * @param relationBodyIdNum
 * @param relation
 * @param projectId
 * @returns {AxiosPromise}
 */
export function deletePersonRelation(idNum,relationBodyIdNums,relation,projectId) {
  console.log('调用deletePersonRelation')
  return request({
    url: '/db/2neo4j/deletePersonRelation?idNum='+idNum+'&relationBodyIdNums='+relationBodyIdNums+'&relation='+relation+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}

export function deleteAddPersonRelation(idNum,relationBodyIdNums,relation,projectId) {
  console.log('调用deletePersonRelation')
  return request({
    url: '/db/2neo4j/deleteAddPersonRelation?idNum='+idNum+'&relationBodyIdNums='+relationBodyIdNums+'&relation='+relation+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}

export function addData(projectId) {
  console.log('调用addData')
  return request({
    url: '/addData?projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}

// export function addTargetIdNum(projectId,idNum) {
//   console.log('调用addTargetIdNumToRedis')
//   return request({
//     url: '/db/2neo4j/addTargetIdNum?projectId='+projectId+'&idNum='+idNum,
//     method: 'get',
//     timeout: 50000000,
//   })
// }

export function getLabelClassify() {
  console.log('调用addTargetIdNumToRedis')
  return request({
    url: '/manager/labelClassify',
    method: 'get',
    timeout: 50000000,
  })
}

export function getLabelDetail() {
  console.log('调用addTargetIdNumToRedis')
  return request({
    url: '/manager/labelDetail',
    method: 'get',
    timeout: 50000000,
  })
}

export function saveScore(idNum,projectId,score) {
  console.log('调用addTargetIdNumToRedis')
  return request({
    url: '/manager/saveScore?idNum='+idNum+'&projectId='+projectId+'&score='+score,
    method: 'get',
    timeout: 50000000,
  })
}

export function getLabeled(projectId) {
  console.log('调用getLabeled')
  return request({
    url: '/node/getLabeled?projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}

/**
 * 获取规则1的详细信息
 * @returns {*}
 */
export function getRule1DetailList(idNum,ruleId,projectId) {
  return request({
    url: '/node/getRule1DetailList?idNum='+idNum+'&ruleId='+ruleId+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取规则2的详细信息
 * @returns {*}
 */
export function getRule2DetailList(idNum,ruleId,projectId) {
  return request({
    url: '/node/getRule2DetailList?idNum='+idNum+'&ruleId='+ruleId+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取规则3的详细信息
 * @returns {*}
 */
export function getRule3DetailList(idNum,ruleId,projectId) {
  return request({
    url: '/node/getRule3DetailList?idNum='+idNum+'&ruleId='+ruleId+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取规则4的详细信息
 * @returns {*}
 */
export function getRule4DetailList(idNum,ruleId,projectId) {
  return request({
    url: '/node/getRule4DetailList?idNum='+idNum+'&ruleId='+ruleId+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}

/**
 * 获取规则5的详细信息
 * @returns {*}
 */
export function getRule5DetailList(idNum,ruleId,projectId) {
  return request({
    url: '/node/getRule5DetailList?idNum='+idNum+'&ruleId='+ruleId+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取规则6的详细信息
 * @returns {*}
 */
export function getRule6DetailList(idNum,ruleId,projectId) {
  return request({
    url: '/node/getRule6DetailList?idNum='+idNum+'&ruleId='+ruleId+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取规则7的详细信息
 * @returns {*}
 */
export function getRule7DetailList(idNum,ruleId,projectId) {
  return request({
    url: '/node/getRule7DetailList?idNum='+idNum+'&ruleId='+ruleId+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}

/**
 * 获取规则4的详细信息
 * @returns {*}
 */
export function getRule8DetailList(idNum,ruleId,projectId) {
  return request({
    url: '/node/getRule8DetailList?idNum='+idNum+'&ruleId='+ruleId+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取规则10的详细信息
 * @returns {*}
 */
export function getRule10DetailList(idNum,ruleId,projectId) {
  return request({
    url: '/node/getRule10DetailList?idNum='+idNum+'&ruleId='+ruleId+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取规则11的详细信息
 * @returns {*}
 */
export function getRule11DetailList(idNum,ruleId,projectId) {
  return request({
    url: '/node/getRule11DetailList?idNum='+idNum+'&ruleId='+ruleId+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取规则12的详细信息
 * @returns {*}
 */
export function getRule12DetailList(idNum,ruleId,projectId) {
  return request({
    url: '/node/getRule12DetailList?idNum='+idNum+'&ruleId='+ruleId+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取规则14的详细信息
 * @returns {*}
 */
export function getRule14DetailList(idNum,ruleId,projectId) {
  return request({
    url: '/node/getRule14DetailList?idNum='+idNum+'&ruleId='+ruleId+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取规则15的详细信息
 * @returns {*}
 */
export function getRule15DetailList(idNum,ruleId,projectId) {
  return request({
    url: '/node/getRule15DetailList?idNum='+idNum+'&ruleId='+ruleId+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取规则17的详细信息
 * @returns {*}
 */
export function getRule17DetailList(idNum,ruleId,projectId) {
  return request({
    url: '/node/getRule17DetailList?idNum='+idNum+'&ruleId='+ruleId+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
/**
 * 获取规则18的详细信息
 * @returns {*}
 */
export function getRule18DetailList(idNum,ruleId,projectId) {
  return request({
    url: '/node/getRule18DetailList?idNum='+idNum+'&ruleId='+ruleId+'&projectId='+projectId,
    method: 'get',
    timeout: 50000000,
  })
}
