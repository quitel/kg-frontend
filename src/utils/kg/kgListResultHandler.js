import request from '@/utils/request'

// 节点类型
export const nodeCategory = new Map();
nodeCategory.set(0,"人员");
nodeCategory.set(1,"机构信息");
// nodeCategory.set(15,"入住信息");
nodeCategory.set(2,"房产");
nodeCategory.set(3,"机动车信息");
// nodeCategory.set(4,"婚姻");
// nodeCategory.set(5,"机动车违章");
// nodeCategory.set(6,"机动车信息");
// nodeCategory.set(7,"机构相关人员");
// nodeCategory.set(8,"机构信息");
// nodeCategory.set(9,"通讯机主");
// nodeCategory.set(10,"呼叫");
// nodeCategory.set(11,"同户信息");
// nodeCategory.set(12,"银行持卡人");
// nodeCategory.set(13,"银行流水");
// nodeCategory.set(14,"云搜关系人");


/**
 * 对传入的结果集处理，渲染到关系图中
 * @param responseData
 * @param option
 * @returns {*}
 */
export function personFangChanRelationtListHandler(responseData,option) {
  console.log('调用personFangChanRelationtListHandler')
  for (var i = 0; i < responseData.length; i++) {
    var nodeParent = responseData[i].parent
    var nodeChild = responseData[i].child
    var relation = responseData[i].relation
    nodeParent.category = 0
    nodeParent.symbolSize = 80
    nodeParent.showValue = nodeParent.name

    nodeChild.category = 2
    nodeChild.symbolSize = 50
    nodeChild.showValue = nodeChild.houseLocation
    let showValueList = []
    showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
    showValueList.push('节点ID：'+nodeChild.id)
    showValueList.push('姓名：'+nodeChild.name)
    showValueList.push('所有权人或购房人姓名：'+nodeChild.ownerName)
    showValueList.push('共有权人姓名：'+nodeChild.coOwnerName)
    showValueList.push('房产所属地：'+nodeChild.fangChanSuoShuDi)
    showValueList.push('房屋坐落：'+nodeChild.houseLocation)
    nodeChild.showValueList = showValueList

    let showRelationValue ='关系ID：'+responseData[i].id+"</br>"
      +"关系：" + responseData[i].relation+"</br>"
      +"专案ID："+responseData[i].projectId

    option = pushDistinctOption(nodeParent,nodeChild,relation,showRelationValue,responseData[i].id,option)
  }
  return option
}

/**
 * 对传入的结果集处理，渲染到关系图中
 * @param responseData
 * @param option
 * @returns {*}
 */
export function personChengZuoRelationtListHandler(responseData,option) {
  console.log('调用personChengZuoRelationtListHandler')
  for(var i=0;i<responseData.length;i++){
    var nodeParent = responseData[i].parent
    var nodeChild = responseData[i].child
    var relation = responseData[i].relation
    nodeParent.category = 0
    nodeParent.symbolSize = 80
    nodeParent.showValue = nodeParent.name

    nodeChild.category = 1
    nodeChild.symbolSize = 50
    nodeChild.showValue = nodeChild.hangBanCheCi
    let showValueList = []
    showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
    showValueList.push('节点ID：'+nodeChild.id)
    showValueList.push('航班车次：'+nodeChild.hangBanCheCi)
    showValueList.push('航空公司：'+nodeChild.hangKongGongSi)
    showValueList.push('专案ID：'+nodeChild.projectId)
    nodeChild.showValueList = showValueList

    let showRelationValue ='关系ID：'+responseData[i].id+"</br>"
      +"关系：" + responseData[i].relation+"</br>"
      +"出行类别：" + responseData[i].chuXingLeiBie+"</br>"
      +"状态：" + responseData[i].status+"</br>"
      +"起始日期：" + responseData[i].beginDate+"</br>"
      +"终止日期：" + responseData[i].endDate+"</br>"
      +"起始地区：" + responseData[i].qiShiDiQu+"</br>"
      +"到达地区：" + responseData[i].daoDaDiQu+"</br>"
      +"车厢号：" + responseData[i].cheXiangHao+"</br>"
      +"座位房号：" + responseData[i].zuoWeiFangHao+"</br>"
      +"专案ID："+responseData[i].projectId

    option = pushDistinctOption(nodeParent,nodeChild,relation,showRelationValue,responseData[i].id,option)
  }
  return option
}


/**
 * 对传入的结果集处理，渲染到关系图中
 * @param responseData
 * @param option
 * @returns {*}
 */
export function personRuZhuRelationtListHandler(responseData,option) {
  console.log('调用personRuZhuRelationtListHandler')
  for(var i=0;i<responseData.length;i++){
    console.log(responseData[i])
    /**
     * beginDate:"2018-02-22 17:57:19"
     * child:Object
     * endDate:"1900-01-01 00:00:00"
     * id:"5476"
     * parent:Object
     * projectId:"test_230131093423588"
     * relation:"入住"
     * zuoWeiFangHao:"1207"
     */
    var nodeParent = responseData[i].parent
    var nodeChild = responseData[i].child
    var relation = responseData[i].relation
    nodeParent.category = 0
    nodeParent.symbolSize = 80
    nodeParent.showValue = nodeParent.name

    nodeChild.category = 15
    nodeChild.symbolSize = 50
    nodeChild.showValue = nodeChild.zhuSuMingCheng
    let showValueList = []
    showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
    showValueList.push('节点ID：'+nodeChild.id)
    showValueList.push('住宿名称：'+nodeChild.zhuSuMingCheng)
    showValueList.push('专案ID：'+nodeChild.projectId)
    nodeChild.showValueList = showValueList

    //关系的属性
    // let showRelationValueList = []
    // showRelationValueList.push('起始日期：'+relation.beginDate)
    // showRelationValueList.push('终止日期：'+relation.endDate)
    // showRelationValueList.push('座位房号：'+relation.zuoWeiFangHao)
    // showRelationValueList.push('专案ID：'+relation.projectId)
    let showRelationValue ='关系ID：'+responseData[i].id+"</br>"
      +"关系：" + responseData[i].relation+"</br>"
      +"起始日期：" + responseData[i].beginDate+"</br>"
      +"终止日期："+responseData[i].endDate+"</br>"
      +"座位房号："+responseData[i].zuoWeiFangHao+"</br>"
      +"专案ID："+responseData[i].projectId


    // relation.showRelationValueList = showRelationValueList
    option = pushDistinctOption(nodeParent,nodeChild,relation,showRelationValue,responseData[i].id,option)
  }
  return option
}
/**
 * 对传入的结果集处理，渲染到关系图中
 * @param responseData
 * @param option
 * @returns {*}
 */
export function personHuJiRelationtListHandler(responseData,option) {
  console.log('调用personHuJiRelationtListHandler')
  for(var i=0;i<responseData.length;i++){
    var nodeParent = responseData[i].parent
    var nodeChild = responseData[i].child
    var relation = responseData[i].relation
    nodeParent.category = 0
    nodeParent.symbolSize = 80
    nodeParent.showValue = nodeParent.name

    nodeChild.category = 3
    nodeChild.symbolSize = 50
    nodeChild.showValue = nodeChild.huJiDi
    let showValueList = []
    showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
    showValueList.push('节点ID：'+nodeChild.id)
    showValueList.push('姓名：'+nodeChild.name)
    showValueList.push('性别：'+nodeChild.gender)
    showValueList.push('民族：'+nodeChild.nation)
    showValueList.push('户籍地：'+nodeChild.huJiDi)
    showValueList.push('出生日期：'+nodeChild.birthday)
    showValueList.push('户籍地登记地址：'+nodeChild.huJiDiDengJiDiZhi)
    showValueList.push('户籍地派出所：'+nodeChild.huJiDiPaiChuSuo)
    showValueList.push('婚姻状况：'+nodeChild.maritalStatus)
    nodeChild.showValueList = showValueList

    let showRelationValue ='关系ID：'+responseData[i].id+"</br>"
      +"关系：" + responseData[i].relation+"</br>"
      +"专案ID："+responseData[i].projectId

    option = pushDistinctOption(nodeParent,nodeChild,relation,showRelationValue,responseData[i].id,option)
  }
  return option
}


/**
 * 对传入的结果集处理，渲染到关系图中
 * @param responseData
 * @param option
 * @returns {*}
 */
export function personHunYinRelationtListHandler(responseData,option) {
  console.log('调用personHunYinRelationtListHandler')
  for(var i=0;i<responseData.length;i++){
    var nodeParent = responseData[i].parent
    var nodeChild = responseData[i].child
    var relation = responseData[i].relation
    nodeParent.category = 0
    nodeParent.symbolSize = 80
    nodeParent.showValue = nodeParent.name

    nodeChild.category = 4
    nodeChild.symbolSize = 50
    nodeChild.showValue = nodeChild.regDepartName
    let showValueList = []
    showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
    showValueList.push('节点ID：'+nodeChild.id)
    showValueList.push('男方姓名：'+nodeChild.manName)
    showValueList.push('男方公民身份号码：'+nodeChild.manIdNum)
    showValueList.push('女方姓名：'+nodeChild.womanName)
    showValueList.push('女方公民身份号码：'+nodeChild.womanIdNum)
    showValueList.push('登记日期：'+nodeChild.regDate)
    showValueList.push('登记机关名称：'+nodeChild.regDepartName)
    showValueList.push('入库时间：'+nodeChild.ruKuTime)
    showValueList.push('批次号：'+nodeChild.batchNum)
    nodeChild.showValueList = showValueList

    // 鼠标悬浮关系时的提示
    let showRelationValue ='关系ID：'+responseData[i].id+"</br>"
      +"关系：" + responseData[i].relation+"</br>"
      +"专案ID："+responseData[i].projectId

    option = pushDistinctOption(nodeParent,nodeChild,relation,showRelationValue,responseData[i].id,option)
  }
  return option
}
/**
 * 对传入的结果集处理，渲染到关系图中
 * @param responseData
 * @param option
 * @returns {*}
 */
export function personWeiZhangRelationtListHandler(responseData,option) {
  console.log('调用personWeiZhangRelationtListHandler')
  for(var i=0;i<responseData.length;i++){
    var nodeParent = responseData[i].parent
    var nodeChild = responseData[i].child
    var relation = responseData[i].relation
    nodeParent.category = 0
    nodeParent.symbolSize = 80
    nodeParent.showValue = nodeParent.name

    nodeChild.category = 5
    nodeChild.symbolSize = 50
    nodeChild.showValue = nodeChild.weiFaAction
    let showValueList = []
    showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
    showValueList.push('节点ID：'+nodeChild.id)
    showValueList.push('姓名：'+nodeChild.name)
    showValueList.push('驾驶证号：'+nodeChild.driverLicenseNum)
    showValueList.push('号牌种类：'+nodeChild.numberPlateType)
    showValueList.push('号牌号码：'+nodeChild.numberPlateNum)
    showValueList.push('违法时间：'+nodeChild.weiFaTime)
    showValueList.push('违法行为：'+nodeChild.weiFaAction)
    showValueList.push('违法地点：'+nodeChild.weiFaPlace)
    showValueList.push('处理时间：'+nodeChild.processingTime)
    showValueList.push('处理机关名称：'+nodeChild.chuLiJiGuanName)
    nodeChild.showValueList = showValueList

    // 鼠标悬浮关系时的提示
    let showRelationValue ='关系ID：'+responseData[i].id+"</br>"
      +"关系：" + responseData[i].relation+"</br>"
      +"专案ID："+responseData[i].projectId

    option = pushDistinctOption(nodeParent,nodeChild,relation,showRelationValue,responseData[i].id,option)
  }
  return option

}
/**
 * 对传入的结果集处理，渲染到关系图中
 * @param responseData
 * @param option
 * @returns {*}
 */
export function personJiDongCheRelationtListHandler(responseData,option) {
  console.log('调用personJiDongCheRelationtListHandler')
  for(var i=0;i<responseData.length;i++){
    var nodeParent = responseData[i].parent
    var nodeChild = responseData[i].child
    var relation = responseData[i].relation
    nodeParent.category = 0
    nodeParent.symbolSize = 80
    nodeParent.showValue = nodeParent.name

    nodeChild.category = 6
    nodeChild.symbolSize = 50
    nodeChild.showValue = nodeChild.carBrand
    let showValueList = []
    showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
    showValueList.push('节点ID：'+nodeChild.id)
    showValueList.push('机动车所有人：'+nodeChild.carOwner)
    showValueList.push('号牌种类：'+nodeChild.haoPaiType)
    showValueList.push('号牌号码：'+nodeChild.numberPlateNum)
    showValueList.push('车辆品牌：'+nodeChild.carBrand)
    showValueList.push('车身颜色：'+nodeChild.carBodyColor)
    showValueList.push('车辆识别代号：'+nodeChild.carIdentificationCode)
    showValueList.push('发动机号：'+nodeChild.engineNum)
    showValueList.push('机动车状态：'+nodeChild.carStatus)
    showValueList.push('出厂日期：'+nodeChild.factoryDate)
    nodeChild.showValueList = showValueList

    // 鼠标悬浮关系时的提示
    let showRelationValue ='关系ID：'+responseData[i].id+"</br>"
      +"关系：" + responseData[i].relation+"</br>"
      +"专案ID："+responseData[i].projectId

    option = pushDistinctOption(nodeParent,nodeChild,relation,showRelationValue,responseData[i].id,option)
  }
  return option

}
/**
 * 对传入的结果集处理，渲染到关系图中
 * @param responseData
 * @param option
 * @returns {*}
 */
export function personXiangGuanRenYuanRelationtListHandler(responseData,option) {
  console.log('调用personXiangGuanRenYuanRelationtListHandler')
  for(var i=0;i<responseData.length;i++){
    var nodeParent = responseData[i].parent
    var nodeChild = responseData[i].child
    var relation = responseData[i].relation
    nodeParent.category = 0
    nodeParent.symbolSize = 80
    nodeParent.showValue = nodeParent.name

    nodeChild.category = 7
    nodeChild.symbolSize = 50
    nodeChild.showValue = nodeChild.associatedObjectName
    let showValueList = []
    showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
    showValueList.push('节点ID：'+nodeChild.id)
    showValueList.push('市场主体名称：'+nodeChild.marketBodyName)
    showValueList.push('关联对象名称：'+nodeChild.associatedObjectName)
    showValueList.push('关联类型：'+nodeChild.relationType)
    showValueList.push('出资时间：'+nodeChild.fundingTime)
    showValueList.push('出资方式：'+nodeChild.fundingMethod)
    showValueList.push('认缴出资额：'+nodeChild.contribution)
    showValueList.push('出资比例：'+nodeChild.contributionRatio)
    nodeChild.showValueList = showValueList

    // 鼠标悬浮关系时的提示
    let showRelationValue ='关系ID：'+responseData[i].id+"</br>"
      +"关系：" + responseData[i].relation+"</br>"
      +"专案ID："+responseData[i].projectId

    option = pushDistinctOption(nodeParent,nodeChild,relation,showRelationValue,responseData[i].id,option)
  }
  return option

}
/**
 * 对传入的结果集处理，渲染到关系图中
 * @param responseData
 * @param option
 * @returns {*}
 */
export function personJiGouRelationtListHandler(responseData,option) {
  console.log('调用personJiGouRelationtListHandler')
  for(var i=0;i<responseData.length;i++){
    var nodeParent = responseData[i].parent
    var nodeChild = responseData[i].child
    var relation = responseData[i].relation
    nodeParent.category = 0
    nodeParent.symbolSize = 80
    nodeParent.showValue = nodeParent.name

    nodeChild.category = 8
    nodeChild.symbolSize = 50
    nodeChild.showValue = nodeChild.marketBodyName
    let showValueList = []
    showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
    showValueList.push('节点ID：'+nodeChild.id)
    showValueList.push('市场主体名称：'+nodeChild.marketBodyName)
    showValueList.push('行业类型：'+nodeChild.industryType)
    showValueList.push('开业（设立）日期：'+nodeChild.openDate)
    showValueList.push('经营状态：'+nodeChild.businessStatus)
    showValueList.push('经营期限自：'+nodeChild.operatingPeriodFrom)
    showValueList.push('经营期限至：'+nodeChild.operatingPeriodTo)
    showValueList.push('注册资本（万元）：'+nodeChild.registCapital)
    nodeChild.showValueList = showValueList

    // 鼠标悬浮关系时的提示
    let showRelationValue ='关系ID：'+responseData[i].id+"</br>"
      +"关系：" + responseData[i].relation+"</br>"
      +"专案ID："+responseData[i].projectId

    option = pushDistinctOption(nodeParent,nodeChild,relation,showRelationValue,responseData[i].id,option)
  }
  return option

}
/**
 * 对传入的结果集处理，渲染到关系图中
 * @param responseData
 * @param option
 * @returns {*}
 */
export function personTongXunJiZhuRelationtListHandler(responseData,option) {
  console.log('调用personTongXunJiZhuRelationtListHandler')
  for(var i=0;i<responseData.length;i++){
    var nodeParent = responseData[i].parent
    var nodeChild = responseData[i].child
    var relation = responseData[i].relation
    nodeParent.category = 0
    nodeParent.symbolSize = 80
    nodeParent.showValue = nodeParent.name

    nodeChild.category = 9
    nodeChild.symbolSize = 50
    nodeChild.showValue = nodeChild.operators
    let showValueList = []
    showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
    showValueList.push('节点ID：'+nodeChild.id)
    showValueList.push('运营商：'+nodeChild.operators)
    showValueList.push('号码：'+nodeChild.phoneNum)
    showValueList.push('当前状态'+nodeChild.currentState)
    showValueList.push('类别：'+nodeChild.category)
    showValueList.push('类型：'+nodeChild.kaiTongDate)
    showValueList.push('开通日期：'+nodeChild.operatingPeriodTo)
    showValueList.push('开通网点'+nodeChild.kaiTongLocation)
    nodeChild.showValueList = showValueList

    // 鼠标悬浮关系时的提示
    let showRelationValue ='关系ID：'+responseData[i].id+"</br>"
      +"关系：" + responseData[i].relation+"</br>"
      +"专案ID："+responseData[i].projectId

    option = pushDistinctOption(nodeParent,nodeChild,relation,showRelationValue,responseData[i].id,option)
  }
  return option

}


/**
 * 对传入的结果集处理，渲染到关系图中
 * @param responseData
 * @param option
 * @returns {*}
 *
 * {
 *             "baseCid": "",
 *             "baseNum": "：",
 *             "calledArea": "",
 *             "callingArea": "临河市",
 *             "callingCalled": "被叫",
 *             "child": {
 *                 "id": "147",
 *                 "jiZhuId": "",
 *                 "jiZhuName": "",
 *                 "phoneNum": "18800749999",
 *                 "projectId": "test_230131093423588"
 *             },
 *             "comDate": "2019-10-17 09:34:52",
 *             "comTime": "",
 *             "comType": "通话",
 *             "id": "22853",
 *             "parent": {
 *                 "id": "5",
 *                 "phoneNum": "14800661959",
 *                 "projectId": "test_230131093423588"
 *             },
 *             "phoneImei": "",
 *             "projectId": "test_230131093423588",
 *             "relation": "呼叫",
 *             "talkTime": "7分52秒",
 *             "villageLac": ""
 *         },
 */
export function personCallRelationtListHandler(responseData,option) {
  console.log('调用personCallRelationtListHandler')
  for(var i=0;i<responseData.length;i++){
    var nodeParent = responseData[i].parent
    var nodeChild = responseData[i].child
    var relation = responseData[i].relation
    nodeParent.category = 9
    nodeParent.symbolSize = 50
    nodeParent.showValue = nodeParent.phoneNum

    nodeChild.category = 9
    nodeChild.symbolSize = 50
    nodeChild.showValue = nodeChild.phoneNum
    let showValueList = []
    showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
    showValueList.push('节点ID：'+nodeChild.id)
    showValueList.push('号码：'+nodeChild.phoneNum)
    showValueList.push('机主名称：'+nodeChild.jiZhuName)
    showValueList.push('机主证件号：'+nodeChild.jiZhuId)
    showValueList.push('运营商：'+nodeChild.operators)
    showValueList.push('当前状态：'+nodeChild.currentState)
    showValueList.push('类别：'+nodeChild.category)
    showValueList.push('类型：'+nodeChild.type)
    showValueList.push('开通日期：'+nodeChild.kaiTongDate)
    showValueList.push('开通网点：'+nodeChild.kaiTongLocation)
    showValueList.push('专案ID：'+nodeChild.projectId)
    nodeChild.showValueList = showValueList

    let showRelationValue ='关系ID：'+responseData[i].id+"</br>"
      +"关系：" + responseData[i].relation+"</br>"
      +"通讯日期：" + responseData[i].comDate+"</br>"
      +"通讯时间：" + responseData[i].comTime+"</br>"
      +"通话类型：" + responseData[i].comType+"</br>"
      +"主叫被叫：" + responseData[i].callingCalled+"</br>"
      +"主叫地区：" + responseData[i].callingArea+"</br>"
      +"被叫地区：" + responseData[i].calledArea+"</br>"
      +"通话时长：" + responseData[i].talkTime+"</br>"
      +"手机串号：" + responseData[i].phoneImei+"</br>"
      +"基站编码：" + responseData[i].baseNum+"</br>"
      +"基站号CID：" + responseData[i].baseCid+"</br>"
      +"小区号LAC：" + responseData[i].villageLac+"</br>"
      +"专案ID："+responseData[i].projectId

    option = pushDistinctOption(nodeParent,nodeChild,relation,showRelationValue,responseData[i].id,option)
  }
  return option
}

/**
 * 对传入的结果集处理，渲染到关系图中
 * @param responseData
 * @param option
 * @returns {*}
 */
export function coPersonRelationtListHandler(responseData,option) {
  console.log('调用coPersonRelationtListHandler')
  for(var i=0;i<responseData.length;i++) {
    var nodeParent = responseData[i].parent
    var nodeChild = responseData[i].child
    var relation = responseData[i].relation
    nodeParent.category = 0
    nodeParent.symbolSize = 80
    nodeParent.showValue = nodeParent.name

    nodeChild.category = 0
    nodeChild.symbolSize = 80
    nodeChild.showValue = nodeChild.name
    let showValueList = []
    showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
    showValueList.push('节点ID：'+nodeChild.id)
    showValueList.push('姓名：'+nodeChild.name)
    showValueList.push('身份证号：'+nodeChild.idNum)
    nodeChild.showValueList = showValueList

    // 鼠标悬浮关系时的提示
    let showRelationValue ='关系ID：'+responseData[i].id+"</br>"
      +"关系：" + responseData[i].relation+"</br>"
      +"专案ID："+responseData[i].projectId

    option = pushDistinctOption(nodeParent,nodeChild,relation,showRelationValue,responseData[i].id,option)
  }
  return option
}

/**
 * 对传入的结果集处理，渲染到关系图中
 * @param responseData
 * @param option
 * @returns {*}
 */
export function personYinHangChiKaRelationtListHandler(responseData,option) {
  console.log('调用personYinHangChiKaRelationtListHandler')
  for(var i=0;i<responseData.length;i++){
    var nodeParent = responseData[i].parent
    var nodeChild = responseData[i].child
    var relation = responseData[i].relation
    nodeParent.category = 0
    nodeParent.symbolSize = 80
    nodeParent.showValue = nodeParent.name

    nodeChild.category = 12
    nodeChild.symbolSize = 50
    nodeChild.showValue = nodeChild.bank
    let showValueList = []
    showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
    showValueList.push('节点ID：'+nodeChild.id)
    showValueList.push('姓名：'+nodeChild.name)
    showValueList.push('开户银行：'+nodeChild.bank)
    showValueList.push('账号：'+nodeChild.zhangHao)
    showValueList.push('卡号：'+nodeChild.kaHao)
    nodeChild.showValueList = showValueList

    // 鼠标悬浮关系时的提示
    let showRelationValue ='关系ID：'+responseData[i].id+"</br>"
      +"关系：" + responseData[i].relation+"</br>"
      +"专案ID："+responseData[i].projectId

    option = pushDistinctOption(nodeParent,nodeChild,relation,showRelationValue,responseData[i].id,option)
  }
  return option
}

function pushDistinctOption(nodeParent,nodeChild,relation,showRelationValue,relationId,option){
  let showValueList = []
  showValueList.push('节点类型：'+nodeCategory.get(nodeParent.category))
  showValueList.push('节点ID：'+nodeParent.id)
  showValueList.push('姓名：'+nodeParent.name)
  showValueList.push('身份证号：'+nodeParent.idNum)
  nodeParent.showValueList = showValueList


  if(relation.showRelationValueList!=null && relation.showRelationValueList.length>0 ){
    for(let i =0;i<relation.showRelationValueList.length;i++){
      showRelationValue += relation.showRelationValueList[i]+"</br>"
    }
  }

  let relationShip = {
    id: relationId,
    source: nodeParent.id,
    target: nodeChild.id,
    name: relation,
    des: showRelationValue
  }


  let findList = option.series[0].data.find((item) => {
    return item.id == nodeParent.id
  });
  if(findList==null || findList.length==0){
    option.series[0].data.push(nodeParent)
  }

  findList = option.series[0].data.find((item) => {
    return item.id == nodeChild.id
  });
  if(findList==null || findList.length==0){
    option.series[0].data.push(nodeChild)
  }

  findList = option.series[0].links.find((item) => {
    return item.id == relationShip.id
  });
  if(findList==null || findList.length==0){
    option.series[0].links.push(relationShip)
  }
  return option
}
