import request from '@/utils/request'

// 节点类型
export const nodeCategory = new Map();
nodeCategory.set(0,"人员");
nodeCategory.set(1,"机构信息");
// nodeCategory.set(15,"入住信息");
nodeCategory.set(2,"房产");
nodeCategory.set(3,"机动车信息");
//nodeCategory.set(0,"人员");
// nodeCategory.set(1,"乘坐信息");
// nodeCategory.set(15,"入住信息");
//nodeCategory.set(2,"房产");
// nodeCategory.set(3,"户籍");
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
 * {
 *             "child": {
 *                 "id": "3488",
 *                 "phoneNum": "13800471189",
 *                 "projectId": "test_230131093423588"
 *             },
 *             "id": "26373",
 *             "parent": {
 *                 "id": "55",
 *                 "idNum": "15012519500101092X",
 *                 "name": "",
 *                 "projectId": "test_230131093423588"
 *             },
 *             "projectId": "test_230131093423588",
 *             "relation": "通讯日期：2019-09到2019-10|一个月内通讯次数63"
 *         }
 */
export function personTongXinPinFanRelationtListHandler(responseData,option,objectList, featureMap, numFeatureMap,analysis=false) {
  // 先清空旧图的节点和边
  // option.series[0].data = []
  // option.series[0].links = []
  // TODO 请严格按照你接口返回的json格式获取数据，要不然都报错了
  console.log('调用personTongXinPinFanRelationtListHandler')
  var path = window.global_config.PHOTOPATH
  if(analysis==true){
    if(responseData.length!=0){
      var nodeParent = responseData[0].parent
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name
      objectList.push(
        {
          "type":"主体人",
          "idNum":nodeParent.idNum,
          "score":responseData.length,
          "show":nodeParent.name
        }
      )
      option = pushMainBodyOption(nodeParent,option)
      return option
    }
  }else {
    let idNum = ''
    let total = 0
    for (var i = 0; i < responseData.length; i++) {
      var nodeParent = responseData[i].parent
      var nodeChild = responseData[i].child

      var parentPhoneNum = responseData[i].relation.split('【特征信息】')[0].split('|')[0]
      var childPhoneNum = responseData[i].relation.split('【特征信息】')[0].split('|')[1]
      var relation = "通信次数：" + responseData[i].relation.split("|*|")[1]
      var relation =responseData[i].relation
      total += Number(responseData[i].relation.split("|*|")[1])
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name
      if(idNum==''){
        idNum = nodeParent.idNum
      }
      var relationColor = "#fffef1"
      if (Number(responseData[i].relation.split("|*|")[1]) <= 90) {
        relationColor = "#519a73"
      } else if (Number(responseData[i].relation.split("|*|")[1]) <= 180) {
        relationColor = "#fa8c35"
      } else {
        relationColor = "#ff2121"
      }
      //要设置category才能显示节点
      nodeChild.category = 0
      nodeChild.symbolSize = 60
      if (nodeChild.name == '未关联') {
        nodeChild.showValue = nodeChild.name
        nodeChild.symbol = 'image://' + require('../../../public/img/phone.svg')
        objectList.push(
          {
            "type":"手机号",
            "idNum":nodeChild.idNum,
            "score":Number(responseData[i].relation.split("|*|")[1]),
            "show":nodeChild.idNum
          }
        )
        let showValueList = []
        // 你接口返回的没有这些数据
        showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
        showValueList.push('节点ID：' + nodeChild.id)
        showValueList.push('姓名：' + '未关联')
        showValueList.push('手机号：' + nodeChild.idNum)
        nodeChild.showValueList = showValueList
      } else {
        nodeChild.showValue = nodeChild.name
        // nodeChild.symbol = 'image://' + require('../../../public/img/person.svg')
        // nodeParent.symbol = 'image://'+'kg/upload_files/230216162113705/images/8a553c1d90c5e1f9f789da6138b48c84.jpeg'
        if(nodeParent.photo==undefined){
          nodeParent.symbol='image://'+require('../../../public/img/person.svg')
        }
        else{
          // console.log('图片路径：'+nodeParent.photo)
          // nodeParent.symbol = 'image://'+'kg/'+nodeParent.photo
          // nodeParent.symbol = 'image://'+'http://szbxc.liaoning.net/'+nodeParent.photo
          // console.log(path)
          nodeParent.symbol = 'image://'+path+nodeParent.photo
        }
        objectList.push(
          {
            "type":"主体人",
            "idNum":nodeChild.idNum,
            "score":Number(responseData[i].relation.split("|*|")[1]),
            "show":nodeChild.name
          }
        )
        let showValueList = []
        showValueList.push('节点ID：' + nodeChild.id)
        showValueList.push('姓名：' + nodeChild.name)
        showValueList.push('身份证：' + nodeChild.idNum)
        nodeChild.showValueList = showValueList
      }
      // 鼠标悬浮关系时的提示
      // 接口数据获取错误，你的接口返回的数据不存在关系id
      let showRelationValue = '关系ID：' + responseData[i].id + "</br>"
        +"手机号："+parentPhoneNum+ '->' + childPhoneNum+"</br>"
        + "关系：" + "</br>" + responseData[i].relation.split('【特征信息】')[1].split("|*|")[0] + "</br>"
        + "专案ID：" + responseData[i].projectId
      // let showRelationValue = '关系ID：' + responseData[i].id + "</br>"
      //   + "关系：" + "</br>" + responseData[i].relation+ "</br>"
      //   + "专案ID：" + responseData[i].projectId
      option = pushDistinctOption(nodeParent, nodeChild, relation, showRelationValue, responseData[i].id, option, relationColor)
    }
    let featureStr = '与'+responseData.length+'个主体人一个月内频繁通信，总共通信次数'+total+'次，平均通信次数：'+Math.round(total/responseData.length)+'次。<SEP>'

    if(featureMap.has(idNum)){
      featureStr = featureMap.get(idNum)  + featureStr
      featureMap.set(idNum,featureStr)
    }else{
      featureMap.set(idNum,featureStr)
    }
    if(numFeatureMap.has(idNum)){
      var personFeatureMap = numFeatureMap.get(idNum)
      personFeatureMap.set("tongXinPinFan",total)
      numFeatureMap.set(idNum,personFeatureMap)
    }else{
      var personFeatureMap = new Map()
      personFeatureMap.set("tongXinPinFan",total)
      numFeatureMap.set(idNum,personFeatureMap)
    }

  }
  return option

}
export function personPartnerRelationtListHandler(responseData,option,relationMap) {
  var path = window.global_config.PHOTOPATH
  if(responseData.personRelation!=null){
    //连接伴侣之间的关系
    var nodeParent = responseData.personRelation.parent
    var nodeChild =  responseData.personRelation.child
    var relation = responseData.personRelation.relation
    let findList = option.series[0].data.find((item) => {
      return item.id == nodeChild.id
    });
    if(findList==null || findList.length==0){
      relationMap.set(nodeChild.idNum,"近亲属")
    }
    console.log("111111111parter")
    //
    // objectList.push(
    //   {
    //     "type":"person",
    //     "idNum":nodeChild.idNum,
    //     "score":nodeParent.idNum
    //   }
    // )
    nodeParent.category = 0
    nodeParent.symbolSize = 100
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
    // nodeChild.symbol='image://'+require('../../../public/img/person.svg')
    if(nodeChild.photo==undefined){
      nodeChild.symbol='image://'+require('../../../public/img/person.svg')
    }
    else{
      // nodeChild.symbol = 'image://'+'kg/'+nodeChild.photo
      // nodeChild.symbol = 'image://'+'http://szbxc.liaoning.net/'+nodeChild.photo
      nodeChild.symbol = 'image://'+path+nodeParent.photo
    }

    let showRelationValue ='关系ID：'+responseData.personRelation.id+"</br>"
      +"关系：" + responseData.personRelation.relation+"</br>"
      +"专案ID："+responseData.personRelation.projectId
    option = pushDistinctOption(nodeParent,nodeChild,relation,showRelationValue,responseData.personRelation.id,option,"#fffef1")
    return option
  }
}
export function personHousesRelationtListHandler(responseData,option,objectList,featureMap,numFeatureMap,analysis=false) {
  console.log("houserelation:"+analysis)
  // TODO 请严格按照你接口返回的json格式获取数据，要不然都报错了
  console.log('personWithManyHousesRelationtListHandler')
  console.log(responseData)
  if(analysis==true){
    if(responseData.personFangChanRelation.length!=0){
      var nodeParent = responseData.personFangChanRelation[0].parent
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name
      objectList.push(
        {
          "type":"主体人",
          "idNum":nodeParent.idNum,
          "score":responseData.personFangChanRelation.length,
          "show":nodeParent.name
        }
      )
      option = pushMainBodyOption(nodeParent,option)
      return option
    }
  }else {
    let featureStr = "拥有"+responseData.personFangChanRelation.length+"套100平米以上的房产<SEP>"
    let idNum = ''
    for (var i = 0; i < responseData.personFangChanRelation.length; i++) {
      var nodeParent = responseData.personFangChanRelation[i].parent
      var nodeChild = responseData.personFangChanRelation[i].child
      var relation = responseData.personFangChanRelation[i].relation
      // if(idNum==''){
      //   idNum = nodeParent.idNum
      // }
      // let addr = "未知"
      // if(nodeChild.houseLocation!=""){
      //   addr = nodeChild.houseLocation
      // }
      // objectList.push(
      //   {
      //     "type":"房产信息",
      //     "idNum":nodeChild.fangChanSuoShuDi+"|*|"+nodeChild.houseLocation+"|*|"+nodeChild.huNum,
      //     "score":nodeChild.buildArea,
      //     "show":"地址："+addr
      //   }
      // )
      // 你原始获取的nodeChild只是一个字符串，并不是对象
      // 接口返回的child缺少id，在echart中无法创建关系
      // 我这里先暂时生成随机id，但后续肯定不满足需求，需要在后端修改
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name

      // 要设置category才能显示节点
      nodeChild.category = 2
      nodeChild.symbolSize = 30
      // nodeChild.showValue = nodeChild.address
      nodeChild.symbol = 'image://' + require('../../../public/img/house.svg')
      // let showValueList = []
      // // 你接口返回的没有这些数据
      // showValueList.push('节点类型：' + nodeCategory.get(nodeChild.category))
      // showValueList.push('节点ID：' + nodeChild.id)
      // showValueList.push('姓名：' + nodeChild.name)
      // showValueList.push('所有权人或购房人姓名：' + nodeChild.ownerName)
      // showValueList.push('共有权人姓名：' + nodeChild.coOwnerName)
      // showValueList.push('房产所属地：' + nodeChild.fangChanSuoShuDi)
      // showValueList.push('房屋坐落：' + nodeChild.houseLocation)
      // nodeChild.showValueList = showValueList

      // 鼠标悬浮关系时的提示
      // 接口数据获取错误，你的接口返回的数据不存在关系id
      // let showRelationValue = '关系ID：' + responseData.personFangChanRelation[i].id + "</br>"
      //   + "关系：" + responseData.personFangChanRelation[i].relation + "</br>"
      //   + "专案ID：" + responseData.personFangChanRelation[i].projectId
      let showRelationValue=''
      // 返回的接口数据缺少关系id，参数responseData[i].id不存在。
      // 这里我先暂时生成随机id
      option = pushDistinctOption(nodeParent, nodeChild, relation, showRelationValue, responseData.personFangChanRelation[i].id, option, "#fffef1")
    }
    // if(featureMap.has(idNum)){
    //   featureStr = featureMap.get(idNum) + featureStr
    //   featureMap.set(idNum,featureStr)
    // }else{
    //   featureMap.set(idNum,featureStr)
    // }
    // if(numFeatureMap.has(idNum)){
    //   var personFeatureMap = numFeatureMap.get(idNum)
    //   personFeatureMap.set("manyHouse",responseData.personFangChanRelation.length)
    //   numFeatureMap.set(idNum,personFeatureMap)
    // }else{
    //   var personFeatureMap = new Map()
    //   personFeatureMap.set("manyHouse",responseData.personFangChanRelation.length)
    //   numFeatureMap.set(idNum,personFeatureMap)
    // }
  }
  return option
}

export function personJiLiShuRelationtListHandler(responseData,option,objectList,featureMap,numFeatureMap,analysis=false) {
  // 先清空旧图的节点和边
  // option.series[0].data = []
  // option.series[0].links = []
  // TODO 请严格按照你接口返回的json格式获取数据，要不然都报错了
  console.log('调用personJiLiShuRelationtListHandler')
  if(analysis==true){
    if(responseData.length!=0){
      var nodeParent = responseData[0].parent
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name
      objectList.push(
        {
          "type":"主体人",
          "idNum":nodeParent.idNum,
          "score":responseData.length,
          "show":nodeParent.name
        }
      )
      option = pushMainBodyOption(nodeParent,option)
      return option
    }
  }else {
    let idNum = ''
    let total = 0
    for (var i = 0; i < responseData.length; i++) {
      var nodeParent = responseData[i].parent
      var nodeChild = responseData[i].child
      var relation = "特殊金额交易次数：" + responseData[i].relation.split("|*|")[1]
      total+=Number(responseData[i].relation.split("|*|")[1])
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name
      if(idNum==""){
        idNum = nodeParent.idNum
      }
      var relationColor = "#fffef1"
      if (Number(responseData[i].relation.split("|*|")[1]) <= 4) {
        relationColor = "#519a73"
      } else if (Number(responseData[i].relation.split("|*|")[1]) <= 6) {
        relationColor = "#fa8c35"
      } else {
        relationColor = "#ff2121"
      }
      // 要设置category才能显示节点
      nodeChild.category = 0
      nodeChild.symbolSize = 60
      nodeChild.showValue = nodeChild.name
      if (nodeChild.name == '未关联') {
        nodeChild.showValue = nodeChild.name
        nodeChild.symbol = 'image://' + require('../../../public/img/money.svg')
        let showValueList = []
        // 你接口返回的没有这些数据
        // showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
        objectList.push(
          {
            "type":"银行卡号",
            "idNum":nodeChild.idNum,
            "score":Number(responseData[i].relation.split("|*|")[1]),
            "show":nodeChild.idNum
          }
        )
        showValueList.push('节点ID：' + nodeChild.id)
        showValueList.push('姓名：' + '未关联')
        showValueList.push('银行账号：' + nodeChild.idNum)
        nodeChild.showValueList = showValueList
      } else {
        nodeChild.showValue = nodeChild.name
        let showValueList = []
        objectList.push(
          {
            "type":"主体人",
            "idNum":nodeChild.idNum,
            "score":Number(responseData[i].relation.split("|*|")[1]),
            "show":nodeChild.name
          }
        )
        showValueList.push('节点ID：' + nodeChild.id)
        showValueList.push('姓名：' + nodeChild.name)
        showValueList.push('身份证：' + nodeChild.idNum)
        nodeChild.showValueList = showValueList
      }


      // 鼠标悬浮关系时的提示
      // 接口数据获取错误，你的接口返回的数据不存在关系id
      let showRelationValue = '关系ID：' + responseData[i].id + "</br>"
        + "关系：" + "</br>" + responseData[i].relation.split("|*|")[0] + "</br>"
        + "专案ID：" + responseData[i].projectId

      option = pushDistinctOption(nodeParent, nodeChild, relation, showRelationValue, responseData[i].id, option, relationColor)
    }
    let featureStr = '以吉利数分别与'+responseData.length+'个主体人进行频繁交易，交易金额总共：'+total+'元，平均金额：'+Math.round(total/responseData.length)+'元。<SEP>'
    if(featureMap.has(idNum)){
      featureStr = featureMap.get(idNum)  + featureStr
      featureMap.set(idNum,featureStr)
    }else{
      featureMap.set(idNum,featureStr)
    }
    if(numFeatureMap.has(idNum)){
      var personFeatureMap = numFeatureMap.get(idNum)
      personFeatureMap.set("jiLiShuJiaoYi",total)
      numFeatureMap.set(idNum,personFeatureMap)
    }else{
      var personFeatureMap = new Map()
      personFeatureMap.set("jiLiShuJiaoYi",total)
      numFeatureMap.set(idNum,personFeatureMap)
    }
  }
  return option

}
export function personLingChenRelationtListHandler(responseData,option,objectList,featureMap,numFeatureMap,analysis=false) {
  // 先清空旧图的节点和边
  // option.series[0].data = []
  // option.series[0].links = []
  // TODO 请严格按照你接口返回的json格式获取数据，要不然都报错了
  console.log('调用personLingChenJiaoYiRelationtListHandler')
  if(analysis==true){
    if(responseData.length!=0){
      var nodeParent = responseData[0].parent
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name
      objectList.push(
        {
          "type":"主体人",
          "idNum":nodeParent.idNum,
          "score":responseData.length,
          "show":nodeParent.name
        }
      )
      option = pushMainBodyOption(nodeParent,option)
      return option
    }
  }else {
    let idNum = ''
    let total = 0
    let lingChengJiaoYiList = []
    for (var i = 0; i < responseData.length; i++) {
      var nodeParent = responseData[i].parent
      var nodeChild = responseData[i].child
      var totalLingChengJiaoYi = responseData[i].relation.split("|*|")[1]
      var relation = "凌晨交易次数：" + totalLingChengJiaoYi
      total+=Number(totalLingChengJiaoYi)
      lingChengJiaoYiList.push(totalLingChengJiaoYi)
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name
      if(idNum==''){
        idNum = nodeParent.idNum
      }
      var relationColor = "#fffef1"
      if (Number(responseData[i].relation.split("|*|")[1]) <= 30) {
        relationColor = "#519a73"
      } else if (Number(responseData[i].relation.split("|*|")[1]) <= 60) {
        relationColor = "#fa8c35"
      } else {
        relationColor = "#ff2121"
      }

      // 要设置category才能显示节点
      nodeChild.category = 0
      nodeChild.symbolSize = 60
      nodeChild.showValue = nodeChild.duiFangZhangHao
      if (nodeChild.name == '未关联') {
        nodeChild.showValue = nodeChild.name
        nodeChild.symbol = 'image://' + require('../../../public/img/money.svg')
        let showValueList = []
        // 你接口返回的没有这些数据
        // showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
        objectList.push(
          {
            "type":"银行卡号",
            "idNum":nodeChild.idNum,
            "score":Number(responseData[i].relation.split("|*|")[1]),
            "show":nodeChild.idNum
          }
        )
        showValueList.push('节点ID：' + nodeChild.id)
        showValueList.push('姓名：' + '未关联')
        showValueList.push('银行账号：' + nodeChild.idNum)
        nodeChild.showValueList = showValueList
      } else {
        nodeChild.showValue = nodeChild.name
        let showValueList = []
        objectList.push(
          {
            "type":"主体人",
            "idNum":nodeChild.idNum,
            "score":Number(responseData[i].relation.split("|*|")[1]),
            "show":nodeChild.name,
          }
        )
        showValueList.push('节点ID：' + nodeChild.id)
        showValueList.push('姓名：' + nodeChild.name)
        showValueList.push('身份证：' + nodeChild.idNum)
        nodeChild.showValueList = showValueList
      }


      // 鼠标悬浮关系时的提示
      // 接口数据获取错误，你的接口返回的数据不存在关系id
      let showRelationValue = '关系ID：' + responseData[i].id + "</br>"
        + "关系：" + "</br>" + responseData[i].relation.split("|*|")[0] + "</br>"
        + "专案ID：" + responseData[i].projectId

      option = pushDistinctOption(nodeParent, nodeChild, relation, showRelationValue, responseData[i].id, option, relationColor)
    }
    let featureStr = '在凌晨与'+responseData.length+'多次进行交易，交易总金额：'+total+'元，平均金额：'+Math.round(total/responseData.length)+"元。<SEP>"
    if(featureMap.has(idNum)){
      featureStr = featureMap.get(idNum) + featureStr
      featureMap.set(idNum,featureStr)
    }else{
      featureMap.set(idNum,featureStr)
    }
    if(numFeatureMap.has(idNum)){
      var personFeatureMap = numFeatureMap.get(idNum)
      personFeatureMap.set("lingChengJiaoYi",total)
      numFeatureMap.set(idNum,personFeatureMap)
    }else{
      var personFeatureMap = new Map()
      personFeatureMap.set("lingChengJiaoYi",total)
      numFeatureMap.set(idNum,personFeatureMap)
    }
  }
  return option
}
export function personCarsRelationtListHandler(responseData,option,objectList,featureMap,numFeatureMap,analysis=false) {
  // TODO 请严格按照你接口返回的json格式获取数据，要不然都报错了
  console.log('personCarsRelationtListHandler')
  console.log(responseData)
  if(analysis==true){
    if(responseData.personJiDongCheRelations.length!=0) {
      var nodeParent = responseData.personJiDongCheRelations[0].parent
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name
      objectList.push(
        {
          "type":"主体人",
          "idNum":nodeParent.idNum,
          "score":responseData.personJiDongCheRelations.length,
          "show":nodeParent.name
        }
      )
      option = pushMainBodyOption(nodeParent, option)
      return option
    }
  }else {
    let featureStr = "拥有机动车："+responseData.personJiDongCheRelations.length+"辆"+"<SEP>"
    let idNum = ''
    for (var i = 0; i < responseData.personJiDongCheRelations.length; i++) {
      var nodeParent = responseData.personJiDongCheRelations[i].parent
      var nodeChild = responseData.personJiDongCheRelations[i].child
      var relation = responseData.personJiDongCheRelations[i].relation
      // if(idNum==""){
      //   idNum = nodeParent.idNum
      // }
      // objectList.push(
      //   {
      //     "type":"车辆",
      //     "idNum":nodeChild.numberPlateNum,
      //     "score":Number(nodeChild.totalMass),
      //     "show":nodeChild.numberPlateNum
      //   }
      // )

      // 你原始获取的nodeChild只是一个字符串，并不是对象
      // 接口返回的child缺少id，在echart中无法创建关系
      // 我这里先暂时生成随机id，但后续肯定不满足需求，需要在后端修改
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name

      // 要设置category才能显示节点
      nodeChild.category = 3
      nodeChild.symbolSize = 50
      // nodeChild.showValue = nodeChild.carBrand
      nodeChild.symbol = 'image://' + require('../../../public/img/car.svg')
      // let showValueList = []
      // // 你接口返回的没有这些数据
      // showValueList.push('节点类型：' + nodeCategory.get(nodeChild.category))
      // showValueList.push('节点ID：' + nodeChild.id)
      // showValueList.push('机动车所有人：' + nodeChild.carOwner)
      // showValueList.push('号牌种类：' + nodeChild.haoPaiType)
      // showValueList.push('号牌号码：' + nodeChild.numberPlateNum)
      // showValueList.push('车辆品牌：' + nodeChild.carBrand)
      // showValueList.push('车身颜色：' + nodeChild.carBodyColor)
      // showValueList.push('车辆识别代号：' + nodeChild.carIdentificationCode)
      // showValueList.push('发动机号：' + nodeChild.engineNum)
      // showValueList.push('机动车状态：' + nodeChild.carStatus)
      // showValueList.push('出厂日期：' + nodeChild.factoryDate)
      // nodeChild.showValueList = showValueList

      // 鼠标悬浮关系时的提示
      // 接口数据获取错误，你的接口返回的数据不存在关系id
      // let showRelationValue = '关系ID：' + responseData.personJiDongCheRelations[i].id + "</br>"
      //   + "关系：" + responseData.personJiDongCheRelations[i].relation + "</br>"
      //   + "专案ID：" + responseData.personJiDongCheRelations[i].projectId
      let showRelationValue=''
      // 返回的接口数据缺少关系id，参数responseData[i].id不存在。
      // 这里我先暂时生成随机id
      option = pushDistinctOption(nodeParent, nodeChild, relation, showRelationValue, responseData.personJiDongCheRelations[i].id, option, "#fffef1")
    }
    // if(featureMap.has(idNum)){
    //   featureStr = featureMap.get(idNum)  + featureStr
    //   featureMap.set(idNum,featureStr)
    // }else{
    //   featureMap.set(idNum,featureStr)
    // }
    // if(numFeatureMap.has(idNum)){
    //   var personFeatureMap = numFeatureMap.get(idNum)
    //   personFeatureMap.set("manCar",responseData.personJiDongCheRelations.length)
    //   numFeatureMap.set(idNum,personFeatureMap)
    // }else{
    //   var personFeatureMap = new Map()
    //   personFeatureMap.set("manCar",responseData.personJiDongCheRelations.length)
    //   numFeatureMap.set(idNum,personFeatureMap)
    // }

  }
  return option
}

export function personCompanyRelationtListHandler(responseData,option,objectList,featureMap,numFeatureMap,analysis=false) {
  // TODO 请严格按照你接口返回的json格式获取数据，要不然都报错了
  console.log('personCompanyRelationtListHandler')
  console.log(responseData)
  if(analysis==true){
    if(responseData.personXiangGuanRenYuanRelations.length!=0) {
      var nodeParent = responseData.personXiangGuanRenYuanRelations[0].parent
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name
      objectList.push(
        {
          "type":"主体人",
          "idNum":nodeParent.idNum,
          "score":responseData.personXiangGuanRenYuanRelations.length,
          "show":nodeParent.name
        }
      )
      option = pushMainBodyOption(nodeParent, option)
      return option
    }
  }else {
    let featureStr = "名下机构："+responseData.personXiangGuanRenYuanRelations.length+"所"+"<SEP>"
    let idNum = ''
    for (var i = 0; i < responseData.personXiangGuanRenYuanRelations.length; i++) {
      var nodeParent = responseData.personXiangGuanRenYuanRelations[i].parent
      var nodeChild = responseData.personXiangGuanRenYuanRelations[i].child
      var relation = responseData.personXiangGuanRenYuanRelations[i].relation
      // if(idNum==""){
      //   idNum = nodeParent.idNum
      // }
      // objectList.push(
      //   {
      //     "type":"机构",
      //     "idNum":nodeChild.marketBodyName+"|*|"+nodeChild.relationType+"|*|"+nodeChild.associatedObjectName,
      //     "score":0,
      //     "show":nodeChild.marketBodyName+"|*|"+nodeChild.relationType+"|*|"+nodeChild.associatedObjectName
      //   }
      // )

      // 你原始获取的nodeChild只是一个字符串，并不是对象
      // 接口返回的child缺少id，在echart中无法创建关系
      // 我这里先暂时生成随机id，但后续肯定不满足需求，需要在后端修改
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name

      // 要设置category才能显示节点
      nodeChild.category = 1
      nodeChild.symbolSize = 30
      //nodeChild.showValue = nodeChild.marketBodyName
      nodeChild.symbol = 'image://' + require('../../../public/img/company.svg')
      // let showValueList = []
      // // 你接口返回的没有这些数据
      // showValueList.push('节点类型：' + nodeCategory.get(nodeChild.category))
      // showValueList.push('节点ID：' + nodeChild.id)
      // showValueList.push('市场主体名称：' + nodeChild.marketBodyName)
      // showValueList.push('关联对象名称：' + nodeChild.associatedObjectName)
      // showValueList.push('关联类型：' + nodeChild.relationType)
      // nodeChild.showValueList = showValueList
      //
      // // 鼠标悬浮关系时的提示
      // // 接口数据获取错误，你的接口返回的数据不存在关系id
      // let showRelationValue = '关系ID：' + responseData.personXiangGuanRenYuanRelations[i].id + "</br>"
      //   + "关系：" + responseData.personXiangGuanRenYuanRelations[i].relation + "</br>"
      //   + "专案ID：" + responseData.personXiangGuanRenYuanRelations[i].projectId
      let showRelationValue = ''
      // 返回的接口数据缺少关系id，参数responseData[i].id不存在。
      // 这里我先暂时生成随机id
      option = pushDistinctOption(nodeParent, nodeChild, relation, showRelationValue, responseData.personXiangGuanRenYuanRelations[i].id, option, "#fffef1")
    }
    // if(featureMap.has(idNum)){
    //   featureStr = featureMap.get(idNum)  + featureStr
    //   featureMap.set(idNum,featureStr)
    // }else{
    //   featureMap.set(idNum,featureStr)
    // }
    // if(numFeatureMap.has(idNum)){
    //   var personFeatureMap = numFeatureMap.get(idNum)
    //   personFeatureMap.set("manyCompany",responseData.personXiangGuanRenYuanRelations.length)
    //   numFeatureMap.set(idNum,personFeatureMap)
    // }else{
    //   var personFeatureMap = new Map()
    //   personFeatureMap.set("manyCompany",responseData.personXiangGuanRenYuanRelations.length)
    //   numFeatureMap.set(idNum,personFeatureMap)
    // }
  }
  return option
}

export function personFamilyRelationtListHandler(responseData,option,relationMap,analysis=false) {
  // TODO 请严格按照你接口返回的json格式获取数据，要不然都报错了
  console.log('personFamilyRelationtListHandler')
  console.log(responseData)
  var path = window.global_config.PHOTOPATH
  if(analysis==true){
    if(responseData.personRelation.length!=0) {
      var nodeParent = responseData.personRelation[0].parent
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name
      if(nodeParent.photo==undefined){
        nodeParent.symbol='image://'+require('../../../public/img/person.svg')
      }
      else{
        // nodeParent.symbol = 'image://'+'kg/'+nodeParent.photo
        // nodeParent.symbol = 'image://'+'http://szbxc.liaoning.net/'+nodeParent.photo
        nodeParent.symbol = 'image://'+path+nodeParent.photo
      }
      objectList.push(
        {
          "type":"主体人",
          "idNum":nodeParent.idNum,
          "score":0,
          "show":nodeParent.name
        }
      )
      option = pushMainBodyOption(nodeParent, option)
      return option
    }
  }else{
    for(var i=0;i<responseData.personRelation.length;i++){
      var nodeParent = responseData.personRelation[i].parent
      var nodeChild =  responseData.personRelation[i].child
      var relation = responseData.personRelation[i].relation
      let findList = option.series[0].data.find((item) => {
        return item.id == nodeChild.id
      });
      if(findList==null || findList.length==0){
        relationMap.set(nodeChild.idNum,"近亲属")
      }
      // objectList.push(
      //   {
      //     "type":"主体人",
      //     "idNum":nodeParent.idNum,
      //     "score":0,
      //     "show":nodeParent.name
      //   }
      // )
      // 你原始获取的nodeChild只是一个字符串，并不是对象
      // 接口返回的child缺少id，在echart中无法创建关系
      // 我这里先暂时生成随机id，但后续肯定不满足需求，需要在后端修改
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name
      if(nodeParent.photo==undefined){
        nodeParent.symbol='image://'+require('../../../public/img/person.svg')
      }
      else{
        // nodeParent.symbol = 'image://'+'kg/'+nodeParent.photo
        // nodeParent.symbol = 'image://'+'http://szbxc.liaoning.net/'+nodeParent.photo
        nodeParent.symbol = 'image://'+path+nodeParent.photo
      }
      // 要设置category才能显示节点
      nodeChild.category = 0
      nodeChild.symbolSize = 80
      nodeChild.showValue = nodeChild.name
      let showValueList = []
      // 你接口返回的没有这些数据
      showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
      showValueList.push('节点ID：'+nodeChild.id)
      showValueList.push('姓名：'+nodeChild.name)
      showValueList.push('身份证号：'+nodeChild.idNum)
      nodeChild.showValueList = showValueList
      // nodeChild.symbol='image://'+require('../../../public/img/person.svg')
      if(nodeChild.photo==undefined){
        nodeChild.symbol='image://'+require('../../../public/img/person.svg')
      }
      else{
        // nodeChild.symbol = 'image://'+'kg/'+nodeChild.photo
        // nodeChild.symbol = 'image://'+'http://szbxc.liaoning.net/'+nodeChild.photo
        nodeChild.symbol = 'image://'+path+nodeParent.photo
      }
      // 鼠标悬浮关系时的提示
      // 接口数据获取错误，你的接口返回的数据不存在关系id
      let showRelationValue ='关系ID：'+responseData.personRelation[i].id+"</br>"
        +"关系：" + responseData.personRelation[i].relation+"</br>"
        +"专案ID："+responseData.personRelation[i].projectId

      // 返回的接口数据缺少关系id，参数responseData[i].id不存在。
      // 这里我先暂时生成随机id
      option = pushDistinctOption(nodeParent,nodeChild,relation,showRelationValue,responseData.personRelation[i].id,option,"#fffef1")
    }
  }

  return option
}
export function personPinFanZhengShuJiaoYiRelationtListHandler(responseData,option,objectList,featureMap,numFeatureMap ,analysis=false) {
  // 先清空旧图的节点和边
  // option.series[0].data = []
  // option.series[0].links = []
  // TODO 请严格按照你接口返回的json格式获取数据，要不然都报错了
  console.log('调用personPinFanZhengShuJiaoYiRelationtListHandler')
  if(analysis==true){
    if(responseData.length!=0){
      var nodeParent = responseData[0].parent
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name
      objectList.push(
        {
          "type":"主体人",
          "idNum":nodeParent.idNum,
          "score":responseData.length,
          "show":nodeParent.name
        }
      )
      option = pushMainBodyOption(nodeParent,option)
      return option
    }
  }else {
    let idNum = ''
    let totalCount = 0
    for (var i = 0; i < responseData.length; i++) {
      var nodeParent = responseData[i].parent
      var nodeChild = responseData[i].child
      var totalJiaoYi = responseData[i].relation.split("|*|")[1]
      var relation = "可疑交易次数：" + totalJiaoYi
      totalCount += Number(totalJiaoYi)
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name
      if(idNum==''){
        idNum = nodeParent.idNum
      }
      var relationColor = "#fffef1"
      if (Number(responseData[i].relation.split("|*|")[1]) <= 4) {
        relationColor = "#519a73"
      } else if (Number(responseData[i].relation.split("|*|")[1]) <= 6) {
        relationColor = "#fa8c35"
      } else {
        relationColor = "#ff2121"
      }
      // 要设置category才能显示节点
      nodeChild.category = 0
      nodeChild.symbolSize = 60
      nodeChild.showValue = nodeChild.name
      if (nodeChild.name == '未关联') {
        nodeChild.showValue = nodeChild.name
        nodeChild.symbol = 'image://' + require('../../../public/img/money.svg')
        let showValueList = []
        // 你接口返回的没有这些数据
        // showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
        objectList.push(
          {
            "type":"银行卡号",
            "idNum":nodeChild.idNum,
            "score":Number(responseData[i].relation.split("|*|")[1]),
            "show":nodeChild.idNum
          }
        )
        showValueList.push('节点ID：' + nodeChild.id)
        showValueList.push('姓名：' + '未关联')
        showValueList.push('银行账号：' + nodeChild.idNum)
        nodeChild.showValueList = showValueList
      } else {
        nodeChild.showValue = nodeChild.name
        let showValueList = []
        objectList.push(
          {
            "type":"主体人",
            "idNum":nodeChild.idNum,
            "score":Number(responseData[i].relation.split("|*|")[1]),
            "show":nodeChild.name
          }
        )
        showValueList.push('节点ID：' + nodeChild.id)
        showValueList.push('姓名：' + nodeChild.name)
        showValueList.push('身份证：' + nodeChild.idNum)
        nodeChild.showValueList = showValueList
      }


      // 鼠标悬浮关系时的提示
      // 接口数据获取错误，你的接口返回的数据不存在关系id
      let showRelationValue = '关系ID：' + responseData[i].id + "</br>"
        + "关系：" + "</br>" + responseData[i].relation.split("|*|")[0] + "</br>"
        + "专案ID：" + responseData[i].projectId

      option = pushDistinctOption(nodeParent, nodeChild, relation, showRelationValue, responseData[i].id, option, relationColor)
    }
    let featureStr = '与'+responseData.length+"个人发生频繁发生大量信用卡刷卡交易,总交易次数："+totalCount+"次，平均交易次数："+Math.round(totalCount/responseData.length)+"次。<SEP>"
    if(featureMap.has(idNum)){
      featureStr = featureMap.get(idNum) + featureStr
      featureMap.set(idNum,featureStr)
    }else{
      featureMap.set(idNum,featureStr)
    }
    if(numFeatureMap.has(idNum)){
      var personFeatureMap = numFeatureMap.get(idNum)
      personFeatureMap.set("pinFanZhengShu",totalCount)
      numFeatureMap.set(idNum,personFeatureMap)
    }else{
      var personFeatureMap = new Map()
      personFeatureMap.set("pinFanZhengShu",totalCount)
      numFeatureMap.set(idNum,personFeatureMap)
    }
  }
  return option

}
export function personTongXingRelationListHandler(responseData,option) {
  // 先清空旧图的节点和边
  // option.series[0].data = []
  // option.series[0].links = []
  // TODO 请严格按照你接口返回的json格式获取数据，要不然都报错了
  console.log('调用personPinFanZhengShuJiaoYiRelationtListHandler')
  var path = window.global_config.PHOTOPATH
  for (var i = 0; i < responseData.length; i++) {
    var nodeParent = responseData[i].parent
    var nodeChild = responseData[i].child
    var relation = responseData[i].relation
    nodeParent.category = 0
    nodeParent.symbolSize = 100
    nodeParent.showValue = nodeParent.name

    // 要设置category才能显示节点
    nodeChild.category = 0
    nodeChild.symbolSize = 60
    nodeChild.showValue = nodeChild.name
    let showValueList = []
    showValueList.push('节点ID：' + nodeChild.id)
    showValueList.push('姓名：' + nodeChild.name)
    showValueList.push('身份证：' + nodeChild.idNum)
    nodeChild.showValueList = showValueList
    if(nodeChild.photo==undefined){
      nodeChild.symbol='image://'+require('../../../public/img/person.svg')
    }
    else{
      // nodeChild.symbol = 'image://'+'kg/'+nodeChild.photo
      // nodeChild.symbol = 'image://'+'http://szbxc.liaoning.net/'+nodeChild.photo
      nodeChild.symbol = 'image://'+path+nodeParent.photo
    }
    // nodeParent.symbol = 'image://'+'kg/upload_files/230216162113705/images/8a553c1d90c5e1f9f789da6138b48c84.jpeg'

    // 鼠标悬浮关系时的提示
    // 接口数据获取错误，你的接口返回的数据不存在关系id
    let showRelationValue = '关系ID：' + responseData[i].id + "</br>"
      + "关系：" + "</br>" + responseData[i].relation + "</br>"
      + "专案ID：" + responseData[i].projectId

    option = pushDistinctOption(nodeParent, nodeChild, relation, showRelationValue, responseData[i].id, option, "#fffef1")
  }
  return option

}

export function allPersonListHandler(responseData,option) {
  // 先清空旧图的节点和边
  // option.series[0].data = []
  // option.series[0].links = []
  // TODO 请严格按照你接口返回的json格式获取数据，要不然都报错了
  console.log('调用allPersonListHandler')
  var path = window.global_config.PHOTOPATH
  for (var i = 0; i < responseData.length; i++) {
    var nodePerson = responseData[i]
    // var nodeParent = responseData[i].parent
    // var nodeChild = responseData[i].child
    // var relation = "同行"

    nodePerson.category = 0
    nodePerson.symbolSize = 100
    nodePerson.showValue = nodePerson.name
    // nodeParent.category = 0
    // nodeParent.symbolSize = 100
    // nodeParent.showValue = nodeParent.name

    // 要设置category才能显示节点
    // nodeChild.category = 0
    // nodeChild.symbolSize = 60
    // nodeChild.showValue = nodeChild.name
    let showValueList = []
    showValueList.push('节点ID：' + nodePerson.id)
    showValueList.push('姓名：' + nodePerson.name)
    showValueList.push('身份证：' + nodePerson.idNum)
    // showValueList.push('节点ID：' + nodeChild.id)
    // showValueList.push('姓名：' + nodeChild.name)
    // showValueList.push('身份证：' + nodeChild.idNum)
    nodePerson.showValueList = showValueList
    if(nodeParent.photo==undefined){
      nodeParent.symbol='image://'+require('../../../public/img/person.svg')
    }
    else{
      // nodeParent.symbol = 'image://'+'kg/'+nodeParent.photo
      // nodeParent.symbol = 'image://'+'http://szbxc.liaoning.net/'+nodeParent.photo
      nodeParent.symbol = 'image://'+path+nodeParent.photo
    }
    // nodeParent.symbol = 'image://'+'kg/upload_files/230216162113705/images/8a553c1d90c5e1f9f789da6138b48c84.jpeg'

    // 鼠标悬浮关系时的提示
    // 接口数据获取错误，你的接口返回的数据不存在关系id
    // let showRelationValue = '关系ID：' + responseData[i].id + "</br>"
    //   + "关系：" + "</br>" + responseData[i].relation + "</br>"
    //   + "专案ID：" + responseData[i].projectId

    // option = pushDistinctOption(nodeParent, nodeChild, relation, showRelationValue, responseData[i].id, option, "#fffef1")
    option = pushMainBodyOption(nodePerson,option)
  }
  return option

}

export function mainBodyAndCoPersonListHandler(responseData,option) {

  // TODO 请严格按照你接口返回的json格式获取数据，要不然都报错了
  console.log('调用mainBodyAndCoPersonListHandler')
  for (var i = 0; i < responseData.length; i++) {
    var nodePerson = responseData[i]

    nodePerson.category = 0
    nodePerson.symbolSize = 100
    nodePerson.showValue = nodePerson.name

    let showValueList = []
    showValueList.push('节点ID：' + nodePerson.id)
    showValueList.push('姓名：' + nodePerson.name)
    showValueList.push('身份证：' + nodePerson.idNum)

    nodePerson.showValueList = showValueList
    //nodePerson.symbol = 'image://'+require('../../../public/img/person.svg')

    option = pushMainBodyOption(nodePerson,option)
  }
  return option

}

function pushMainBodyOption(nodeParent,option){
  var path = window.global_config.PHOTOPATH
  let showValueList = []
  showValueList.push('节点类型：'+nodeCategory.get(nodeParent.category))
  showValueList.push('节点ID：'+nodeParent.id)
  showValueList.push('姓名：'+nodeParent.name)
  showValueList.push('身份证号：'+nodeParent.idNum)
  nodeParent.showValueList = showValueList
  console.log('图片路径：'+nodeParent.photo)
  // nodeParent.symbol='image://'+require('../../../public/img/person.svg')
  if(nodeParent.photo==undefined){
    nodeParent.symbol='image://'+require('../../../public/img/person.svg')
  }
  else{
    // nodeParent.symbol = 'image://'+'kg/'+nodeParent.photo
    // nodeParent.symbol = 'image://'+'http://szbxc.liaoning.net/'+nodeParent.photo
    nodeParent.symbol = 'image://'+path+nodeParent.photo
    console.log(nodeParent.symbol)
  }

  let findList = option.series[0].data.find((item) => {
    return item.id == nodeParent.id
  });
  if(findList==null || findList.length==0){
    option.series[0].data.push(nodeParent)
  }
  return option
}
function pushDistinctOption(nodeParent,nodeChild,relation,showRelationValue,relationId,option,color){
  var path = window.global_config.PHOTOPATH
  let showValueList = []
  showValueList.push('节点类型：'+nodeCategory.get(nodeParent.category))
  showValueList.push('节点ID：'+nodeParent.id)
  showValueList.push('姓名：'+nodeParent.name)
  showValueList.push('身份证号：'+nodeParent.idNum)
  nodeParent.showValueList = showValueList
  nodeParent.symbol='image://'+require('../../../public/img/person.svg')
  if(nodeParent.photo==undefined){
    nodeParent.symbol='image://'+require('../../../public/img/person.svg')
  }
  else{
    // nodeParent.symbol = 'image://'+'kg/'+nodeParent.photo
    // nodeParent.symbol = 'image://'+'http://szbxc.liaoning.net/'+nodeParent.photo
    nodeParent.symbol = 'image://'+path+nodeParent.photo
  }
  console.log('图片路径：'+nodeParent.photo)
  // nodeParent.fixed = true
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
    des: showRelationValue,
    lineStyle: {
      normal: {
        // 此处可自定义边的颜色
        color: color
      }
    }
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


export function personTongXinCountHandler(responseData,option,objectList, featureMap, numFeatureMap,analysis=false) {
  // 先清空旧图的节点和边
  // option.series[0].data = []
  // option.series[0].links = []
  // TODO 请严格按照你接口返回的json格式获取数据，要不然都报错了
  console.log('调用personTongXinCountHandler')
  var path = window.global_config.PHOTOPATH
  if(analysis==true){
    if(responseData.length!=0){
      var nodeParent = responseData[0].parent
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name
      objectList.push(
        {
          "type":"主体人",
          "idNum":nodeParent.idNum,
          "score":responseData.length,
          "show":nodeParent.name
        }
      )
      option = pushMainBodyOption(nodeParent,option)
      return option
    }
  }else {
    let idNum = ''
    let total = 0
    for (var i = 0; i < responseData.length; i++) {
      var nodeParent = responseData[i].parent
      var nodeChild = responseData[i].child
      var relation = responseData[i].relation
      total += Number(responseData[i].relation.split("：")[1])
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name
      if(idNum==''){
        idNum = nodeParent.idNum
      }
      var tongXinCount = relation.split("：")[1]
      var relationColor = "#fffef1"
      if (Number(tongXinCount) <= 90) {
        relationColor = "#77d4a6"
      } else if (Number(tongXinCount) <= 180) {
        relationColor = "#fa8c35"
      } else {
        relationColor = "#ea7070"
      }
      //要设置category才能显示节点
      nodeChild.category = 0
      nodeChild.symbolSize = 60
      if (nodeChild.name == '未关联') {
        nodeChild.showValue = nodeChild.name
        nodeChild.symbol = 'image://' + require('../../../public/img/phone.svg')
        objectList.push(
          {
            "type":"手机号",
            "idNum":nodeChild.idNum,
            "show":nodeChild.idNum
          }
        )
        let showValueList = []
        // 你接口返回的没有这些数据
        showValueList.push('节点类型：'+ nodeCategory.get(nodeChild.category))
        showValueList.push('节点ID：' + nodeChild.id)
        showValueList.push('姓名：' + '未关联')
        showValueList.push('手机号：' + nodeChild.idNum)
        nodeChild.showValueList = showValueList
      } else {
        nodeChild.showValue = nodeChild.name
        if(nodeChild.photo==undefined){
          nodeChild.symbol='image://'+require('../../../public/img/person.svg')
        }
        else{
          // nodeParent.symbol = 'image://'+'kg/'+nodeParent.photo
          // nodeParent.symbol = 'image://'+'http://szbxc.liaoning.net/'+nodeParent.photo
          nodeChild.symbol = 'image://'+path+nodeChild.photo
        }
        objectList.push(
          {
            "type":"主体人",
            "idNum":nodeChild.idNum,
            "show":nodeChild.name
          }
        )
        let showValueList = []
        showValueList.push('节点ID：' + nodeChild.id)
        showValueList.push('姓名：' + nodeChild.name)
        showValueList.push('身份证：' + nodeChild.idNum)
        nodeChild.showValueList = showValueList
      }
      // 鼠标悬浮关系时的提示
      // 接口数据获取错误，你的接口返回的数据不存在关系id
      let showRelationValue = '关系ID：' + responseData[i].id + "</br>"
        + "关系：" + "</br>" + responseData[i].relation+ "</br>"
        + "专案ID：" + responseData[i].projectId
      option = pushDistinctOption(nodeParent, nodeChild, relation, showRelationValue, responseData[i].id, option, relationColor)
    }
    // let featureStr = '与'+responseData.length+'个主体人总共通信次数次，'
    // if(featureMap.has(idNum)){
    //   featureStr = featureMap.get(idNum)  + featureStr
    //   featureMap.set(idNum,featureStr)
    // }else{
    //   featureMap.set(idNum,featureStr)
    // }
    // if(numFeatureMap.has(idNum)){
    //   var personFeatureMap = numFeatureMap.get(idNum)
    //   personFeatureMap.set("tongXinPinFan",total)
    //   numFeatureMap.set(idNum,personFeatureMap)
    // }else{
    //   var personFeatureMap = new Map()
    //   personFeatureMap.set("tongXinPinFan",total)
    //   numFeatureMap.set(idNum,personFeatureMap)
    // }

  }
  return option

}
export function personJiaoYiCountHandler(responseData,option,objectList,featureMap,numFeatureMap ,analysis=false) {
  // 先清空旧图的节点和边
  // option.series[0].data = []
  // option.series[0].links = []
  // TODO 请严格按照你接口返回的json格式获取数据，要不然都报错了
  console.log('调用personPinFanZhengShuJiaoYiRelationtListHandler')
  var path = window.global_config.PHOTOPATH
  if(analysis==true){
    if(responseData.length!=0){
      var nodeParent = responseData[0].parent
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name
      objectList.push(
        {
          "type":"主体人",
          "idNum":nodeParent.idNum,
          "score":responseData.length,
          "show":nodeParent.name
        }
      )
      option = pushMainBodyOption(nodeParent,option)
      return option
    }
  }
  else {
    let idNum = ''
    let totalCount = 0
    for (var i = 0; i < responseData.length; i++) {
      var nodeParent = responseData[i].parent
      var nodeChild = responseData[i].child
      var relation = responseData[i].relation
      nodeParent.category = 0
      nodeParent.symbolSize = 100
      nodeParent.showValue = nodeParent.name
      if(idNum==''){
        idNum = nodeParent.idNum
      }
      var relationColor = "#fffef1"
      if (Number(responseData[i].relation.split("：")[1]) <= 4) {
        relationColor = "#75d5a3"
      } else if (Number(responseData[i].relation.split("：")[1]) <= 6) {
        relationColor = "#fa8c35"
      } else {
        relationColor = "#db6565"
      }
      // 要设置category才能显示节点
      nodeChild.category = 0
      nodeChild.symbolSize = 60
      nodeChild.showValue = nodeChild.name
      if (nodeChild.name == '未关联') {
        nodeChild.showValue = nodeChild.name
        nodeChild.symbol = 'image://' + require('../../../public/img/money.svg')
        let showValueList = []
        // 你接口返回的没有这些数据
        // showValueList.push('节点类型：'+nodeCategory.get(nodeChild.category))
        objectList.push(
          {
            "type":"银行卡号",
            "idNum":nodeChild.idNum,
            "show":nodeChild.idNum
          }
        )
        showValueList.push('节点ID：' + nodeChild.id)
        showValueList.push('姓名：' + '未关联')
        showValueList.push('银行账号：' + nodeChild.idNum)
        nodeChild.showValueList = showValueList
      } else {
        nodeChild.showValue = nodeChild.name
        if(nodeChild.photo==undefined){
          nodeParent.symbol='image://'+require('../../../public/img/person.svg')
        }
        else{
          // nodeParent.symbol = 'image://'+'kg/'+nodeParent.photo
          // nodeChild.symbol = 'image://'+'http://szbxc.liaoning.net/'+nodeChild.photo
          nodeChild.symbol = 'image://'+path+nodeParent.photo
        }
        let showValueList = []
        objectList.push(
          {
            "type":"主体人",
            "idNum":nodeChild.idNum,
            "show":nodeChild.name
          }
        )
        showValueList.push('节点ID：' + nodeChild.id)
        showValueList.push('姓名：' + nodeChild.name)
        showValueList.push('身份证：' + nodeChild.idNum)
        nodeChild.showValueList = showValueList
      }


      // 鼠标悬浮关系时的提示
      // 接口数据获取错误，你的接口返回的数据不存在关系id
      let showRelationValue = '关系ID：' + responseData[i].id + "</br>"
        + "关系：" + "</br>" + responseData[i].relation + "</br>"
        + "专案ID：" + responseData[i].projectId

      option = pushDistinctOption(nodeParent, nodeChild, relation, showRelationValue, responseData[i].id, option, relationColor)
    }
    // let featureStr = '与'+responseData.length+"个人发生频繁发生大量信用卡刷卡交易,总交易次数："+totalCount+"次，平均交易次数："+Math.round(totalCount/responseData.length)+"次。<SEP>"
    // if(featureMap.has(idNum)){
    //   featureStr = featureMap.get(idNum) + featureStr
    //   featureMap.set(idNum,featureStr)
    // }else{
    //   featureMap.set(idNum,featureStr)
    // }
    // if(numFeatureMap.has(idNum)){
    //   var personFeatureMap = numFeatureMap.get(idNum)
    //   personFeatureMap.set("pinFanZhengShu",totalCount)
    //   numFeatureMap.set(idNum,personFeatureMap)
    // }else{
    //   var personFeatureMap = new Map()
    //   personFeatureMap.set("pinFanZhengShu",totalCount)
    //   numFeatureMap.set(idNum,personFeatureMap)
    // }
  }
  return option

}
