<template>
  <div class="app-container" >
    <el-row :gutter="24">
      <el-col class="top" :span="24">
        <el-card shadow="hover" class="mgb20">
          <template  #header style="line-height: 0px;height: 0px;padding-top: 0;padding-bottom: 0;margin-top: -20px">
            <div class="wajue"  style="line-height: 0px;height: 0px;padding-top: 0px;margin-top: -15px">
              <h3 >疑点挖掘</h3>
            </div>
            <div style="float: right;line-height: 0px;height: 0px;padding-top: 0px;margin-top: -22px">
              <el-button class="settarget" type="primary" round :disabled="idNumFlag===false" @click="showIdNumForm" icon="el-icon-search">指定目标人物</el-button>
            </div>
          </template>
          <el-row :gutter="24" style="height: 50px" class="center">
            <el-col :span="6">
              <div  class="center-left">
                <el-row :gutter="24" class="state">
                  <el-col :span="19" >
                    <el-row>
                      <span class="badge_span1" style="position: absolute;padding-top: 10px;padding-left: 5px;">当前状态</span>
                    </el-row>
                    <el-row>
                       <span class="statedetail">
                                           {{step}}
                         <!--                         {{dialogNodeVisible}}-->
                                         </span>
                    </el-row>
                  </el-col>
                  <el-col :span=5>
                    <div style="opacity: 1;width: 50px;height: 50px;padding: 10px;border-radius: 10px;margin-top: 10px;float: right;">
                      <img src="../../../../public/img/state.png" width="30px" height="30px" style="float: right;margin-right: -10px">

                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="7">

              <div>
                <el-row :gutter="24" >
                  <div class="center-center">
                    <el-col :span="15" >
                      <el-row>
                        <span class="badge_span2">拉取进度</span>
                      </el-row>
                      <el-row>
                      <span class="badge_span3">
                  <b>{{ laquCount.totalHandledCount }}/{{ laquCount.totalMaxCount }}</b>
                </span>
                      </el-row>
                    </el-col>
                    <el-col :span="6">
                      <div style="opacity: 1;width: 50px;height: 50px;padding: 10px;border-radius: 10px;margin-top: 10px;float: right;margin-right: -80%">
                        <img src="../../../../public/img/vertex1.png" width="30px" height="30px" style="float: right;">

                      </div>
                    </el-col>
                  </div>


                  <div class="center-right">
                    <el-col :span="15" >
                      <el-row>
                        <span class="badge_span2">详细进度</span>
                      </el-row>
                      <el-row>
                      <span class="badge_span3">
                 <a @click="laquDialogVisible = true">点击查看</a>
                </span>
                      </el-row>
                    </el-col>
                    <el-col :span="6">
                      <div style="opacity: 1;width: 50px;height: 50px;padding: 10px;border-radius: 10px;margin-top: 10px;float: right;margin-right: -80%">
                        <img src="../../../../public/img/relation1.png" width="30px" height="30px" style="float: right;">
                      </div>
                    </el-col>
                  </div>
                </el-row>
              </div>
            </el-col>

            <el-col :span="2">
              <!--              <div class="block">-->
              <!--                <span class="demonstration">特征提取阈值</span>-->
              <!--                <el-slider v-if="thresholdFlag" v-model="weightValue" :format-tooltip="formatTooltip" ></el-slider>-->
              <!--                <el-slider v-else disabled v-model="weightValue" :format-tooltip="formatTooltip" ></el-slider>-->
              <!--              </div>-->
            </el-col>

            <el-col :span="8">
              <!--              <el-button type="primary" size="small"   @click="" style="float: right">刷新neo4j数量</el-button>-->
              <div style="float: right;margin-top:20px;margin-left: -80px">
                <span style="float: right">
                  <el-tooltip class="item" effect="dark" content="数据拉取期间可关闭该页面" placement="left">
                <el-button class="button" type="primary" :loading=pullLoading size="large"  @click="clickToPullFromPostgreSQL(projectId)">
                  {{ pullDataState }}
                </el-button>
                       </el-tooltip>
                <el-button class="button" type="primary" size="large" id="addRelationButton" :disabled="addRelationFlag===false"  @click="addRelationDialogVisible=true">
                  追加关系
                </el-button>
                  <!--                  <el-button type="primary" disabled size="large" id="addRelationButton" v-else  @click="addRelationDialogVisible=true" style="border-radius: 0px;">-->
                  <!--                  追加关系-->
                  <!--                </el-button>-->
                <el-button class="button" type="primary" size="large" id="batchAddRelationButton" :disabled="batchAddRelationFlag===false"  @click="addMainBodyToTable">
                  关系标注
                </el-button>
                  <!--                <el-button type="primary" disabled size="large" id="batchAddRelationButton" v-else  @click="addMainBodyToTable" style="border-radius: 0px;">-->
                  <!--                  关系标注-->
                  <!--                </el-button>-->
                  <el-button class="button" type="primary" size="large" id="anaysisButton" :disabled="anaysisFlag===false"  @click="loadAllRelations">
                  可疑分析
                </el-button>
                  <!--                <el-button type="primary" disabled size="large" id="anaysisButton" v-else @click="loadAllRelations" style="border-radius: 0px;">-->
                  <!--                  可疑分析-->
                  <!--                </el-button>-->
                  <el-button class="button" type="primary" :disabled="trainFlag===false"  size="large"  @click="trainModel" >
                  模型试判
                </el-button>
                  <!--                  <el-button type="primary" disabled  size="large" v-else @click="trainModel" style="border-radius: 0px;">-->
                  <!--                  模型试判-->
                  <!--                </el-button>-->
              </span>
              </div>
            </el-col>
          </el-row>

        </el-card>
        <!--        <el-dialog title="照片查询" :visible.sync="showImg">-->
        <!--          <span>{{showImgURL}}</span>-->
        <!--          <el-input v-model="idNumQuery" placeholder="请输入要查询人物的身份证号码"></el-input>-->
        <!--          <el-button @click="queryImgUrl()">查询</el-button>-->
        <!--          <el-button @click="addData()">添加</el-button>-->
        <!--        </el-dialog>-->
        <el-dialog title="可疑人员搜索范围" :visible.sync="dialogTableVisible">
          <template>
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            <div style="margin: 15px 0;"></div>
            <div>
              <el-checkbox-group v-model="checkedOptions">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </template>
        </el-dialog>
        <el-card  shadow="hover" class="mgb21" >
          <div>
            <el-row :gutter="24">
              <el-col class="left-col">
                <h3 class="left-col-title" @click="showImg = true">可疑列表</h3>
                <div>
                  <el-row>
                    <!--/*                    <el-scrollbar style="width: 100%;height: 870px;">*/-->
                    <el-table
                      :data="personVertexTable.list"
                      :row-class-name="rowClassName"
                      element-loading-text="Loading"
                      height="800"
                      class="left-col-table"
                      :default-sort = "{prop: 'score', order: 'descending'}"
                      :header-cell-style="{ background: '#383f52', color:' #dadada' }"
                    >
                      <el-table-column width="1"></el-table-column>
                      <el-col :span="4">
                        <el-table-column label="姓名"  prop="name"  align="center">
                          <template slot-scope="scope">
                            <div>
                              {{ scope.row.name }}
                            </div>
                          </template>
                        </el-table-column>
                      </el-col>
                      <el-col :span="16">
                        <el-table-column label="身份证" prop="idNum" align="center">
                          <template slot-scope="scope">
                            <div>
                              {{ scope.row.idNum }}
                            </div>
                          </template>
                        </el-table-column>
                      </el-col>
                      <el-col :span="4">
                        <el-table-column label="可疑分数" prop="score"  align="center">
                          <template slot-scope="scope">
                            <div>
                              <span style="color: #409EFF" v-if="scope.row.score<3">{{scope.row.score}}</span>
                              <span style="color: #E6A23C" v-else-if="scope.row.score<7">{{scope.row.score}}</span>
                              <span style="color: #F56C6C" v-else>{{scope.row.score}}</span>
                              <!--                          <el-progress :text-inside="true" :stroke-width="20" :percentage="scope.row.score*100" v-if="scope.row.score<0.3"></el-progress>-->
                              <!--                          <el-progress :text-inside="true" :stroke-width="20" :percentage="scope.row.score*100" v-else-if="scope.row.score<0.7" status="warning"></el-progress>-->
                              <!--                          <el-progress :text-inside="true" :stroke-width="20" :percentage="scope.row.score*100" v-else status="exception"></el-progress>-->
                            </div>
                          </template>
                        </el-table-column>
                      </el-col>


                    </el-table>
                  </el-row>
                </div>
              </el-col>
            </el-row>
          </div>

        </el-card>
        <el-card  shadow="hover" class="mgb22">
          <div>
            <el-row :gutter="24">
              <el-col class="right-col">
                <h3 class="right-col-title">图谱视图
                  <span class="right-col-bianhao">
                编号：{{$route.params.projectId}}
                    <el-button id="showDialog" type="text" @click="dialogNodeVisible = true" ref="showDialog" style="display: none">打开嵌套表格的 Dialog</el-button>
                </span></h3>
                <div  v-loading="loading">
                  <div id="mainKg" style="width: 100%;height: 800px;margin:0 auto;"  v-loading="loading"></div>


                </div>
              </el-col>
            </el-row>
          </div>
          <el-dialog title="明细信息" :visible="dialogNodeVisible" width="60%"   @open="openDialog" @close="closeDialog">
            <el-table
              :data="lingChenJiaoYiTable.list"
              height="500"
              stripe
              v-loading="detailTableLoading"
              v-if="detailType === '交易'"
              class="detailmessage"
              :header-cell-style="{ background: ' #333649', color:' #9297ad' }"
              :row-class-name="newtableRowClassName"
            >
              <el-table-column  property="id" label="ID" width="80" ></el-table-column>
              <el-table-column   property="keHuName" label="客户姓名" width="80"></el-table-column>
              <el-table-column   property="keHuIdNum" label="客户身份证号" width="200"></el-table-column>
              <el-table-column   property="kaHao" label="帐卡号" width="300"></el-table-column>
              <el-table-column   property="duiFangName" label="对手名称" width="80"></el-table-column>
              <el-table-column   property="duiFangZhangKaHao" label="对方账卡号" width="200"></el-table-column>
              <el-table-column   property="jiaoYiJinE" label="交易金额" width="100"></el-table-column>
              <el-table-column   property="jiaoYiJiGouName" label="交易机构" width="300"></el-table-column>
              <el-table-column   property="jiaoYiDate" label="交易时间" width="150"></el-table-column>
              <el-table-column   property="jiaoYiZhaiYao" label="交易摘要" width="150"></el-table-column>
            </el-table>

            <el-table
              :data="tongXingTable.list"
              height="500"
              stripe
              v-loading="detailTableLoading"
              :default-sort = "{prop: 'beginDate', order: 'ascending'}"
              v-if="detailType === '同行'"
              class="detailmessage"
              :header-cell-style="{ background: ' #333649', color:' #9297ad' }"
              :row-class-name="newtableRowClassName"
            >
              <el-table-column  property="id" label="ID" width="80" ></el-table-column>
              <el-table-column  property="m_idNum" label="同行人A" width="250" ></el-table-column>
              <el-table-column  property="o_idNum" label="同行人B" width="250" ></el-table-column>
              <el-table-column   property="child.hangBanCheCi" label="航班车次" width="80"></el-table-column>
              <el-table-column   property="cheXiangHao" label="车厢号" width="80"></el-table-column>
              <el-table-column   property="child.hangKongGongSi" label="航空公司" width="150"></el-table-column>
              <el-table-column   property="qiShiDiQu" label="起始地区" width="100"></el-table-column>
              <el-table-column   property="daoDaDiQu" label="到达地区" width="100"></el-table-column>
              <el-table-column   property="beginDate" label="起始日期" width="200"></el-table-column>
              <el-table-column  sortable property="endDate" label="终止日期" width="200"></el-table-column>
              <!--              <el-table-column   property="status" label="状态" width="200"></el-table-column>-->
              <el-table-column   property="chuXingLeiBie" label="出行类别" width="200"></el-table-column>
            </el-table>

            <el-table
              :data="xiangGuanRenYuanTable.list"
              height="500"
              stripe
              v-loading="detailTableLoading"
              v-if="detailType === '相关人员'"
              class="detailmessage"
              :header-cell-style="{ background: ' #333649', color:' #9297ad' }"
              :row-class-name="newtableRowClassName"
            >
              <el-table-column  property="id" label="ID" width="80" ></el-table-column>
              <el-table-column  property="associatedObjectName" label="关联对象名称" width="100" ></el-table-column>
              <el-table-column  property="idNum" label="身份证号" width="200" ></el-table-column>
              <el-table-column  property="docType" label="证件类型" width="250" ></el-table-column>
              <el-table-column   property="marketBodyName" label="市场主体名称" width="250"></el-table-column>
              <el-table-column   property="relationType" label="关联类型" width="100"></el-table-column>
              <el-table-column   property="contactPhone" label="联系电话" width="150"></el-table-column>
              <el-table-column   property="email" label="电子邮箱" width="150"></el-table-column>
              <el-table-column   property="nationality" label="国籍" width="80"></el-table-column>
              <el-table-column   property="fundingMethod" label="出资方式" width="100"></el-table-column>
              <el-table-column   property="fundingTime" label="出资时间" width="220"></el-table-column>
              <el-table-column   property="contribution" label="认缴出资额" width="100"></el-table-column>
              <el-table-column   property="contributionRatio" label="出资比例" width="80"></el-table-column>

            </el-table>
            <el-table
              :data="JiDongCheTable.list"
              height="500"
              stripe
              v-loading="detailTableLoading"
              v-if="detailType === '机动车'"
              class="detailmessage"
              :header-cell-style="{ background: ' #333649', color:' #9297ad' }"
              :row-class-name="newtableRowClassName"
            >
              <el-table-column  property="id" label="ID" width="80" ></el-table-column>
              <el-table-column   property="carOwner" label="机动车所有人" width="150"></el-table-column>
              <el-table-column   property="idNum" label="身份证号" width="200"></el-table-column>
              <el-table-column   property="haoPaiType" label="号牌种类" width="150"></el-table-column>
              <el-table-column   property="numberPlateNum" label="号牌号码" width="100"></el-table-column>
              <el-table-column   property="carBrand" label="车辆品牌" width="180"></el-table-column>
              <el-table-column   property="carType" label="车辆类型" width="80"></el-table-column>
              <el-table-column   property="carBodyColor" label="车身颜色" width="80"></el-table-column>
              <el-table-column   property="firstRegistrationDate" label="初次登记日期" width="150"></el-table-column>
              <el-table-column   property="licensingAuthority" label="发证机关" width="300"></el-table-column>
              <el-table-column   property="carStatus" label="机动车状态" width="200"></el-table-column>
            </el-table>

            <el-table
              :data="chuXingTable.list"
              height="500"
              stripe
              v-loading="detailTableLoading"
              v-if="detailType === '出行'"
              class="detailmessage"
              :header-cell-style="{ background: ' #333649', color:' #9297ad' }"
              :row-class-name="newtableRowClassName"
            >
              <el-table-column property="id" label="ID" width="80" ></el-table-column>
              <el-table-column property="name" label="姓名" width="150"></el-table-column>
              <el-table-column property="idNum" label="身份证号" width="200"></el-table-column>
              <el-table-column property="chuXingLeiBie" label="出行类别" width="200"></el-table-column>
              <el-table-column property="beginDate" label="起始日期" width="200"></el-table-column>
              <el-table-column property="endDate" label="终止日期" width="200"></el-table-column>
              <el-table-column property="qiShiDiQu" label="起始地区" width="100"></el-table-column>
              <el-table-column property="daoDaDiQu" label="到达地区" width="100"></el-table-column>
            </el-table>

            <el-table
              :data="weiZhangTable.list"
              height="500"
              stripe
              v-loading="detailTableLoading"
              v-if="detailType === '违章'"
              class="detailmessage"
              :header-cell-style="{ background: ' #333649', color:' #9297ad' }"
              :row-class-name="newtableRowClassName"
            >
              <el-table-column property="id" label="ID" width="80" ></el-table-column>
              <el-table-column property="driverLicenseNum" label="驾驶证号" width="150"></el-table-column>
              <el-table-column property="name" label="姓名" width="150"></el-table-column>
              <el-table-column property="idNum" label="身份证号" width="200"></el-table-column>
              <el-table-column property="numberPlateType" label="号牌种类" width="200"></el-table-column>
              <el-table-column property="numberPlateNum" label="号牌号码" width="200"></el-table-column>
              <el-table-column property="weiFaTime" label="违法时间" width="200"></el-table-column>
              <el-table-column property="weiFaAction" label="违法行为" width="100"></el-table-column>
              <el-table-column property="weiFaPlace" label="违法地点" width="100"></el-table-column>
              <el-table-column property="processingTime" label="处理时间" width="100"></el-table-column>
              <el-table-column property="chuLiJiGuanName" label="处理机关名称" width="100"></el-table-column>
            </el-table>

            <el-table
              :data="tongXinTable.list"
              height="500"
              stripe
              v-loading="detailTableLoading"
              v-if="detailType === '通信'"
              class="detailmessage"
              :header-cell-style="{ background: ' #333649', color:' #9297ad' }"
              :row-class-name="newtableRowClassName"
            >
              <el-table-column  property="id" label="ID" width="80" ></el-table-column>
              <el-table-column  property="parent.jiZhuName" label="主叫人" width="100" ></el-table-column>
              <el-table-column  property="parent.phoneNum" label="主叫手机号" width="150" ></el-table-column>
              <el-table-column  property="parent.jiZhuId" label="主叫人身份证号" width="200" ></el-table-column>
              <el-table-column  property="child.jiZhuName" label="被叫人" width="100" ></el-table-column>
              <el-table-column  property="child.phoneNum" label="被叫手机号" width="150" ></el-table-column>
              <el-table-column  property="child.jiZhuId" label="被叫人身份证号" width="200" ></el-table-column>
              <el-table-column  property="comType" label="通信类型" width="100" ></el-table-column>
              <el-table-column  property="comDate" label="通信日期" width="150" ></el-table-column>
              <el-table-column  property="talkTime" label="通话时间" width="100" ></el-table-column>
              <el-table-column  property="callingArea" label="主叫地区" width="100" ></el-table-column>
              <el-table-column  property="calledArea" label="被叫地区" width="100" ></el-table-column>
              <el-table-column  property="phoneImei" label="手机串号" width="200" ></el-table-column>
              <el-table-column  property="baseNum" label="基站编码" width="250" ></el-table-column>
              <el-table-column  property="baseCid" label="基站号CID" width="100" ></el-table-column>
              <el-table-column  property="villageLac" label="小区号LAC" width="100" ></el-table-column>

            </el-table>

            <el-table
              :data="fangChanTable.list"
              height="500"
              stripe
              v-loading="detailTableLoading"
              v-if="detailType === '房产'"
              class="detailmessage"
              :header-cell-style="{ background: ' #333649', color:' #9297ad' }"
              :row-class-name="newtableRowClassName"
            >
              <el-table-column  property="id" label="ID" width="80" ></el-table-column>
              <el-table-column  property="name" label="姓名" width="100" ></el-table-column>
              <el-table-column  property="idNum" label="身份证号" width="200" ></el-table-column>
              <el-table-column  property="zhengJianType" label="证件类型" width="100" ></el-table-column>
              <el-table-column   property="resultNum" label="查询结果套数" width="250"></el-table-column>
              <el-table-column   property="ownerName" label="所有权人或购房人姓名" width="100"></el-table-column>
              <el-table-column   property="ownerIdNum" label="所有权人或购房人证件号码" width="150"></el-table-column>
              <el-table-column   property="coOwnerName" label="共有权人姓名" width="150"></el-table-column>
              <el-table-column   property="coOwnerIdNum" label="共有权人证件号码" width="80"></el-table-column>
              <el-table-column   property="fangChanSuoShuDi" label="房产所属地" width="100"></el-table-column>
              <el-table-column   property="houseLocation" label="房屋坐落" width="120"></el-table-column>
              <el-table-column   property="buildArea" label="建筑面积" width="100"></el-table-column>
              <el-table-column   property="guiHuaYongTu" label="规划用途或用途" width="80"></el-table-column>
              <el-table-column  property="juzhuType" label="居住类型" width="200" ></el-table-column>
              <el-table-column  property="fangWuDengJiTime" label="房屋登记时间或网签时间" width="100" ></el-table-column>
              <el-table-column   property="transAmount" label="交易金额" width="250"></el-table-column>
              <el-table-column   property="payType" label="付款方式" width="100"></el-table-column>
              <el-table-column   property="libStatus" label="库状态" width="150"></el-table-column>
              <el-table-column   property="transOutTime" label="转出时间或退房时间" width="150"></el-table-column>
              <el-table-column   property="nextOwnerName" label="下一手所有权人或购房人" width="80"></el-table-column>
              <el-table-column   property="nextOwnerIdNum" label="下一手所有权人或购房人证件号码" width="100"></el-table-column>
              <el-table-column   property="address" label="地址缩写" width="120"></el-table-column>
              <el-table-column   property="louNum" label="楼号" width="100"></el-table-column>
              <el-table-column   property="menNum" label="门号" width="80"></el-table-column>
              <el-table-column   property="huNum" label="户号" width="150"></el-table-column>
              <el-table-column   property="isInitCheck" label="是否初始登记" width="80"></el-table-column>
              <el-table-column   property="isTransCheck" label="是否转移登记" width="100"></el-table-column>
              <el-table-column   property="dataFrom" label="数据来源" width="120"></el-table-column>
              <el-table-column   property="note" label="备注" width="100"></el-table-column>
              <el-table-column   property="receiptNo" label="收件号" width="80"></el-table-column>

            </el-table>



            <el-form style="" :model="modifyForm" ref="modifyForm" v-if="detailType === '标注'" label-width="100px" class="target-form">
              <!--              <el-scrollbar style="height: 400px;width: 100%">-->
              <el-form-item label="主体人" >
                <el-input v-model="modifyForm.name" :disabled="true" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="身份证号"  >
                <el-input v-model="modifyForm.idNum" :disabled="true" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="与目标对象关系" :label-width="formLabelWidth" >
                <el-select v-model="modifyForm.relation" :disabled="true" placeholder="请选择与目标对象关系">
                  <el-option label="目标对象本人" value="目标对象本人"></el-option>
                  <el-option label="近亲属" value="近亲属"></el-option>
                  <el-option label="重点人物（司机、秘书等）" value="重点人物（司机、秘书等）"></el-option>
                  <el-option label="上下级关系" value="上下级关系"></el-option>
                  <el-option label="同事" value="同事"></el-option>
                  <el-option label="中间人" value="中间人"></el-option>
                  <el-option label="商业伙伴" value="商业伙伴"></el-option>
                  <el-option label="远亲属" value="远亲属"></el-option>
                </el-select>
              </el-form-item>
              <el-table
                :data="featureTableData"
                style="width: 95%; height: 400px;overflow:scroll"
                :row-class-name="newtableRowClassName"
                :row-style="setFeatureRowStyle"
                class="featureDetail"
                :header-cell-style="{ background: ' #434760', color:' #989dbb',line_height:'10px' }"

              >
                <el-table-column
                  label="序号"
                  type="index"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="feature"
                  label="特征"
                  width="750">
                </el-table-column>
                <el-table-column label="" align="center" width="100">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click.stop="ruleDetailInfo(scope.row.id,modifyForm.idNum,modifyForm.name)" authorityKey="1804:BXDDSC" style="color:cornflowerblue;">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!--              <el-form-item label="特征"  >-->
              <!--                <el-input type="textarea" v-model="modifyForm.feature" :disabled="true" autocomplete="off" :rows="13" ></el-input>-->
              <!--              </el-form-item>-->
              <el-form-item label="疑点分数"  >
                <el-input v-model="modifyForm.score" :disabled="true" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item
                label="标注分数"
                prop="modifyScore"
                :rules="[
              { required: true, message: '疑点分数不能为空'},
              { type: 'number', message: '疑点分数必须为数字值'},
              {pattern:/(^([1-9]|10|[])$)/,message: '请输入1-10的整数'}
              // { pattern:/^(10(\.0{1,2})?|[0-9](\.[0-9]{1,2})?)$/,message: '请输入10以内的数字'}
            ]">

                <el-input v-model.number="modifyForm.modifyScore" autocomplete="off">
                  <template slot="append">
                    <span style="color: indianred">分数越高，可疑度越高</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-form>
            <div  slot="footer" class="dialog-footer">
              <el-button class="dialog-button-no" @click="dialogNodeVisible = false">取 消</el-button>
              <el-button class="dialog-button-ok" type="primary" v-if="detailType === '标注'" @click="modifyScoreHandler('modifyForm')">确 定</el-button>
            </div>


          </el-dialog>
        </el-card>
        <el-dialog title="目标对象信息" :visible.sync="idNumFormVisible">
          <span class="targetdetails-tishi">该专案未标注，请输入目标对象姓名<br><br></span>
          <el-form :model="idNumForm" class="target-form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-autocomplete
                class="my-autocomplete"
                v-model="idNumForm.name"
                :fetch-suggestions="querySearchByname"
                placeholder="请输入内容"
                @select="selectMuBiao"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.name }}</div>
                  <span class="idNum">{{ item.idNum }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="身份证号" :label-width="formLabelWidth">
              <el-autocomplete
                class="my-autocomplete"
                v-model="idNumForm.idNum"
                :fetch-suggestions="querySearchByIdNum"
                placeholder="请输入内容"
                @select="selectMuBiao"
              >
                <template slot-scope="{ item }">
                  <div class="name">{{ item.name }}</div>
                  <span class="idNum">{{ item.idNum }}</span>
                </template>
              </el-autocomplete>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="dialog-button-no" @click="idNumFormVisible = false">取 消</el-button>
            <el-button class="dialog-button-ok"  type="primary" @click="addMainBody">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="追加关系" :visible.sync="addRelationDialogVisible" width="60%">

          <el-col :span="14">
            <span class="targetdetails-tishi">请输入要追加的人物姓名：<br><br></span>
            <el-form  :model="addRelationIdNumForm" class="target-form">
              <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-autocomplete
                  class="my-autocomplete"
                  v-model="addRelationIdNumForm.name"
                  :fetch-suggestions="querySearchByname"
                  placeholder="请输入内容"
                  @select="selectZhuiJia"
                >
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.name }}</div>
                    <span class="idNum">{{ item.idNum }}</span>
                  </template>
                </el-autocomplete>
              </el-form-item>
              <el-form-item label="身份证号" :label-width="formLabelWidth">
                <el-autocomplete
                  class="my-autocomplete"
                  v-model="addRelationIdNumForm.idNum"
                  :fetch-suggestions="querySearchByIdNum"
                  placeholder="请输入内容"
                  @select="selectZhuiJia"
                >
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.name }}</div>
                    <span class="idNum">{{ item.idNum }}</span>
                  </template>
                </el-autocomplete>
              </el-form-item>
              <el-form-item :label-width="formLabelWidth">
                <span slot="label">
                  <span style="font-weight: normal">与目标对象关系</span>
                </span>
                <el-select v-model="addRelationIdNumForm.relation" placeholder="请选择与目标对象关系">
                  <el-option label="近亲属" value="近亲属"></el-option>
                  <el-option label="重点人物（司机、秘书等）" value="重点人物（司机、秘书等）"></el-option>
                  <el-option label="上下级关系" value="上下级关系"></el-option>
                  <el-option label="同事" value="同事"></el-option>
                  <el-option label="中间人" value="中间人"></el-option>
                  <el-option label="商业伙伴" value="商业伙伴"></el-option>
                  <el-option label="远亲属" value="远亲属"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="10"><div class="grid-content bg-purple-light" style="padding-left: 20px"></div>
            <span class="targetdetails-tishi">已追加人物名单：<br><br></span>
            <el-table
              :data="addPersonList"
              border
              height="200"
              style="width: 362px"
              class="addTable"
              :header-cell-style="{ background: '#494d68', color:' #dadada' ,border:'none'}"
              :row-class-name="newtableRowClassName"
            >
              <el-table-column width="1"></el-table-column>
              <el-table-column label="姓名"  prop="name"  align="center" width="120px">
                <template slot-scope="scope">
                  <div>
                    {{ scope.row.person.name }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="身份证" prop="idNum" align="center" width="240px">
                <template slot-scope="scope">
                  <div>
                    {{ scope.row.person.idNum }}
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <div slot="footer" class="dialog-footer" style="padding-right:50%">
            <el-button class="dialog-button-no" @click="addRelationDialogVisible = false">取 消</el-button>
            <el-button class="dialog-button-ok" type="primary" @click="addRelationBody">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="与目标对象关系" :visible.sync="relationFormVisible">
          <el-form :model="relationForm" class="target-form">
            <el-form-item label="与目标对象关系" :label-width="formLabelWidth">
              <el-select v-model="relationForm.relation" placeholder="请选择与目标对象关系" >
                <el-option label="近亲属" value="近亲属"></el-option>
                <el-option label="重点人物（司机、秘书等）" value="重点人物（司机、秘书等）"></el-option>
                <el-option label="上下级关系" value="上下级关系"></el-option>
                <el-option label="同事" value="同事"></el-option>
                <el-option label="中间人" value="中间人"></el-option>
                <el-option label="商业伙伴" value="商业伙伴"></el-option>
                <el-option label="远亲属" value="远亲属"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button class="dialog-button-no" @click="relationFormVisible = false">取 消</el-button>
            <el-button class="dialog-button-ok" type="primary" @click="addRelation">确 定</el-button>
          </div>
        </el-dialog>

        <el-dialog title="批量标注与目标对象关系" :visible.sync="batchaddrelationFormVisible"  width="60%">

          <el-form :model="relationForm">
            <el-row>
              <el-col :span="24"><div class="grid-content bg-purple"></div>
                <el-button class="setsomerelation" type="primary" size="large" id="selectRelationButton" @click="noticeMessage">
                  批量标注关系
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="15"><div class="grid-content bg-purple"></div>
                <el-container class="setsomerelation-contain">
                  <el-header height="30px">目标对象本人</el-header>
                  <el-main>
                    <el-table
                      :data="mainBodyTableData"
                      style="width: 100%"
                      class="relationDetails"
                      :cell-style="{background: '#3e425b'}"
                      :header-cell-style="{ background: '#3e425b', color:' #e2e1e6' ,border:'none'}"
                    >
                      <el-table-column
                        prop="name"
                        label="姓名"
                        width="180" align="center"
                      >
                        <template slot-scope="scope">
                          <div class="relationDetails-name">
                            {{ scope.row.name }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="idNum"
                        label="身份证号"
                        width="180" align="center">
                        <template slot-scope="scope">
                          <div class="relationDetails-idNum">
                            {{ scope.row.idNum }}
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-main>
                </el-container>
                <el-container class="setsomerelation-contain">
                  <el-header height="30px">近亲属
                    <el-button type="danger" icon="el-icon-delete" circle style="position: absolute;right:45%" size="mini" @click="deleteRelation1"></el-button>
                  </el-header>
                  <el-main>
                    <el-table
                      :data="jinQinShuTableData"
                      style="width:100%;height: 150px;overflow:scroll"
                      @selection-change="handleSelectionChange"
                      class="relationDetails"
                      :cell-style="{background: '#3e425b'}"
                      :header-cell-style="{ background: '#3e425b', color:' #e2e1e6' ,border:'none'}"
                    >
                      <el-table-column
                        type="selection"
                        width="55">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="姓名"
                        width="180" align="center"
                      >
                        <template slot-scope="scope">
                          <div class="relationDetails-name">
                            {{ scope.row.name }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="idNum"
                        label="身份证号"
                        width="180" align="center">
                        <template slot-scope="scope">
                          <div class="relationDetails-idNum">
                            {{ scope.row.idNum }}
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-main>
                </el-container>
                <el-container class="setsomerelation-contain">
                  <el-header height="30px">重点人物（司机、秘书等）
                    <el-button type="danger" icon="el-icon-delete" circle style="position: absolute;right:45%" size="mini" @click="deleteRelation2"></el-button>
                  </el-header>
                  <el-main>
                    <el-table
                      :data="zhongDianRenWuTableData"
                      style="width:100%;height: 150px;overflow:scroll"
                      @selection-change="handleSelectionChange"
                      class="relationDetails"
                      :cell-style="{background: '#3e425b'}"
                      :header-cell-style="{ background: '#3e425b', color:' #e2e1e6' ,border:'none'}"
                    >
                      <el-table-column
                        type="selection"
                        width="55">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="姓名"
                        width="180" align="center"
                      >
                        <template slot-scope="scope">
                          <div class="relationDetails-name">
                            {{ scope.row.name }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="idNum"
                        label="身份证号"
                        width="180" align="center"
                      >
                        <template slot-scope="scope">
                          <div class="relationDetails-idNum">
                            {{ scope.row.idNum }}
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-main>
                </el-container>
                <el-container class="setsomerelation-contain">
                  <el-header height="30px">上下级关系
                    <el-button type="danger" icon="el-icon-delete" circle style="position: absolute;right:45%" size="mini" @click="deleteRelation3"></el-button>
                  </el-header>
                  <el-main>
                    <el-table
                      :data="shangXiaJiTableData"
                      style="width:100%;height: 150px;overflow:scroll"
                      @selection-change="handleSelectionChange"
                      class="relationDetails"
                      :cell-style="{background: '#3e425b'}"
                      :header-cell-style="{ background: '#3e425b', color:' #e2e1e6' ,border:'none'}">
                      <el-table-column
                        type="selection"
                        width="55">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="姓名"
                        width="180" align="center"
                      >
                        <template slot-scope="scope">
                          <div class="relationDetails-name">
                            {{ scope.row.name }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="idNum"
                        label="身份证号"
                        width="180" align="center">
                        <template slot-scope="scope">
                          <div class="relationDetails-idNum">
                            {{ scope.row.idNum }}
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-main>
                </el-container>
                <el-container class="setsomerelation-contain">
                  <el-header height="30px">同事
                    <el-button type="danger" icon="el-icon-delete" circle style="position: absolute;right:45%" size="mini" @click="deleteRelation4"></el-button>
                  </el-header>
                  <el-main>
                    <el-table
                      :data=tongShiTableData
                      style="width:100%;height: 150px;overflow:scroll"
                      @selection-change="handleSelectionChange"
                      class="relationDetails"
                      :cell-style="{background: '#3e425b'}"
                      :header-cell-style="{ background: '#3e425b', color:' #e2e1e6' ,border:'none'}"
                    >
                      <el-table-column
                        type="selection"
                        width="55">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="姓名"
                        width="180" align="center"
                      >
                        <template slot-scope="scope">
                          <div class="relationDetails-name">
                            {{ scope.row.name }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="idNum"
                        label="身份证号"
                        width="180" align="center">
                        <template slot-scope="scope">
                          <div class="relationDetails-idNum">
                            {{ scope.row.idNum }}
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-main>
                </el-container>
                <el-container class="setsomerelation-contain">
                  <el-header height="30px">中间人
                    <el-button type="danger" icon="el-icon-delete" circle style="position: absolute;right:45%" size="mini" @click="deleteRelation5"></el-button>
                  </el-header>
                  <el-main>
                    <el-table
                      :data="zhongJianRenTableData"
                      style="width:100%;height: 150px;overflow:scroll"
                      @selection-change="handleSelectionChange"
                      class="relationDetails"
                      :cell-style="{background: '#3e425b'}"
                      :header-cell-style="{ background: '#3e425b', color:' #e2e1e6' ,border:'none'}"
                    >
                      <el-table-column
                        type="selection"
                        width="55">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="姓名"
                        width="180" align="center"
                      >
                        <template slot-scope="scope">
                          <div class="relationDetails-name">
                            {{ scope.row.name }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="idNum"
                        label="身份证号"
                        width="180" align="center">
                        <template slot-scope="scope">
                          <div class="relationDetails-idNum">
                            {{ scope.row.idNum }}
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-main>
                </el-container>
                <el-container class="setsomerelation-contain">
                  <el-header height="30px">商业伙伴
                    <el-button type="danger" icon="el-icon-delete" circle style="position: absolute;right:45%" size="mini" @click="deleteRelation6"></el-button>
                  </el-header>
                  <el-main>
                    <el-table
                      :data="shangYeHuoBanTableData"
                      style="width:100%;height: 150px;overflow:scroll"
                      @selection-change="handleSelectionChange"
                      class="relationDetails"
                      :cell-style="{background: '#3e425b'}"
                      :header-cell-style="{ background: '#3e425b', color:' #e2e1e6' ,border:'none'}"
                    >
                      <el-table-column
                        type="selection"
                        width="55">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="姓名"
                        width="180" align="center"
                      >
                        <template slot-scope="scope">
                          <div class="relationDetails-name">
                            {{ scope.row.name }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="idNum"
                        label="身份证号"
                        width="180" align="center">
                        <template slot-scope="scope">
                          <div class="relationDetails-idNum">
                            {{ scope.row.idNum }}
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-main>
                </el-container>
                <el-container class="setsomerelation-contain">
                  <el-header height="30px">远亲属
                    <el-button type="danger" icon="el-icon-delete" circle style="position: absolute;right:45%" size="mini" @click="deleteRelation7"></el-button>
                  </el-header>
                  <el-main>
                    <el-table
                      :data="yuanQinShuTableData"
                      style="width:100%;height: 150px;overflow:scroll"
                      @selection-change="handleSelectionChange"
                      class="relationDetails"
                      :cell-style="{background: '#3e425b'}"
                      :header-cell-style="{ background: '#3e425b', color:' #e2e1e6' ,border:'none'}"
                    >
                      <el-table-column
                        type="selection"
                        width="55">
                      </el-table-column>
                      <el-table-column
                        prop="name"
                        label="姓名"
                        width="180" align="center"
                      >
                        <template slot-scope="scope">
                          <div class="relationDetails-name">
                            {{ scope.row.name }}
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="idNum"
                        label="身份证号"
                        width="180" align="center">
                        <template slot-scope="scope">
                          <div class="relationDetails-idNum">
                            {{ scope.row.idNum }}
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </el-main>
                </el-container>
              </el-col>

              <el-col :span="9"><div class="grid-content bg-purple-light"></div>
                <el-container class="personlist-contain">
                  <el-header height="30px">人员对象</el-header>
                  <el-main >
                    <el-checkbox-group v-model="checkedBodies" style="display:grid;height:500px;overflow:scroll">
                      <el-checkbox v-for="person in noRelationBody" :label="person.idNum" :key="person.idNum">
                        <el-tooltip class="item" effect="dark" :content="'身份证号：'+person.idNum" placement="top">
                          <el-button class="person-name" type="text">{{person.name}}</el-button>
                        </el-tooltip>
                      </el-checkbox>
                    </el-checkbox-group>
                  </el-main>
                </el-container>
              </el-col>
            </el-row>
          </el-form>
          <!--          <div slot="footer" class="dialog-footer">-->
          <!--            <el-button @click="batchaddrelationFormVisible = false">取 消</el-button>-->
          <!--            <el-button type="primary" @click="batchaddrelationFormVisible = false">确 定</el-button>-->
          <!--          </div>-->
        </el-dialog>

        <el-dialog
          title="提示"
          :visible.sync="messageDialogVisible"
          width="30%">
          <span class="targetdetails-tishi">请先选择对象再进行批量标注</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="messageDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog
          title="详细进度"
          :visible.sync="laquDialogVisible"
          width="40%"
          center>
          <el-row :gutter="24">
            <el-col :span="8"><div class="tablename">户籍表：<b style="color: white;font-weight: normal">{{laquCount.hujiHandledCount}}/{{laquCount.hujiMaxCount}}</b></div></el-col>
            <el-col :span="8"><div class="tablename">出行表：<b style="color: white;font-weight: normal">{{laquCount.chuxingHandledCount}}/{{laquCount.chuxingMaxCount}}</b></div></el-col>
            <el-col :span="8"><div class="tablename">房产表：<b style="color: white;font-weight: normal">{{laquCount.fangchanHandledCount}}/{{laquCount.fangchanMaxCount}}</b></div></el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8"><div class="tablename">机构表：<b style="color: white;font-weight: normal">{{laquCount.jigouHandledCount}}/{{laquCount.jigouMaxCount}}</b></div></el-col>
            <el-col :span="8"><div class="tablename">同户表：<b style="color: white;font-weight: normal">{{laquCount.tonghuHandledCount}}/{{laquCount.tonghuMaxCount}}</b></div></el-col>
            <el-col :span="8"><div class="tablename">通讯记录表：<b style="color: white;font-weight: normal">{{laquCount.tongxunjiluHandledCount}}/{{laquCount.tongxunjiluMaxCount}}</b></div></el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8"><div class="tablename">通讯机主表：<b style="color: white;font-weight: normal">{{laquCount.tongxunjizhuHandledCount}}/{{laquCount.tongxunjizhuMaxCount}}</b></div></el-col>
            <el-col :span="8"><div class="tablename">违章信息表：<b style="color: white;font-weight: normal">{{laquCount.weizhangHandledCount}}/{{laquCount.weizhangMaxCount}}</b></div></el-col>
            <el-col :span="8"><div class="tablename">银行持卡表：<b style="color: white;font-weight: normal">{{laquCount.yinhangchikaHandledCount}}/{{laquCount.yinhangchikaMaxCount}}</b></div></el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8"><div class="tablename">婚姻表：<b style="color: white;font-weight: normal">{{laquCount.hunyinHandledCount}}/{{laquCount.hunyinMaxCount}}</b></div></el-col>
            <el-col :span="8"><div class="tablename">相关人员表：<b style="color: white;font-weight: normal">{{laquCount.xiangguanrenyuanHandledCount}}/{{laquCount.xiangguanrenyuanMaxCount}}</b></div></el-col>
            <el-col :span="8"><div class="tablename">银行流水表：<b style="color: white;font-weight: normal">{{laquCount.yinhangliushuiHandledCount}}/{{laquCount.yinhangliushuiMaxCount}}</b></div></el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8"><div class="tablename">机动车表：<b style="color: white;font-weight: normal">{{laquCount.jidongcheHandledCount}}/{{laquCount.jidongcheMaxCount}}</b></div></el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button class="dialog-button-ok" type="primary" @click="laquDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>

      </el-col>


    </el-row>
  </div>
</template>

<script>
import $ from 'jquery'
import NProgress from  '../../../../nprogress-master/nprogress'
import '../../../../nprogress-master/nprogress.css'
import {getModelScore, getRule1DetailList,getRule2DetailList,getRule3DetailList,getRule4DetailList,getRule5DetailList,getRule6DetailList,getRule7DetailList,getRule8DetailList} from '@/api/doubtMining'
import {getRule10DetailList,getRule11DetailList,getRule12DetailList,getRule14DetailList,getRule15DetailList,getRule17DetailList,getRule18DetailList} from '@/api/doubtMining'
import {getPersonTongXinPinFanRelationtList} from '@/api/doubtMining'
import {getImgURL} from '@/api/doubtMining'
import { getPersonWithTooManyHousesInfo } from '@/api/doubtMining'
import { getKeYiJiaoYiPersonList } from '@/api/doubtMining'
import { getLingChenJiaoYiPersonList } from '@/api/doubtMining'
import { getPersonWithTooManyJiDongCheInfo } from '@/api/doubtMining'
import { getPersonWithTooManyJiGouInfo } from '@/api/doubtMining'
import { getMainBodyAndCoPersonInfo } from '@/api/doubtMining'
import { getPersonByIdNumInfo } from '@/api/doubtMining'
import { getAllDataBaseId } from '@/api/doubtMining'
import { getHeFaInfo } from '@/api/doubtMining'
import { getSmFlag } from '@/api/doubtMining'
import { getDaFenFlag } from '@/api/doubtMining'
import { getTongXinCount} from "@/api/doubtMining"
import { getJiaoYiCount} from "@/api/doubtMining"
import {getPersonHouseList} from "@/api/doubtMining";
import {getPersonJiDongCheList} from "@/api/doubtMining";
import {getPersonJiGouList} from "@/api/doubtMining";
import {getTongXing} from "@/api/doubtMining";
import { getJiaoYiDetailList } from "@/api/doubtMining";
import { getTongXunDetailList } from "@/api/doubtMining";
import {getFangChanDetailList} from "@/api/doubtMining";
import {getJiGouDetailList} from "@/api/doubtMining";
import {getJiDongCheDetailList} from "@/api/doubtMining";
import {getTongXingDetailList} from "@/api/doubtMining";
import {getAllMainBodyInfo} from "@/api/doubtMining";
import {addPersonRelation} from "@/api/doubtMining";
import {addAllPersonRelation} from "@/api/doubtMining";
import {deletePersonRelation} from "@/api/doubtMining";
import {deleteAddPersonRelation} from "@/api/doubtMining";
import {getAddPerson} from "@/api/doubtMining";
import { getsaveRelation } from "@/api/doubtMining";
import {getLabeled} from "@/api/doubtMining";
import {
  personTongXingRelationListHandler,
  personTongXinPinFanRelationtListHandler
} from '@/utils/kg/doubtMiningKgListResultHandler'
import { personHousesRelationtListHandler } from '@/utils/kg/doubtMiningKgListResultHandler'
import { personPartnerRelationtListHandler } from '@/utils/kg/doubtMiningKgListResultHandler'
import { personJiLiShuRelationtListHandler } from '@/utils/kg/doubtMiningKgListResultHandler'
import { personLingChenRelationtListHandler } from '@/utils/kg/doubtMiningKgListResultHandler'
import { personCarsRelationtListHandler } from '@/utils/kg/doubtMiningKgListResultHandler'
import { personCompanyRelationtListHandler } from '@/utils/kg/doubtMiningKgListResultHandler'
import { personFamilyRelationtListHandler } from '@/utils/kg/doubtMiningKgListResultHandler'
import { personTongXinCountHandler } from '@/utils/kg/doubtMiningKgListResultHandler'
import { personJiaoYiCountHandler } from '@/utils/kg/doubtMiningKgListResultHandler'
import { mainBodyAndCoPersonListHandler } from '@/utils/kg/doubtMiningKgListResultHandler'
import { nodeCategory } from '@/utils/kg/kgListResultHandler'
import { getTotalNodeAndRelationCount, postgres2Neo4j,rePostgres2Neo4j } from '@/api/dashboard'
import {addTargetIdNum} from "@/api/doubtMining";

const echarts = require('echarts')
const filterOptions = ['房产信息', '机动车信息', '交易信息', '通话信息','同行信息','公司信息'];
export default {
  name: 'KGEcharts',

  data() {
    return {
      laquDialogVisible: false,
      featureTableData:[],
      showFeatureText:'',
      showImgURL:'',
      idNumQuery:'',
      showImg:false,
      checkAll: true,
      isIndeterminate: true,
      checkedOptions: ['房产信息', '机动车信息', '交易信息', '通话信息','同行信息','公司信息'],
      cities: filterOptions,
      dialogTableVisible: false,
      idNumFlag: false,
      idNumFormVisible: false, //输入身份证号的表单是否展示标志
      addRelationDialogVisible:false,//追加关系表单是否显示
      batchaddrelationFormVisible:false, // 批量标注关系表单是否显示
      messageDialogVisible:false,//消息提示对话框
      mainBodyTableData: [], //批量标注关系的结果展示表格
      jinQinShuTableData:[],
      zhongDianRenWuTableData:[],
      shangXiaJiTableData:[],
      tongShiTableData:[],
      zhongJianRenTableData:[],
      shangYeHuoBanTableData:[],
      yuanQinShuTableData:[],
      relationFormVisible: false,//选择关系表单
      numFeature:[],
      weightValue : 60,
      weightThreshold : 0.6,
      tishiAccount_style: {
        color: "",
      },
      personVertexTable:{
        pageSize:15,
        list: null,
      },
      // 明细类型
      detailType: '',
      modifyList:[],
      modifyForm: {
        idNum:"",
        name:"",
        relation:"",
        feature:"",
        feature_eng:"",
        score:"",
        modifyScore:"",
      },
      idNumForm: {
        name:'',
        idNum: '',
      }, //主体人身份证号表单
      addRelationIdNumForm:{
        name:'',
        idNum:'',
        relation:''
      },//追加关系身份证号表单
      relationForm: {
        relation:"",
      }, //关系表单
      relationMap:{}, // {idNum:relation}
      checkedBodies:[], //选中的需要批量标注的人员
      checkedRelation:'',//选中的关系
      formLabelWidth: '120px', //表单项宽度
      addRelationFlag:false,//追加关系按钮是否显示
      batchAddRelationFlag:false, // 关系标注按钮是否显示
      detailTableLoading: false,
      lingChenJiaoYiTable:{
        pageSize:15,
        list: null,
        dateList:null,
      },
      tongXingTable:{
        pageSize:15,
        list: null,
        dateList:null,
      },
      xiangGuanRenYuanTable:{
        pageSize:15,
        list: null,
        dateList:null,
      },
      JiDongCheTable:{
        pageSize:15,
        list: null,
        dateList:null,
      },
      weiZhangTable:{
        pageSize:15,
        list: null,
        dateList:null,
      },
      fangChanTable:{
        pageSize:15,
        list: null,
        dateList:null,
      },
      tongXinTable:{
        pageSize:15,
        list: null,
        dateList:null,
      },
      chuXingTable:{
        pageSize:15,
        list: null,
        dateList:null,
      },
      dialogNodeVisible: false,
      dialogRelationVisible: false,
      laquCount: {
        totalMaxCount: 0,
        totalHandledCount: 0,
        chuxingMaxCount: 0,
        chuxingHandledCount: 0,
        fangchanMaxCount: 0,
        fangchanHandledCount: 0,
        hujiMaxCount: 0,
        hujiHandledCount: 0,
        hunyinMaxCount: 0,
        hunyinHandledCount: 0,
        jidongcheMaxCount: 0,
        jidongcheHandledCount: 0,
        jigouMaxCount: 0,
        jigouHandledCount: 0,
        tonghuMaxCount: 0,
        tonghuHandledCount: 0,
        tongxunjiluMaxCount: 0,
        tongxunjiluHandledCount: 0,
        tongxunjizhuMaxCount: 0,
        tongxunjizhuHandledCount: 0,
        weizhangMaxCount: 0,
        weizhangHandledCount: 0,
        xiangguanrenyuanMaxCount: 0,
        xiangguanrenyuanHandledCount: 0,
        yinhangchikaMaxCount: 0,
        yinhangchikaHandledCount: 0,
        yinhangliushuiMaxCount: 0,
        yinhangliushuiHandledCount: 0
      },
      // 在data里面设置鼠标悬浮或者鼠标点击时的关系id以及父子节点的id
      neo4j: {
        totalNodeCount: 0,
        totalRelationCount: 0
      },
      // anaysisFlag:false,
      anaysisFlag:false,
      trainFlag:false,
      thresholdFlag:true,
      featureExtraFlag:true,
      //idNumFlag:true,
      option: null,
      list: null,
      allScoreList : [],
      taskCount:0,
      totalTaskCount:0,
      total: 0,// 总记录数
      nodeList:[],
      relationList:[],
      keYiList:[],
      featureMap:{},
      projectId: 'test_230131093423588',
      idNum:'', //主体人的身份证号
      clickIdNum:'', //标记人的身份证号
      // projectId: 'test_',
      limit: 1,
      // 等待遮罩
      loading: false,
      pullLoading: false,
      pullDataState:'未拉取完成',
      userId : 1,
      allDataBaseId: [],
      selectedProjectId:'',
      step :'拉取数据中,拉取期间可关闭该页面',
      getTotalCountTimer:'',
      deleteNodeStateTimer: '',
      getLaquState:'',
      finishStateTimer:'',
      getPersonTableDataTimer:'',
      personAnaysisList:[],
      allPersonList:[],
      noRelationBody:[],//没有标注关系的人
      multipleSelection: [],
      addPersonList:[],
      labeledIdNums:[],
    }
  },
  created() {
    // alert(this.$route.params.projectId)
    this.numFeature = new Map()
    this.featureMap = new Map()
    this.relationMap = new Map()
    this.projectId = this.$route.params.projectId
    this.userId = this.$route.params.userId
    this.$message({
      message: '数据新增或重新治理后，请重新拉取数据',
      type: 'warning'
    })
    this.flushRouter(this.userId,this.projectId)
    // this.getHeFaInfo(this.userId,this.projectId)
    //this.getDaFenFlag(this.projectId)
    this.loadAllPersons(this.projectId)
    // this.getHeFaInfo(this.userId,this.projectId)
    // this.getAllDataBaseId()
    // this.fetchPersonVertexTableData(1) //初始从第1页查询
    // this.fetchData()
  },

  methods: {
    setFeatureRowStyle(row) {
      if (row.row.feature.indexOf("*") != -1) {
        console.log("xxxxxxxxxxxxxxxxx")
        return {'color':'#d3da35'}
      }
    },
    tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    newtableRowClassName({row, rowIndex}) {
      if (rowIndex%2 === 0) {
        return 'black-1';
      } else{
        return 'black-2';
      }
    },
    queryImgUrl(){
      getImgURL(this.projectId, this.idNumQuery).then(response => {
        this.showImgURL = response.data;
      });
    },
    handleCheckAllChange(val) {
      this.checkedOptFions = val ? filterOptions : [];
      this.isIndeterminate = false;
    },
    //点击可疑特征行
    getRow(row,event,column){
      console.log(row)
      console.log(column)
    },
    onExchange(scope){
      let moment = this.personVertexTable.list[scope.$index]
      this.$set(this.personVertexTable.list,scope.$index, moment)
    },
    modifyScoreHandler(modifyForm){
      const _this = this
      var biaojiPersonList=[];
      biaojiPersonList.push(this.modifyForm)
      console.log(this.modifyForm)
      $.ajax({
        // url: 'http://172.16.44.129:6888/kg/node/saveLabel',
        // url: 'http://127.0.0.1:8080/node/saveLabel',
        url: window.global_config.BASE_URL+'node/saveLabel',
        data: {
          list:biaojiPersonList,
          projectId:this.projectId,
          userId:this.userId
        },
        type: "post",
        dataType: "json",
        async: true,
        success: function (response) {
          console.log(response)
          console.log("标注完成")
          var list=[]
          list=_this.personVertexTable.list
          console.log("list"+list)
          for(var i=0;i < list.length;i++){
            if(_this.personVertexTable.list[i].idNum === _this.modifyForm.idNum){
              _this.personVertexTable.list[i].modifyScore=_this.modifyForm.modifyScore
              break
            }
          }
          _this.labeledIdNums.push(_this.modifyForm.idNum);
          _this.$message.success('标注成功')
          _this.dialogNodeVisible = false

          // var myChart = echarts.init(document.getElementById('mainKg'));
          // myChart.clear()
          // // myChart.setOption(_this.option)
          // // myChart.clear()
          // // myChart.setOption(_this.option)
          // setTimeout(function(){
          //   myChart.clear()
          //   myChart.setOption(_this.option)
          // }, 500);
          // setTimeout(function(){
          //   myChart.clear()
          //   myChart.setOption(_this.option)
          // }, 1000);
          // setTimeout(function(){
          //   myChart.clear()
          //   myChart.setOption(_this.option)
          // }, 1500);
          // setTimeout(function(){
          //   myChart.clear()
          //   myChart.setOption(_this.option)
          // }, 2000);
        },error: function () {
          alert("标注失败")
        }
      });


    },
    _strMapToObj(strMap){
      let obj= Object.create(null);
      for (let[k,v] of strMap) {
        obj[k] = v;
      }
      return obj;
    },
    /**
     *map转换为json
     */
    _mapToJson(map) {
      return JSON.stringify(this._strMapToObj(map));
    },
    trainModel(){
      // if(this.personVertexTable.list == undefined || this.personVertexTable.list == null || this.personVertexTable.list.length < 0){
      //   this.$message('数据准备中，请稍后...')
      //   return
      // }
      // const _this = this;
      // for(let i=0;i<_this.personVertexTable.list.length;i++){
      //   // var jsonStr = JSON.stringify(_this.numFeature.get(_this.personVertexTable.list[i].idNum))
      //   // _this.personVertexTable.list[i].numFeature = _this.numFeature.get(_this.personVertexTable.list[i].idNum)
      //   _this.personVertexTable.list[i].numFeature = _this._mapToJson(_this.numFeature.get(_this.personVertexTable.list[i].idNum))
      // }
      // $.ajax({
      //   // url: 'http://156.7.248.93:6888/kg/node/trainModel',
      //   url: 'http://127.0.0.1:8080/node/saveLabel',
      //   data: {
      //     featureScore:_this.personVertexTable.list,
      //     projectId:this.projectId
      //   },
      //   type: "post",
      //   dataType: "json",
      //   async: true,
      //   success: function (response) {
      //     console.log(response)
      //     _this.$message(response.data)
      //     var myChart = echarts.init(document.getElementById('mainKg'));
      //     myChart.clear()
      //     // myChart.setOption(_this.option)
      //     // myChart.clear()
      //     // myChart.setOption(_this.option)
      //     setTimeout(function(){
      //       myChart.clear()
      //       myChart.setOption(_this.option)
      //     }, 500);
      //     setTimeout(function(){
      //       myChart.clear()
      //       myChart.setOption(_this.option)
      //     }, 1000);
      //     setTimeout(function(){
      //       myChart.clear()
      //       myChart.setOption(_this.option)
      //     }, 1500);
      //     setTimeout(function(){
      //       myChart.clear()
      //       myChart.setOption(_this.option)
      //     }, 2000);
      //   },error: function () {
      //     alert("可疑信息加载失败")
      //   }
      // });
      const _this=this
      $.ajax({
        // url: 'http://172.16.44.129:6888/kg/node/trainModel',
        // url: 'http://127.0.0.1:8080/node/trainModel',
        url: window.global_config.BASE_URL+'node/trainModel',
        data: {
        },
        type: "post",
        dataType: "json",
        async: true,
        success: function(response) {
          // console.log(response)
          // console.log("标注完成")
          // var list=[]
          // list=_this.personVertexTable.list
          // console.log("list"+list)
          // for(var i=0;i < list.length;i++){
          //   if(_this.personVertexTable.list[i].idNum === _this.modifyForm.idNum){
          //     _this.personVertexTable.list[i].modifyScore=_this.modifyForm.modifyScore
          //     break
          //   }
          // }
          if(response.code==500){
            alert("训练失败")
          }
          else{
            _this.$message.success('模型训练成功')
            _this.loadKeYiInfoList()
            _this.dialogNodeVisible = false
          }

        },error: function() {
          alert("训练失败")
        }
      });
    },
    ruleDetailInfo(ruleId,idNum,name){
      console.log(ruleId,idNum)
      if(ruleId == 1 || ruleId == 2 || ruleId ==3){
        this.detailType='通信';
        getRule1DetailList(idNum,ruleId,this.projectId).then(response=>{
          this.tongXinTable.list=response.data;
          this.detailTableLoading = false;
        })
      }else if(ruleId == 4 || ruleId == 5 || ruleId ==6){
        this.detailType='交易';
        getRule2DetailList(idNum,ruleId,this.projectId).then(response=>{
          this.lingChenJiaoYiTable.list=response.data;
          this.detailTableLoading = false;
        })
      }else if(ruleId == 7 || ruleId == 8 || ruleId ==9){
        this.detailType='交易';
        getRule3DetailList(idNum,ruleId,this.projectId).then(response=>{
          this.lingChenJiaoYiTable.list=response.data;
          this.detailTableLoading = false;
        })
      }else if(ruleId == 17){
        this.detailType='通信';
        getRule10DetailList(idNum,ruleId,this.projectId).then(response=>{
          this.tongXinTable.list=response.data;
          this.detailTableLoading = false;
        })
      }else if(ruleId == 18){
        this.detailType='出行';
        getRule11DetailList(idNum,ruleId,this.projectId).then(response=>{
          this.chuXingTable.list=response.data;
          this.detailTableLoading = false;
        })
      }else if(ruleId == 19){
        this.detailType='交易';
        getRule12DetailList(idNum,ruleId,this.projectId).then(response=>{
          this.lingChenJiaoYiTable.list=response.data;
          this.detailTableLoading = false;
        })
      }else if(ruleId == 20){
        this.detailType='交易';
        getRule14DetailList(idNum,ruleId,this.projectId).then(response=>{
          this.lingChenJiaoYiTable.list=response.data;
          this.detailTableLoading = false;
        })
      }else if(ruleId == 21){
        this.detailType='交易';
        getRule15DetailList(idNum,ruleId,this.projectId).then(response=>{
          this.lingChenJiaoYiTable.list=response.data;
          this.detailTableLoading = false;
        })
      }else if(ruleId == 22){
        this.detailType='交易';
        getRule17DetailList(idNum,ruleId,this.projectId).then(response=>{
          this.lingChenJiaoYiTable.list=response.data;
          this.detailTableLoading = false;
        })
      }else if(ruleId == 23){
        this.detailType='违章';
        getRule18DetailList(idNum,ruleId,this.projectId).then(response=>{
          this.weiZhangTable.list=response.data;
          this.detailTableLoading = false;
        })
      }
      else if(ruleId == 10){
        this.detailType='房产';
        getRule4DetailList(idNum,ruleId,this.projectId).then(response=>{
          this.fangChanTable.list=response.data;
          this.detailTableLoading = false;
        })
      }
      else if(ruleId == 12){
        this.detailType='机动车';
        getRule5DetailList(idNum,ruleId,this.projectId).then(response=>{
          this.JiDongCheTable.list=response.data;
          this.detailTableLoading = false;
        })
      }
      else if(ruleId == 11){
        this.detailType='相关人员';
        getRule6DetailList(idNum,ruleId,this.projectId).then(response=>{
          this.xiangGuanRenYuanTable.list=response.data;
          this.detailTableLoading = false;
        })
      }
      else if(ruleId == 13 || ruleId == 14 || ruleId ==15){
        this.detailType='交易';
        getRule7DetailList(idNum,ruleId,this.projectId).then(response=>{
          this.lingChenJiaoYiTable.list=response.data;
          this.detailTableLoading = false;
        })
      }
      else if(ruleId == 16){
        this.detailType='同行';
        const _this = this
        _this.tongXingTable.list=[]
        getRule8DetailList(idNum,ruleId,this.projectId).then(response=>{
          for(let item of response.data){
            console.log(item)
            //  设置同行人名称和id
            item.m_idNum = idNum+' '+name
            item.o_idNum = item.parent.idNum+' '+item.parent.name
            // item.m_name = m_name
            // item.o_name = o_name
            _this.tongXingTable.list.push(item)
          }
          this.detailTableLoading = false;
        })
      }

    },
    checkTrainFlag(){
      //  判断personVertexList是否为空，来决定”模型训练“按钮是否开放
      if(this.personVertexTable.list != undefined &&this.personVertexTable.list != null && this.personVertexTable.list.length >= 0){
        this.trainFlag = true
      }
    },
    // 分页查询
    page(currentPage){
      this.fetchPersonVertexTableData(currentPage)
    },
    formatTooltip(val) {
      const _this = this
      _this.weightThreshold = val / 100
      console.log(_this.weightThreshold)
      return val / 100;
    },

    flushRouter(usrId,projectId) {
      console.log("动态")
      let prev_projectId = localStorage.getItem("projectId")
      if(prev_projectId !== projectId){
        // 强制刷新
        location.reload()
      }else{
        // 不需要刷新
        this.getHeFaInfo(this.userId,this.projectId)
      }
      localStorage.setItem("projectId",projectId)
    },
    getHeFaInfo(usrId,projectId) {
      const _this = this
      // _this.getTotalNodeAndRelationCount(projectId)
      let isPulled = false
      _this.getSmFlag(projectId,'1',function(result) {
            // alert('isPulled:'+result)
            isPulled = result
            // _this.getTotalNodeAndRelationCount(projectId)
            // 判断该专案的数据是否被拉取过
            if(isPulled){
              //  已被拉取
              //   alert(111)
              _this.$message('已拉取数据')
              _this.pullDataState='拉取完成'
              _this.getTotalNodeAndRelationCount(projectId)
              if(_this.idNumFormVisible == false && _this.pullDataState === '拉取完成'){
                _this.idNumFlag = true
                _this.getDaFenFlag(projectId)
              }
              _this.step = _this.pullDataState
            }else {
              let isPullIng = false
              _this.getSmFlag(projectId,'2',function(result) {
                  // alert('isPulled:'+result)
                  isPullIng = result
                  // 判断该专案的数据是否被拉取过
                  if(isPullIng){
                    //  已被拉取
                    //   alert(111)
                    _this.$message('后台已在拉取中')
                    _this.pullDataState='正在拉取'
                    _this.pullLoading = true
                    _this.getTotalCountTimer = setInterval(_this.getTotalNodeAndRelationCount, 3000,projectId);
                    _this.getLaquState = setInterval(_this.laquOrNot, 30000)
                    // _this.getTotalCountTimer = setInterval(_this.getSmFlag, 10000,projectId,'1');
                    // this.timer = setTimeout(this.fetchPersonVertexTableData, 2000,Number(1));
                    _this.getPersonTableDataTimer = setTimeout(_this.fetchPersonVertexTableData, 5000,Number(1));
                  }
                  else {
                    let confirm=true
                    _this.$confirm('由于数据库调整，需重新拉取数据', '提示', {
                      confirmButtonText: '确定',
                      showCancelButton: false, //是否显示取消按钮
                      showClose: false, //是否显示右上角的x
                      // cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      confirm=true
                      if(confirm){
                        _this.pullLoading = true
                        _this.laquCount.totalHandledCount = 0
                        _this.$message('正在拉取数据')
                        let myChart = echarts.init(document.getElementById('mainKg'));
                        myChart.clear()
                        _this.personVertexTable.list=[]
                        _this.pullDataState = '正在拉取'
                        _this.step='拉取数据中,数据拉取期间可关闭该页面'
                        _this.getTotalCountTimer = setInterval(_this.getTotalNodeAndRelationCount, 3000,projectId);
                        _this.deleteNodeStateTimer = setInterval(_this.deleteOrNot, 1000);
                        // this.timer = setTimeout(this.fetchPersonVertexTableData, 2000,Number(1));
                        _this.getPersonTableDataTimer = setTimeout(_this.fetchPersonVertexTableData, 5000,Number(1));
                        postgres2Neo4j(projectId,1).then(response => {
                          if(response.data != undefined){
                            alert(response.data)
                            window.location.reload()
                            return
                          }
                          console.log("response")
                          console.log(response)
                          _this.pullDataState = '拉取完成'
                          window.location.reload()
                          if(_this.idNumFormVisible == false && _this.pullDataState === '拉取完成'){
                            _this.idNumFlag=true
                            _this.getDaFenFlag(_this.projectId)
                          }
                          _this.step=_this.pullDataState
                          // console.log(response)
                          _this.pullLoading = false
                          clearInterval(_this.getTotalCountTimer);
                          this.getTotalCountTimer = setTimeout(this.getTotalNodeAndRelationCount, 5000,projectId);
                        }).catch(function(error) {
                          // console.log(error)
                          _this.pullDataState = '拉取失败'
                          _this.step='数据拉取失败，请尝试重新拉取'
                          _this.$message(_this.pullDataState)
                          clearInterval(_this.getTotalCountTimer);
                        }).finally(function(res){
                          _this.pullLoading = false
                          clearInterval(_this.getTotalCountTimer);
                        })
                      }
                    }).catch(() => {
                      confirm = false
                      _this.$message({
                        type: 'info',
                        message: '已取消导入'
                      });
                    });
                  }
                  // _this.fetchPersonVertexTableData(1) //初始从第1页查询
                }
              )
              // 拉取该专案的数据
              // _this.pullFromPostgreSQL(projectId)
            }
            // _this.fetchPersonVertexTableData(1) //初始从第1页查询
          })
      // _this.getTotalNodeAndRelationCount(projectId)
    },
    // ...mapMutations({
    //   toggleVisible: 'toggleVisible'
    // }),
    //监听dialog的开启事件
    // openDialog(){
    //   // this.toggleVisible(true)
    //   this.dialogNodeVisible = true;
    // },
    sleep(n) {
      return new Promise((resolve) => {
        setTimeout(function () {
          resolve();
        }, n);
      });
    },
    async laquOrNot(){
      const _this = this
      var nowNum = _this.laquCount.totalHandledCount
      console.log("laquornot"+nowNum)
      await _this.sleep(20000)
      var delayNum = _this.laquCount.totalHandledCount
      console.log("laquornot2"+delayNum)
      if(nowNum == delayNum){
        if(nowNum == _this.laquCount.totalMaxCount){
          _this.step = '拉取完成'
          _this.pullDataState='拉取完成'
        }else{
          _this.step = '数据长时间未增长，疑似拉取失败，可点击”正在拉取“按钮重试(若拉取进度已满请无视)'
        }
        _this.pullLoading = false
      } else {

        console.log("清除拉取interval")
        _this.step = '拉取数据中,拉取期间可关闭该页面'
        clearInterval(_this.getLaquState)
        _this.finishStateTimer = setInterval(_this.finishOrNot, 2000)
      }
    },
    finishOrNot(){
      console.log("定时判断拉取完成")
      const _this = this
      if(_this.laquCount.totalHandledCount == _this.laquCount.totalMaxCount){
        console.log("判断拉取完成")
        _this.step = '拉取完成'
        _this.pullLoading = false
        _this.pullDataState='拉取完成'
        clearInterval(_this.finishStateTimer)
      }
    },
    closeDialog(){
      // 关闭dialog时，清除detailType
      this.detailType = ''
      this.$store.dispatch('app/toggleVisible',true)
      this.dialogNodeVisible = false
      this.detailTableLoading = false
      // alert("close")
    },
    openDialog() {
      // alert("open")
      this.$store.dispatch('app/toggleVisible',true)
    },

    highlight(index, myChart) {
      myChart.dispatchAction({
        type: "highlight",
        dataIndex: index
      })
    },

    // 为人物添加关系
    addRelation(){
      const _this = this
      _this.relationFormVisible = false
      console.log(_this.checkedBodies)
      for(var i=0;i<_this.checkedBodies.length;i++){
        _this.relationMap.set(_this.checkedBodies[i],_this.relationForm.relation)
        _this.checkedRelation = _this.relationForm.relation
        var idNum = _this.checkedBodies[i]
        if(_this.checkedRelation === "近亲属"){
          getPersonByIdNumInfo(_this.projectId,idNum).then(response => {
            _this.jinQinShuTableData.push(response.data[0])
          })
        }
        else if(_this.checkedRelation === "重点人物（司机、秘书等）"){
          getPersonByIdNumInfo(_this.projectId,idNum).then(response => {
            _this.zhongDianRenWuTableData.push(response.data[0])
          })
        }
        else if(_this.checkedRelation === "上下级关系"){
          getPersonByIdNumInfo(_this.projectId,idNum).then(response => {
            _this.shangXiaJiTableData.push(response.data[0])
          })
        }
        else if(_this.checkedRelation === "同事"){
          getPersonByIdNumInfo(_this.projectId,idNum).then(response => {
            _this.tongShiTableData.push(response.data[0])
          })
        }
        else if(_this.checkedRelation === "中间人"){
          getPersonByIdNumInfo(_this.projectId,idNum).then(response => {
            _this.zhongJianRenTableData.push(response.data[0])
          })
        }
        else if(_this.checkedRelation === "商业伙伴"){
          getPersonByIdNumInfo(_this.projectId,idNum).then(response => {
            _this.shangYeHuoBanTableData.push(response.data[0])
          })
        }
        else if(_this.checkedRelation === "远亲属"){
          getPersonByIdNumInfo(_this.projectId,idNum).then(response => {
            _this.yuanQinShuTableData.push(response.data[0])
          })
        }
      }
      var relativeidNums = []
      for(let i=0;i<_this.checkedBodies.length;i++){
        relativeidNums.push(_this.checkedBodies[i])
      }
      addAllPersonRelation(_this.idNum,relativeidNums,_this.checkedRelation,_this.projectId).then(response=>{
        if(response.data.length==0){
          this.$message({
            message: '添加失败',
            type: 'error'
          })
        }
      })
      console.log("关系map：",_this.relationMap)
      _this.checkedBodies = []
      _this.batchAddRelation()
      _this.relationForm.relation = ""
      this.$message({
        message: '添加成功',
        type: 'success'
      })
    },

    // 将目标对象本人添加到表格中
    addMainBodyToTable(){
      const _this = this
      _this.batchaddrelationFormVisible = true
      if(_this.mainBodyTableData.length === 0){
        getPersonByIdNumInfo(_this.projectId,this.idNum).then(response => {
          _this.mainBodyTableData.push(response.data[0])
        })
      }
      // _this.mainBodyTableData.push(_this.allData[0])
      _this.batchAddRelation()
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    deleteRelation1(){
      this.deleteRelation("近亲属")
    },
    deleteRelation2(){
      this.deleteRelation("重点人物（司机、秘书等）")
    },
    deleteRelation3(){
      this.deleteRelation("上下级关系")
    },
    deleteRelation4(){
      this.deleteRelation("同事")
    },
    deleteRelation5(){
      this.deleteRelation("中间人")
    },
    deleteRelation6(){
      this.deleteRelation("商业伙伴")
    },
    deleteRelation7(){
      this.deleteRelation("远亲属")
    },
    deleteRelation(del_relation){
      console.log("选择的人：",this.multipleSelection)
      console.log(this.checkedRelation)
      if(del_relation === "近亲属"){
        for (var i = 0; i < this.multipleSelection.length; i++) {
          let person = this.jinQinShuTableData.findIndex(item => {
            if (item.idNum === this.multipleSelection[i].idNum) {
              return true
            }
          })
          this.jinQinShuTableData.splice(person, 1)
          this.relationMap.set(this.multipleSelection[i].idNum, '')
        }
      }else if(del_relation === "重点人物（司机、秘书等）"){
        for(var i=0;i<this.multipleSelection.length;i++){
          let person = this.zhongDianRenWuTableData.findIndex(item => {
            if (item.idNum === this.multipleSelection[i].idNum) {
              return true
            }
          })
          this.relationMap.set(this.multipleSelection[i].idNum,'')
          this.zhongDianRenWuTableData.splice(person,1)
        }

      }else if(del_relation === "上下级关系"){
        for(var i=0;i<this.multipleSelection.length;i++){
          let person = this.shangXiaJiTableData.findIndex(item => {
            if (item.idNum === this.multipleSelection[i].idNum) {
              return true
            }
          })
          this.relationMap.set(this.multipleSelection[i].idNum,'')
          this.shangXiaJiTableData.splice(person,1)
        }
      }else if(del_relation === "同事"){
        for(var i=0;i<this.multipleSelection.length;i++){
          let person = this.tongShiTableData.findIndex(item => {
            if (item.idNum === this.multipleSelection[i].idNum) {
              return true
            }
          })
          this.relationMap.set(this.multipleSelection[i].idNum,'')
          this.tongShiTableData.splice(person,1)
        }
      }else if(del_relation === "中间人"){
        for(var i=0;i<this.multipleSelection.length;i++){
          let person = this.zhongJianRenTableData.findIndex(item => {
            if (item.idNum === this.multipleSelection[i].idNum) {
              return true
            }
          })
          this.relationMap.set(this.multipleSelection[i].idNum,'')
          this.zhongJianRenTableData.splice(person,1)
        }
      }else if(del_relation === "商业伙伴"){
        for(var i=0;i<this.multipleSelection.length;i++){
          let person = this.shangYeHuoBanTableData.findIndex(item => {
            if (item.idNum === this.multipleSelection[i].idNum) {
              return true
            }
          })
          this.relationMap.set(this.multipleSelection[i].idNum,'')
          this.shangYeHuoBanTableData.splice(person,1)
        }
      }else if(del_relation === "远亲属"){
        for(var i=0;i<this.multipleSelection.length;i++){
          let person = this.yuanQinShuTableData.findIndex(item => {
            if (item.idNum === this.multipleSelection[i].idNum) {
              return true
            }
          })
          this.relationMap.set(this.multipleSelection[i].idNum,'')
          this.yuanQinShuTableData.splice(person,1)
        }
      }
      let allIdNum=[]
      for(var i=0;i<this.addPersonList.length;i++){
        allIdNum.push(this.addPersonList[i].person.idNum)
      }
      console.log(allIdNum)
      let addPersonIdNums=[]
      let addRelationIdNums=[]
      for(var i=0;i<this.multipleSelection.length;i++){
        if (allIdNum.indexOf(this.multipleSelection[i].idNum) == -1) {
          //解释：如果新数组里没有就放进去，有就放不进了
          addRelationIdNums.push(this.multipleSelection[i].idNum);
        }
        else{
          addPersonIdNums.push(this.multipleSelection[i].idNum);
        }
      }
      console.log(addRelationIdNums)
      console.log(addPersonIdNums)
      deleteAddPersonRelation(this.idNum,addPersonIdNums,del_relation,this.projectId).then(response=>{
      })
      deletePersonRelation(this.idNum,addRelationIdNums,del_relation,this.projectId).then(response=>{
      })
      this.batchAddRelation()
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },

    // 提示信息：先选择对象，再进行批量标注
    noticeMessage(){
      const _this = this
      if(_this.checkedBodies.length === 0){
        _this.messageDialogVisible = true
      }else {
        _this.relationFormVisible = true
      }
    },

    //批量标注关系
    batchAddRelation(){
      const _this = this
      _this.batchaddrelationFormVisible = true
      _this.noRelationBody = []
      for(var i=0;i<_this.allData.length;i++){//显示没有标注关系的人
        if(_this.relationMap.get(_this.allData[i].idNum) === ""){
          _this.noRelationBody.push(_this.allData[i])
        }
      }
      console.log("没有标注关系的人：",_this.noRelationBody)
    },

    //追加关系人
    addRelationBody(){
      const _this = this
      var relationBodyIdNum = _this.addRelationIdNumForm.idNum
      var relation = _this.addRelationIdNumForm.relation
      var repeatFlag = false
      getPersonByIdNumInfo(this.projectId,relationBodyIdNum).then(response => {
        var addBody = response.data
        if(response.data.length === 0){ //数据库中没有这个人
          this.$message.error('数据库中没有这个人，请重新输入身份证号');
          _this.addRelationIdNumForm.idNum = ''
          _this.addRelationIdNumForm.name = ''
          _this.addRelationIdNumForm.relation = ''
        }else{//数据库中有这个人
          for(var i=0;i<_this.allData.length;i++) {
            var idNum_i = _this.allData[i].idNum
            if(idNum_i === relationBodyIdNum){
              repeatFlag = true
              //this.$message.error('该人物已存在于图谱中，请输入其他身份证号');
              break
            }
          }
          if(repeatFlag === false){
            var addRelation=''
            if(relation===''){
              addRelation='未知'
            }else{
              addRelation=relation+'_add'
            }
            addPersonRelation(_this.idNum,relationBodyIdNum,addRelation,_this.projectId).then(response =>{
              console.log("11111"+response.data)
              _this.allData.push(addBody[0])
              console.log(_this.allData)
              let myChart = echarts.init(document.getElementById('mainKg'));
              // 图表随着浏览器缩放，改变大小
              window.addEventListener("resize", () => {
                myChart.resize();
              });
              _this.option = mainBodyAndCoPersonListHandler(addBody, _this.option)
              myChart.setOption(_this.option)
              _this.relationMap.set(relationBodyIdNum,relation)
              console.log("关系"+_this.relationMap)

            })
            console.log("添加人：",response.data[0])
            _this.addPersonList.push({
              "person":response.data[0],
              "relation":relation
            })
            this.addRelationDialogVisible = false
            this.$message({
              message: '添加成功',
              type: 'success'
            })

            _this.addRelationTable(response.data[0],relation)
            // if(relation === "近亲属"){
            //   console.log("11111111111111111")
            //   _this.jinQinShuTableData.push(response.data[0])
            //
            // }
            // else if(relation === "重点人物（司机、秘书等）"){
            //   _this.zhongDianRenWuTableData.push(response.data[0])
            // }
            // else if(relation === "上下级关系"){
            //   _this.shangXiaJiTableData.push(response.data[0])
            // }
            // else if(relation === "同事"){
            //   _this.tongShiTableData.push(response.data[0])
            // }
            // else if(relation === "中间人"){
            //   _this.zhongJianRenTableData.push(response.data[0])
            // }
            // else if(relation === "商业伙伴"){
            //   _this.shangYeHuoBanTableData.push(response.data[0])
            // }
            // else if(relation === "远亲属"){
            //   _this.yuanQinShuTableData.push(response.data[0])
            // }
          }else{
            _this.$message.warning("该人物已存在图谱中")
          }
          _this.addRelationIdNumForm.idNum = ''
          _this.addRelationIdNumForm.name=''
          _this.addRelationIdNumForm.relation = ''
        }
      })

    },

    // 如果专案没有被打过分，接受用户输入的身份证号，查找三跳以内的关系人
    addMainBody(projectId,idNum){
      const _this = this
      _this.idNum = _this.idNumForm.idNum
      if(_this.idNum==""){
        this.$alert("请输入姓名和身份证号");
      }
      else{
        getPersonByIdNumInfo(this.projectId,this.idNum).then(response => {
          if(response.data.length === 0){
            //数据库中没有这个人
            this.$message.error('数据库中没有这个人，请重新输入身份证号');
            _this.idNumForm.idNum = ''
            _this.idNumForm.name = ''
          }
          else{
            console.log("指定目标人物成功")
            this.idNumFormVisible = false
            this.$message.success('指定目标人物成功');
            _this.relationMap.set(_this.idNum,"目标对象本人")
            //数据库中有这个人
            this.loadMainBodyAndCoPersonList()
          }
        })
      }
    },
    // 获取专案数据是否被打过分，如果打过分，则显示主体人和其三跳以内的关系人
    getDaFenFlag(projectId) {
      const _this = this
      getDaFenFlag(this.projectId).then(response => {
        console.log("打分")
        console.log(response.data)
        if(response.data!=null){
          // 已被打过分
          console.log(response.data)
          _this.idNum = response.data
          //_this.idNumFlag = false
          _this.relationMap.set(_this.idNum,"目标对象本人")
          this.loadMainBodyAndCoPersonList()
        }else {
          console.log(this.pullDataState)
          // if(_this.pullDataState == '拉取完成') {
          //
          // }
          _this.idNumFormVisible = true
        }
      })
    },
    // 获取专案数据是否被拉取过
    getSmFlag(projectId,sm,callback) {
      const _this = this
      getSmFlag(projectId,sm).then(response => {
        // alert(typeof response.data)
        // callback(response.data)
        if(response.data===true){
          // 已被拉取
          if(sm=='1'){
            this.pullDataState = '拉取完成'
            // if(_this.idNumFormVisible == false && _this.pullDataState === '拉取完成'){
            //   _this.idNumFlag=true
            //   _this.getDaFenFlag(_this.projectId)
            // }

            this.pullLoading = false

            clearInterval(this.getTotalCountTimer);
          }
          callback(true)
        }else {
          callback(false)
        }
      })
    },
    getTotalNodeAndRelationCount(projectId){
      const _this = this
      getTotalNodeAndRelationCount(projectId).then(response => {
        console.log(response)
        for(let key in this.laquCount){
          _this.laquCount[key] = response.data[key]
        }
      }).catch(function(error) {
        console.log(error)
        clearInterval(_this.getTotalCountTimer);
      })
    },
    //加载可疑信息在左侧栏
    loadKeYiInfoList() {
      const _this = this
      _this.featureExtraFlag = false
      _this.batchAddRelationFlag = false
      _this.step = "正在加载可疑人员信息及可疑分数..."
      var strList = this.featureMap
      var relationList = this.relationMap
      var projectId = this.projectId
      let f_list = []
      // for (let item of strList.keys()) {
      //   f_list.push(
      //     {
      //       "idNum" : item,
      //       // "feature":strList.get(item)
      //       "relation":relationList.get(item)
      //     }
      //   )
      // }
      for (let item of relationList.keys()) {
        var relation = relationList.get(item)
        if (relation === "") {
          relation = "未知"
        }
        f_list.push({
          "idNum": item,
          "relation": relation
        })
      }

      const url = window.global_config.BASE_URL + 'node/getModelScore';
      const data = {
        list: f_list,
        projectId: projectId
      }
      //第一种
      // var xhr=new XMLHttpRequest();
      // xhr.open("POST",url,true);
      // xhr.setRequestHeader("Content-Type","application/json");
      // xhr.send(JSON.stringify(data));
      // xhr.onreadystatechange=function(){
      //   if(xhr.readyState==4&&xhr.status==200){
      //     console.log(xhr.readyState)
      //     var response=JSON.parse(xhr.responseText)
      //     if (response.code == 500) {
      //       alert("可疑分数列表数据加载失败!")
      //     } else {
      //       _this.anaysisFlag = true;
      //       // _this.addRelationFlag = true;
      //       //_this.idNumFlag = true;
      //       _this.personVertexTable.list = response.data
      //       for (let i = 0; i < _this.personVertexTable.list.length; i++) {
      //         _this.personVertexTable.list[i].modifyScore = _this.personVertexTable.list[i].score
      //       }
      //       _this.step = '可疑分数加载完成...'
      //     }
      //   }
      // }


      //第二种
      // getModelScore(f_list, projectId).then(response => {
      //   _this.loading = false
      //   if (response.code == 500) {
      //     alert("可疑分数列表数据加载失败!")
      //   } else {
      //     _this.anaysisFlag = true;
      //     // _this.addRelationFlag = true;
      //     //_this.idNumFlag = true;
      //     _this.personVertexTable.list = response.data
      //     for (let i = 0; i < _this.personVertexTable.list.length; i++) {
      //       _this.personVertexTable.list[i].modifyScore = _this.personVertexTable.list[i].score
      //     }
      //     _this.step = '可疑分数加载完成...'
      //   }
      // }).catch(function(error) {
      //   alert("可疑分数列表数据加载失败")
      // })


      //第三种
      // fetch(url,{
      //   method:'POST',
      //   headers:{
      //     'Content-Type':'application/json'
      //   },
      //   body:JSON.stringify(data),
      //   mode:'cors',
      // }).then(response=>response.json()).then(res=>{
      //       _this.loading = false
      //       if(res.code==500){
      //         console.log("500")
      //         alert("可疑分数列表数据加载失败!")
      //       }
      //       else{
      //         _this.anaysisFlag = true;
      //         // _this.addRelationFlag = true;
      //         //_this.idNumFlag = true;
      //         _this.personVertexTable.list = res.data
      //         for(let i=0;i<_this.personVertexTable.list.length;i++){
      //           _this.personVertexTable.list[i].modifyScore = _this.personVertexTable.list[i].score
      //         }
      //         _this.step = '可疑分数加载完成...'
      //       }
      // }).catch(error=>{
      //   console.log("error")
      //   alert("可疑分数列表数据加载失败")
      // })


      //原本方法
      $.ajax({
        // url: 'http://172.16.44.129:6999/kg/node/getModelScore',
        // url: 'http://127.0.0.1:8080/node/getModelScore',
        url: window.global_config.BASE_URL+'node/getModelScore?scoreDTO='+encodeURI(JSON.stringify(data)),
        // data: JSON.stringify(data),
        type: "get",
        // dataType: "json",
        // contentType:"application/json",
        async: true,
        success: function (response) {
          _this.loading = false
          if(response.code==500){
            alert("可疑分数列表数据加载失败!")
          }
          else{
            _this.anaysisFlag = true;
            // _this.addRelationFlag = true;
            //_this.idNumFlag = true;
            _this.personVertexTable.list = response.data
            for(let i=0;i<_this.personVertexTable.list.length;i++){
              _this.personVertexTable.list[i].modifyScore = _this.personVertexTable.list[i].score
            }
            _this.step = '可疑分数加载完成...'
          }
        },fail: function () {
          alert("可疑分数列表数据加载失败")
        }
      });
      _this.keYiList = []
      _this.getLabeled()
    },

    // // 分页获取左侧主体人列表
    // fetchPersonVertexTableData(currentPage) {
    //   this.loading = true
    //   console.log('table取数据')
    //   const _this = this
    //   pageListPerson(currentPage,this.personVertexTable.pageSize,this.projectId).then(response => {
    //     console.log(this.projectId)
    //     _this.loading = false
    //     _this.personVertexTable.list = response.data.content
    //     _this.total = parseInt(response.data.totalElements)
    //     console.log(_this.total)
    //     _this.step = '主体人加载完成...'
    //   })
    // },

    // 获取所有的专案id
    getAllDataBaseId() {
      this.loading = true
      console.log('table取数据')
      const _this = this
      getAllDataBaseId().then(response => {
        let projectIdList = response.data
        let index = 0;
        for(index;index<projectIdList.length;index++){
          let option = {
            value : projectIdList[index],
            label : projectIdList[index],
          }
          _this.allDataBaseId.push(option)
        }

      })
    },
    clickToPullFromPostgreSQL(projectId){
      let isPulled = false
      const _this = this

      // _this.getSmFlag(projectId,'1',function(result) {
      //   isPulled = result
      //   // 判断该专案的数据是否被拉取过
      //   if(isPulled){
      //  已被拉取
      let confirm = true

      _this.$confirm('重新拉取数据会导致追加人物的所有数据清空，是否重新导入?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        confirm=true
        if(confirm){
          _this.pullLoading = true
          _this.laquCount.totalHandledCount = 0
          _this.$message('正在拉取数据')
          let myChart = echarts.init(document.getElementById('mainKg'));
          myChart.clear()
          _this.personVertexTable.list=[]
          _this.pullDataState = '正在拉取'
          _this.step='拉取数据中,数据拉取期间可关闭该页面'
          _this.getTotalCountTimer = setInterval(_this.getTotalNodeAndRelationCount, 3000,projectId);
          _this.deleteNodeStateTimer = setInterval(_this.deleteOrNot, 1000);
          // this.timer = setTimeout(this.fetchPersonVertexTableData, 2000,Number(1));
          _this.getPersonTableDataTimer = setTimeout(_this.fetchPersonVertexTableData, 5000,Number(1));
          postgres2Neo4j(projectId,1).then(response => {
            if(response.data != undefined){
              alert(response.data)
              window.location.reload()
              return
            }
            console.log("response")
            console.log(response)
            _this.pullDataState = '拉取完成'
            window.location.reload()
            if(_this.idNumFormVisible == false && _this.pullDataState === '拉取完成'){
              _this.idNumFlag=true
              _this.getDaFenFlag(_this.projectId)
            }
            _this.step=_this.pullDataState
            // console.log(response)
            _this.pullLoading = false
            clearInterval(_this.getTotalCountTimer);
            this.getTotalCountTimer = setTimeout(this.getTotalNodeAndRelationCount, 5000,projectId);
          }).catch(function(error) {
            // console.log(error)
            _this.pullDataState = '拉取失败'
            _this.step='数据拉取失败，请尝试重新拉取'
            _this.$message(_this.pullDataState)
            clearInterval(_this.getTotalCountTimer);
          }).finally(function(res){
            _this.pullLoading = false
            clearInterval(_this.getTotalCountTimer);
          })
        }
      }).catch(() => {
        confirm = false
        _this.$message({
          type: 'info',
          message: '已取消导入'
        });
      });
      // alert(confirm)


      //     }else {
      //   _this.$message('正在拉取数据')
      //   // 拉取该专案的数据
      //   _this.pullFromPostgreSQL(projectId)
      // }





      // })


    },
    deleteOrNot(){

      const _this = this
      console.log("deleteornot：hand"+ _this.laquCount.totalHandledCount+"deleteornot：max"+_this.laquCount.totalMaxCount)
      if(_this.laquCount.totalHandledCount == 0){
        _this.step = "正在从图数据库中删除节点和关系(时间可能比较长)，请耐心等待..."
      }else{
        console.log("清除delete_interval")
        _this.step = "拉取数据中,数据拉取期间可关闭该页面"
        clearInterval(_this.deleteNodeStateTimer)
      }
    },
    pullFromPostgreSQL(projectId){
      this.pullLoading = true
      const _this = this
      _this.$message('正在拉取数据')
      _this.pullDataState = '正在拉取'
      _this.step='拉取数据中,数据拉取期间可关闭该页面'
      this.getTotalCountTimer = setInterval(this.getTotalNodeAndRelationCount, 3000,projectId);
      // this.timer = setTimeout(this.fetchPersonVertexTableData, 2000,Number(1));
      this.getPersonTableDataTimer = setTimeout(this.fetchPersonVertexTableData, 5000,Number(1));
      postgres2Neo4j(projectId,0).then(response => {
        if(response.data != undefined){
          alert(response.data)
          _this.step = "系统目前正在导入的专案数量太多，请避开高峰期后再重新进入页面！"
          return
        }
        console.log("response")
        console.log(response)
        _this.pullDataState = '拉取完成'
        window.location.reload()
        if(_this.idNumFormVisible == false && _this.pullDataState === '拉取完成'){
          _this.idNumFlag=true
          _this.getDaFenFlag(projectId)
        }

        _this.step=_this.pullDataState
        // console.log(response)
        _this.pullLoading = false
        clearInterval(_this.getTotalCountTimer);
        this.getTotalCountTimer = setTimeout(this.getTotalNodeAndRelationCount, 5000,projectId);
      }).catch(function(error) {
        // console.log(error)
        _this.pullDataState = '拉取失败'
        _this.step='数据拉取失败，请尝试重新拉取'
        _this.$message(_this.pullDataState)
        clearInterval(_this.getTotalCountTimer);
      }).finally(function(res){
        _this.pullLoading = false
        clearInterval(_this.getTotalCountTimer);
      })
    },
    getAnaysistList(list) {
      const _this = this
      _this.anaysisFlag=true
      const res= new Map()
      for(var i=0;i<_this.keYiList.length;i++){
        if(res.has(_this.keYiList[i].idNum)){
          continue
        }else{
          res.set(_this.keYiList[i].idNum,1)
          _this.personAnaysisList.push(_this.keYiList[i])
        }
      }
    },
    // 获取所有人的可疑节点和边
    loadAllRelations(row, event, column) {
      if(this.idNum == ''){
        this.$message.warning('请先指定目标人物（屏幕右上角）后再进行可疑分析！')
        return;
      }
      console.log(row,  event,  column)
      let myChart = echarts.init(document.getElementById('mainKg'));
      myChart.clear()
      // 图表随着浏览器缩放，改变大小
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      const _this = this
      _this.loading = false
      _this.addRelationFlag = false
      _this.batchAddRelationFlag = false
      _this.featureExtraFlag = false

      // if(_this.personAnaysisList.length==0){
      //   alert("未提取到有效特征，请考虑降低阈值或扩大搜索范围！")
      //   _this.featureExtraFlag = true
      //   _this.anaysisFlag = false
      //   _this.thresholdFlag = true
      //   return
      // }
      _this.step = '正在分析数据...'
      // _this.option.series[0].data = []
      // _this.option.series[0].links = []
      NProgress.set(0)
      _this.loading = false
      //_this.allData = _this.personAnaysisList
      //_this.totalTaskCount = 7 *_this.allData.length+1
      _this.totalTaskCount = 3 + 3*_this.allData.length
      _this.taskCount = 0
      var idNum = _this.idNum
      var reletantidNums = []
      for(let i=0;i<_this.allData.length;i++){
        if(this.allData[i].idNum===this.idNum)
        {
          continue
        }
        else{
          reletantidNums.push(_this.allData[i].idNum)
        }
      }
      _this.option.series[0].force.edgeLength = window.global_config.EDGELENGTH
      _this.option.series[0].force.gravity = window.global_config.GRAVITY
      getTongXinCount(idNum,reletantidNums,this.projectId).then(response => {
        _this.list = response.data
        console.log("可疑分析通信次数："+_this.list)
        if(_this.list.length!=0){
          _this.option = personTongXinCountHandler(_this.list, _this.option, _this.keYiList, _this.featureMap, _this.numFeature)
          myChart.setOption(_this.option)
        }
        _this.loading = false
        _this.taskCount++
        NProgress.set(_this.taskCount/_this.totalTaskCount)
        if(_this.taskCount == _this.totalTaskCount){
          _this.loadKeYiInfoList()
          _this.step="分析完成，请耐心等待加载可疑分数！"
          _this.trainFlag = true
        }
      });
      getJiaoYiCount(idNum,reletantidNums,this.projectId).then(response => {
        _this.list = response.data
        console.log("可疑分析交易次数："+_this.list)
        if(_this.list.length!=0){
          _this.option = personJiaoYiCountHandler(_this.list, _this.option, _this.keYiList, _this.featureMap, _this.numFeature)
          myChart.setOption(_this.option)
        }
        _this.loading = false
        _this.taskCount++
        NProgress.set(_this.taskCount/_this.totalTaskCount)
        if(_this.taskCount == _this.totalTaskCount){
          _this.loadKeYiInfoList()
          _this.step="分析完成，请耐心等待加载可疑分数！"
          _this.trainFlag = true
        }
      });
      getTongXing(idNum,reletantidNums,this.projectId).then(response => {
        _this.list = response.data
        console.log("可疑分析交易次数："+_this.list)
        if(_this.list.length!=0){
          _this.option = personTongXingRelationListHandler(_this.list, _this.option, _this.keYiList, _this.featureMap, _this.numFeature)
          myChart.setOption(_this.option)
        }
        _this.loading = false
        _this.taskCount++
        NProgress.set(_this.taskCount/_this.totalTaskCount)
        if(_this.taskCount == _this.totalTaskCount){
          _this.loadKeYiInfoList()
          _this.step="分析完成，请耐心等待加载可疑分数！"
          _this.trainFlag = true
        }
      });
      for(var i=0;i<_this.allData.length;i++){
        var idNum_i = _this.allData[i].idNum
        getPersonHouseList(idNum_i,this.projectId).then(response => {
          _this.list = response.data
          console.log("房子："+this.list)
          if(_this.list!=null){
            if(_this.list.personRelation!=null){
              _this.option = personPartnerRelationtListHandler(_this.list, _this.option, _this.relationMap)
              myChart.setOption(_this.option)
            }
            if(_this.list.personFangChanRelation.length!=0){
              _this.option = personHousesRelationtListHandler(_this.list, _this.option, _this.keYiList,_this.featureMap,_this.numFeature)
              myChart.setOption(_this.option)
            }
            _this.loading = false
          }
          // _this.step = '机动车信息加载完成...'
          _this.taskCount++
          NProgress.set(_this.taskCount/_this.totalTaskCount)
          if(_this.taskCount == _this.totalTaskCount){
            _this.loadKeYiInfoList()
            _this.step="分析完成，请耐心等待加载可疑分数！"
            _this.trainFlag = true
          }
        });
        getPersonJiDongCheList(idNum_i,this.projectId).then(response=>{
          _this.list = response.data
          console.log("机动车："+this.list)
          if(_this.list!=null){
            if(_this.list.personRelation!=null){
              _this.option = personFamilyRelationtListHandler(_this.list, _this.option, _this.relationMap)
              myChart.setOption(_this.option)
            }
            if(_this.list.personJiDongCheRelations.length!=0){
              _this.option = personCarsRelationtListHandler(_this.list, _this.option, _this.keYiList,_this.featureMap,_this.numFeature)
              myChart.setOption(_this.option)
            }
            _this.loading = false
          }
          _this.taskCount++
          NProgress.set(_this.taskCount/_this.totalTaskCount)
          if(_this.taskCount == _this.totalTaskCount){
            _this.loadKeYiInfoList()
            _this.step="分析完成，请耐心等待加载可疑分数！"
            _this.trainFlag = true
          }
        });
        getPersonJiGouList(idNum_i,this.projectId).then(response=>{
          _this.list = response.data
          console.log("房子："+this.list)
          if(_this.list!=null){
            if(_this.list.personRelation!=null){
              _this.option = personFamilyRelationtListHandler(_this.list, _this.option, _this.relationMap)
              myChart.setOption(_this.option)
            }
            if(_this.list.personXiangGuanRenYuanRelations.length!=0){
              _this.option = personCompanyRelationtListHandler(_this.list, _this.option, _this.keYiList,_this.featureMap,_this.numFeature)
              myChart.setOption(_this.option)
            }
            _this.loading = false
          }
          _this.taskCount++
          NProgress.set(_this.taskCount/_this.totalTaskCount)
          if(_this.taskCount == _this.totalTaskCount){
            _this.loadKeYiInfoList()
            _this.step="分析完成，请耐心等待加载可疑分数！"
            _this.trainFlag = true
          }
        });
      }
      //  图表添加点击事件
      myChart.on('click',function(params) {
        // let _this = this
        console.log("click")
        console.log(params)
        console.log(_this.option)

        // let self = this;

        // _this.dialogNodeVisible = true
        // _this.$store.commit('toggleVisible',{
        //   dialogNodeVisible:true
        // })
        // _this.openDialog()
        // _this.$store.dispatch('app/toggleVisible',true)
        // _this.$refs.showDialog.$el.click()
        // document.getElementById('showDialog').click();
        // self.nodeIdx = params.dataIndex;
        // var center = _this.getCenterPos()
        if(params.dataType === 'node') {  // 点击节点
          // _this.$message('请点击[边]以查看详情')
          // console.log(params.data.x)
          // console.log(params.data.y)
          // // 点击节点，改变节点名称，节点名称不能相同
          // alert("点击了节点"+params.data.id)
          console.log("点击了节点"+params.data.id)
          // 若点击的是主体人类型
          if(params.data.showValueList[0].indexOf('节点类型：人员')!=-1){
            _this.detailType = '标注'
            // // _this.dialogNodeVisible = true
            // 判断list是否为空，若为空提示用户等待
            console.log("person列表:"+_this.personVertexTable.list)
            if(_this.personVertexTable.list == undefined ||_this.personVertexTable.list == null || _this.personVertexTable.list.length <= 0){
              _this.$message('请等待当前请求执行完毕后再操作')
            }
            _this.modifyList = []
            let found = _this.personVertexTable.list.find(element => element.idNum == params.data.idNum);
            console.log("found:"+found)
            _this.modifyForm.idNum = found.idNum
            _this.modifyForm.name = found.name
            _this.modifyForm.feature = found.feature
            _this.modifyForm.feature_eng = found.feature_eng
            _this.modifyForm.score = found.score
            _this.modifyForm.modifyScore = found.modifyScore
            _this.modifyForm.relation=found.relation
            _this.showFeatureText = found.feature
            var splitList = _this.modifyForm.feature.split("|")
            var tableList = []
            for(var i = 0; i < splitList.length-1; i++){
              tableList.push({"feature":splitList[i],"id":i+1})
            }

            _this.featureTableData = tableList
            // $('#featuretext').html = "<p>testSpantest</p>"
            // $("#featuretext").html(found.feature)
            // $("#featuretext").html("<p>testSpantest</p>");
            // _this.modifyList.push(found)
            console.log(found)
            _this.dialogNodeVisible = true
          }

          // const foundIndex = _this.option.series[0].data.findIndex(element => element.id == params.data.id);
          // // // alert(foundIndex)
          // found.x=10
          // found.y=10
          // let newList = []
          // newList.push(found)
          // let myChart2 = echarts.init(document.getElementById('mainKg'));
          // _this.option.series[0].data[foundIndex] = found
          // myChart2.setOption(newList)
          // console.log("重设")
          // // console.log(found)
          // // alert(this.dialogNodeVisible)
          // // series[0].data[self.nodeIdx].name = parseInt(Math.random()*200);
          // // _this.highlight(params.dataIndex, myChart)

        }
        else if (params.dataType === 'edge') {   // 点击连接线
          // document.getElementById('showDialog').click();
          // alert("点击了关系 | 关系id="+params.data.id+' | 父节点id='+params.data.source+' | 子节点id='+params.data.target)
          //_this.dialogNodeVisible = true
          const parent = _this.option.series[0].data.find(element => element.id == params.data.source);
          console.log(parent)
          console.log(parent.idNum)
          let parentIdNum = parent.idNum
          const child = _this.option.series[0].data.find(element => element.id == params.data.target);
          console.log("child")
          console.log(child)

          // 若点击的是“凌晨交易”类型的边
          //indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。如果要检索的字符串值没有出现，则该方法返回 -1。
          if(params.data.name.indexOf('交易次数')!=-1){
            _this.dialogNodeVisible = true
            console.log("交易对象"+child.idNum)
            console.log("交易对象"+child.showValueList[3].split('：')[1])
            let duiFangKaHao = child.idNum
            let relationDes = params.data.des
            console.log(relationDes)
            _this.getJiaoYiDetailList(parentIdNum,duiFangKaHao,_this.projectId)
          }
          if(params.data.name.indexOf('通讯次数')!=-1){
            _this.dialogNodeVisible = true
            console.log("交易对象"+child.idNum)
            let duiFangIdNum = child.idNum
            let relationDes = params.data.des
            console.log(relationDes)
            _this.getTongXunDetailList(parentIdNum,duiFangIdNum,_this.projectId)
          }
          // 若点击的是“机动车信息”类型的边
          if(params.data.name.indexOf('机动车')!=-1){
            _this.dialogNodeVisible = true
            // let numberPlateNum = child.showValueList[4].split('：')[1]
            // console.log(numberPlateNum)
            _this.getJiDongCheDetailList(parentIdNum,_this.projectId)
          }
          // 若点击的是“房产信息”类型的边
          if(params.data.name.indexOf('拥有房产')!=-1){
            _this.dialogNodeVisible = true
            // let houseLocation = child.showValueList[6].split('：')[1]
            // console.log(houseLocation)
            _this.getFangChanDetailList(parentIdNum,_this.projectId)
          }
          if(params.data.name.indexOf('机构')!=-1){
            _this.dialogNodeVisible = true
            // let houseLocation = child.showValueList[6].split('：')[1]
            // console.log(houseLocation)
            _this.getJiGouDetailList(parentIdNum,_this.projectId)
          }
          // if(params.data.name.indexOf('凌晨交易')!=-1){
          //   console.log(child.showValueList[2].split('：')[1])
          //   let duiFangKaHao = child.showValueList[2].split('：')[1]
          //   let relationDes = params.data.des
          //   console.log(relationDes)
          //   _this.getLingChenJiaoYiDetailList(parentIdNum,duiFangKaHao,_this.projectId,relationDes)
          // }
          // // 若点击的是“可疑交易”类型的边
          // if(params.data.name.indexOf('可疑交易')!=-1) {
          //   // TODO
          //   let duiFangKaHao = child.showValueList[2].split('：')[1]
          //   let relationDes = params.data.des
          //   console.log(relationDes)
          //   _this.getPinFanZhengShuJiaoYiDetailLit(parentIdNum, duiFangKaHao, _this.projectId, relationDes)
          // }
          // // 若点击的是“特殊金额交易”类型的边
          // if(params.data.name.indexOf('特殊金额交易')!=-1){
          //   console.log(child.showValueList[2].split('：')[1])
          //   let duiFangKaHao = child.showValueList[2].split('：')[1]
          //   let relationDes = params.data.des
          //   console.log(relationDes)
          //   _this.getJiLiShuJiaoYiDetailList(parentIdNum,duiFangKaHao,_this.projectId,relationDes)
          // }
          // 若点击的是“同行”类型的边
          if(params.data.name.indexOf('同行')!=-1){
            _this.dialogNodeVisible=true
            // console.log(child.showValueList[2].split('：')[1])
            let childIdNum = child.idNum
            _this.getTongXingDetailList(parentIdNum,childIdNum,parent.name,child.name,_this.projectId)
          }

          // 若点击的是“机构相关人员”类型的边
          // if(params.data.name.indexOf('股东')!=-1 || params.data.name.indexOf('负责人')!=-1 ||
          //   params.data.name.indexOf('股东')!=-1 || params.data.name.indexOf('监事')!=-1 ||
          //   params.data.name.indexOf('其他人员')!=-1 ||
          //   params.data.name.indexOf('机构相关人员')!=-1 ||
          //   params.data.name.indexOf('执行董事兼总经理')!=-1){
          //   // console.log(child.showValueList[2].split('：')[1])
          //   let childIdNum = child.idNum
          //   _this.getXiangGuanRenYuanDetailList(parentIdNum,child.id,_this.projectId)
          // }
          //
          // // 若点击的是“通信”类型的边
          // if(params.data.name.indexOf('通信')!=-1){
          //   // console.log(child.showValueList[2].split('：')[1])
          //   let parentPhoneNum = params.data.des.split("</br>")[1].split('：')[1].split('->')[1]
          //   let childPhoneNum = params.data.des.split("</br>")[1].split('：')[1].split('->')[0]
          //   let relationDes = params.data.des
          //   // 这里的parent和child与response中返回的刚好相反
          //   _this.getTongXinDetailList(parentPhoneNum,childPhoneNum,relationDes,_this.projectId)
          // }

          _this.detailTableLoading = true
        }
      })

      //左键点击事件

      //添加右键点击事件
      //去除默认的鼠标事件
      document.oncontextmenu = function () { return false; };
      // myChart.on('contextmenu', function (params) {
      //   document.getElementById('showDialog').click();
      //   console.log("右键事件");
      //   console.log(params);
      //
      // });
    },

    // 点击获取当前主体人的疑点节点和关系
    clickPersonVertexTableRow(row, event, column) {
      var myChart = echarts.init(document.getElementById('mainKg'));
      // //  图表添加左键点击事件
      // myChart.on('click',function(params) {
      //   console.log("click")
      //   console.log(params)
      //   let self = this;
      //   let _this = this
      //   _this.dialogNodeVisible = true
      //   self.nodeIdx = params.dataIndex;
      //   if(params.dataType === 'node') {  // 点击节点
      //     // 点击节点，改变节点名称，节点名称不能相同
      //     // alert("点击了节点"+params.data.id)
      //     _this.dialogNodeVisible = true
      //     // alert(this.dialogNodeVisible)
      //     // series[0].data[self.nodeIdx].name = parseInt(Math.random()*200);
      //   }else if (params.dataType === 'edge') {   // 点击连接线
      //     alert("点击了关系 | 关系id="+params.data.id+' | 父节点id='+params.data.source+' | 子节点id='+params.data.target)
      //     _this.dialogNodeVisible = true
      //     // if (series[0].links[self.nodeIdx].lineStyle.opacity === 0.3)
      //     //   series[0].links[self.nodeIdx].lineStyle.opacity = 1;
      //     // else {
      //     //   series[0].links[self.nodeIdx].lineStyle.opacity = 0.3;
      //     // }
      //   }
      //   // self.chart.option = {
      //   //   series: series
      //   // };
      //   // self.chart.target.setOption(self.chart.option);
      // })


      console.log(row, event, column)
      //alert(row.projectId)
      // TODO 调用api，获取可疑图谱
      const _this = this
      _this.loading = true

      getPersonTongXinPinFanRelationtList(row.idNum, this.projectId).then(response => {
        _this.list = response.data
        _this.option = personTongXinPinFanRelationtListHandler(_this.list, _this.option)
        myChart.setOption(_this.option)
        _this.loading = false
      })
      getPersonWithTooManyHousesInfo(row.idNum, this.projectId).then(response => {
        _this.list = response.data
        // console.log("11111")
        console.log(this.list)
        if (_this.list != null) {
          // console.log("2222")
          _this.option = personHousesRelationtListHandler(_this.list, _this.option)
          myChart.setOption(_this.option)
          _this.option = personPartnerRelationtListHandler(_this.list, _this.option)
          myChart.setOption(_this.option)
          _this.loading = false
        }
      });

      getPersonWithTooManyJiGouInfo(row.idNum, this.projectId).then(response => {
        _this.list = response.data
        // console.log("11111")
        console.log(this.list)
        if (_this.list != null) {
          // console.log("2222")
          _this.option = personCompanyRelationtListHandler(_this.list, _this.option)
          myChart.setOption(_this.option)
          _this.option = personPartnerRelationtListHandler(_this.list, _this.option)
          myChart.setOption(_this.option)
          _this.loading = false
        }
      });
      getKeYiJiaoYiPersonList(row.idNum, this.projectId).then(response => {
        _this.list = response.data
        _this.option = personJiLiShuRelationtListHandler(_this.list, _this.option)
        myChart.setOption(_this.option)
        _this.loading = false
      });
      getLingChenJiaoYiPersonList(row.idNum, this.projectId).then(response => {
        _this.list = response.data
        _this.option = personLingChenRelationtListHandler(_this.list, _this.option)
        myChart.setOption(_this.option)
        _this.loading = false
      });
      getPersonWithTooManyJiDongCheInfo(row.idNum, this.projectId).then(response => {
        _this.list = response.data
        // console.log("11111")
        console.log(this.list)
        if (_this.list != null) {
          // console.log("222332")
          if (_this.list.personRelation != null) {
            _this.option = personFamilyRelationtListHandler(_this.list, _this.option)
            myChart.setOption(_this.option)
          }
          _this.option = personCarsRelationtListHandler(_this.list, _this.option)
          myChart.setOption(_this.option)
          _this.loading = false
        }
      });
    },
    // 获取所有人（暂时不用）
    // loadAllPersons() {
    //   let myChart = echarts.init(document.getElementById('mainKg'));
    //   // 图表随着浏览器缩放，改变大小
    //   window.addEventListener("resize", () => {
    //     myChart.resize();
    //   });
    //   const _this = this
    //   getAllMainBodyInfo(this.projectId).then(response => {
    //     _this.list = response.data
    //     _this.allData = response.data
    //     console.log(this.list)
    //     this.allPersonList = this.list
    //     console.log(this.allPersonList)
    //     if (_this.list != null) {
    //       _this.option = allPersonListHandler(_this.list, _this.option)
    //       myChart.setOption(_this.option)
    //     }
    //     _this.loading = false
    //   });
    // },

    //获取主体人和他的三跳内关系人
    loadMainBodyAndCoPersonList() {

      let myChart = echarts.init(document.getElementById('mainKg'));
      // 图表随着浏览器缩放，改变大小
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      myChart.clear();
      this.option.series[0].data = []
      this.option.series[0].links = []
      this.personVertexTable.list = null
      this.relationMap = new Map()
      this.mainBodyTableData=[]
      this.jinQinShuTableData=[]
      this.zhongDianRenWuTableData=[]
      this.shangXiaJiTableData=[]
      this.tongShiTableData=[]
      this.zhongJianRenTableData=[]
      this.shangYeHuoBanTableData=[]
      this.yuanQinShuTableData=[]
      this.addPersonList=[]
      this.personVertexTable.list=[]
      const _this = this
      getMainBodyAndCoPersonInfo(this.projectId,this.idNum).then(response => {
        _this.list = response.data
        _this.allData = response.data
        console.log("allData:",_this.allData)
        if(_this.allData.length===0){
          this.$message.error("三跳之内没有发现人员")
        }
        else{
          getAddPerson(_this.projectId,_this.idNum).then(response => {
            for(var i=0;i<response.data.length;i++){
              _this.addPersonList.push({
                "person":response.data[i].child,
                "relation":response.data[i].relation.split("_")[0]
              })
            }
            getsaveRelation(_this.projectId,_this.idNum).then(response=>{
              let saveRelation=[]
              for(var i=0;i<response.data.length;i++){
                saveRelation.push({
                  "person":response.data[i].child,
                  "relation":response.data[i].relation
                })
              }
              for(var i=0;i<_this.allData.length;i++){
                this.relationMap.set(_this.allData[i].idNum,"")
              }
              for(var i=0;i<_this.addPersonList.length;i++){
                let relation=_this.addPersonList[i].relation.split('_')[0]
                if(relation==="未知"){
                  relation=''
                }
                this.relationMap.set(_this.addPersonList[i].person.idNum,relation)
                _this.addRelationTable(_this.addPersonList[i].person,relation)
              }
              for(var i=0;i<saveRelation.length;i++){
                let relation=saveRelation[i].relation
                this.relationMap.set(saveRelation[i].person.idNum,relation)
                _this.addRelationTable(saveRelation[i].person,relation)
              }
              this.relationMap.set(_this.idNum,"目标对象本人")
              console.log(this.relationMap)
              console.log(this.list)
              if (_this.list != null) {
                _this.option = mainBodyAndCoPersonListHandler(_this.list, _this.option)
                myChart.setOption(_this.option)
              }
              _this.loading = false
              _this.addRelationFlag=true
              _this.batchAddRelationFlag=true
              _this.anaysisFlag=true
            })
          })
        }
      })
      // //  图表添加点击事件
      // myChart.on('click',function(params) {
      //   // let _this = this
      //   console.log("click")
      //
      //   if(params.dataType === 'node') {  // 点击节点
      //     console.log("点击了节点"+params.data.id)
      //     // 若点击的是主体人类型
      //     if(params.data.showValueList[0].indexOf('节点类型：人员')!=-1){
      //       if(_this.step.includes("拉取完成")){
      //         console.log("点击的是人物")
      //         _this.relationFormVisible = true
      //         var idNum = params.data.idNum
      //         if(_this.relationMap.get(idNum)===""){
      //           _this.relationForm.relation = ""
      //         }
      //         else{
      //           _this.relationForm.relation = _this.relationMap.get(idNum)
      //         }
      //         _this.clickIdNum = params.data.idNum
      //         console.log(_this.clickIdNum)
      //       }
      //     }
      //   }
      // })
    },
    getJiaoYiDetailList(parentIdNum,duiFangKaHao,projectId){
      // const _this=this
      this.detailType='交易';
      getJiaoYiDetailList(parentIdNum,duiFangKaHao,this.projectId).then(response=>{
        this.lingChenJiaoYiTable.list=response.data;
        this.detailTableLoading = false;
      })
    },
    getTongXunDetailList(parentIdNum,duiFangIdNum,projectId){
      // const _this=this
      this.detailType='通信';
      getTongXunDetailList(parentIdNum,duiFangIdNum,this.projectId).then(response=>{
        this.tongXinTable.list=response.data;
        this.detailTableLoading = false;
      })
    },
    getJiDongCheDetailList(parentIdNum,projectId){
      // const _this=this
      this.detailType='机动车';
      getJiDongCheDetailList(parentIdNum,this.projectId).then(response=>{
        this.JiDongCheTable.list=response.data;
        this.detailTableLoading = false;
      })
    },
    getFangChanDetailList(parentIdNum,projectId){
      // const _this=this
      this.detailType='房产';
      getFangChanDetailList(parentIdNum,this.projectId).then(response=>{
        this.fangChanTable.list=response.data;
        this.detailTableLoading = false;
      })
    },
    getJiGouDetailList(parentIdNum,projectId){
      // const _this=this
      this.detailType='相关人员';
      getJiGouDetailList(parentIdNum,this.projectId).then(response=>{
        this.xiangGuanRenYuanTable.list=response.data;
        this.detailTableLoading = false;
      })
    },
    getTongXingDetailList(m_idNum,o_idNum,m_name,o_name,projectId) {
      // this.loading = true
      const _this = this
      _this.detailType = '同行'
      // 获取该边的所有交易日期
      // 填充数据前需要清空list数组，否则会将其他人的交易信息追加到原始数据中
      _this.tongXingTable.list = []
      getTongXingDetailList(m_idNum,o_idNum,_this.projectId).then(response => {
        _this.detailTableLoading = false
        for(let item of response.data){
          //  设置同行人名称和id
          item.m_idNum = m_name+' '+m_idNum
          item.o_idNum = o_name+' '+o_idNum
          // item.m_name = m_name
          // item.o_name = o_name
          _this.tongXingTable.list.push(item)
        }
        // _this.tongXingTable.list = response.data
        console.log(_this.tongXingTable.list)
        // _this.total = parseInt(response.data.totalElements)
        // console.log(_this.total)
        console.log(response)
      })
    },
    //获取所有人
    loadAllPersons() {
      const _this = this
      getAllMainBodyInfo(this.projectId).then(response => {
        for(var i=0;i<response.data.length;i++){
          _this.allPersonList.push({
            "idNum":response.data[i].idNum,
            "name":response.data[i].name
          })
        }
      });
    },
    querySearchByname(queryString, cb) {
      const _this=this
      var allPersonList = _this.allPersonList
      const results = allPersonList.filter((item) => {
        // 如果没有输入内容，则返回所有项
        if (!queryString) {
          return true
        }
        // 使用indexOf判断是否包含子串
        // return item.idNum.indexOf(queryString) !== -1
        return item.name.indexOf(queryString) !== -1
      })
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    querySearchByIdNum(queryString, cb) {
      const _this=this
      var allPersonList = _this.allPersonList
      const results = allPersonList.filter((item) => {
        // 如果没有输入内容，则返回所有项
        if (!queryString) {
          return true
        }
        // 使用indexOf判断是否包含子串
        return item.idNum.indexOf(queryString) !== -1
        // return item.name.indexOf(queryString) !== -1
      })
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    selectZhuiJia(item){
      this.addRelationIdNumForm.idNum = item.idNum
      this.addRelationIdNumForm.name = item.name
    },
    selectMuBiao(item){
      this.idNumForm.name=item.name
      this.idNumForm.idNum=item.idNum
    },
    showIdNumForm(){
      this.idNumForm.idNum=''
      this.idNumForm.name=''
      this.idNumFormVisible=true
    },
    addRelationTable(person,relation){
      const _this=this
      if(relation === "近亲属"){
        console.log("11111111111111111")
        _this.jinQinShuTableData.push(person)
      }
      else if(relation === "重点人物（司机、秘书等）"){
        _this.zhongDianRenWuTableData.push(person)
      }
      else if(relation === "上下级关系"){
        _this.shangXiaJiTableData.push(person)
      }
      else if(relation === "同事"){
        _this.tongShiTableData.push(person)
      }
      else if(relation === "中间人"){
        _this.zhongJianRenTableData.push(person)
      }
      else if(relation === "商业伙伴"){
        _this.shangYeHuoBanTableData.push(person)
      }
      else if(relation === "远亲属"){
        _this.yuanQinShuTableData.push(person)
      }
    },
    addData(){
      addData(this.projectId).then(response => {
      })
    },

    getLabeled(){
      getLabeled(this.projectId).then(response=>{
        this.labeledIdNums=response.data;
      })
    },
    rowClassName({ row,rowIndex }) {
      // 检查当前行的身份证号是否在要标记的列表中

      console.log("添加底色："+row.idNum);
      if (this.labeledIdNums.includes(row.idNum)) {
        return 'highlight-row'; // 添加底色的类名
      }
      console.log("无需添加")
      return 'common-row'; // 如果不需要添加底色，返回空字符串
    },
  },
  mounted() {
    // var myChart = echarts.init(document.getElementById('main'));
    var categories = [];
    for (var i = 0; i < nodeCategory.size; i++) {
      categories[i] = {
        name: nodeCategory.get(i)
      };
    }
    this.option = {
      // 图的标题
      title: {
        // text: 'ECharts 关系图'
      },
      "color": [
        "#dd6b66",
        "#759aa0",
        "#e69d87",
        "#8dc1a9",
        "#ea7e53",
        "#eedd78",
        "#73a373",
        "#73b9bc",
        "#7289ab",
        "#91ca8c",
        "#f49f42"
      ],
      // 提示框的配置
      // 自定义tooltip：https://blog.csdn.net/shenhonglei1234/article/details/77479432
      tooltip: {
        // formatter: function (x) {
        //   // 可以根据x.data的属性来识别节点还是关系，节点包含name属性，而关系包含source属性
        //   console.log(x)
        //   return x.data.des+'提示框内容'+x.data.age;
        // }

        formatter: function(params){//触发之后返回的参数，这个函数是关键
          console.log(params)
          if (params.data.category !=undefined) {//如果触发节点
            console.log('节点:'+params.data.showValueList)
            // 封装函数，传入params 和 params.data的category
            let show = ''
            for(let i =0;i<params.data.showValueList.length;i++){
              show += params.data.showValueList[i]+"</br>"
            }
            // return '节点:'+params.data.showValue+"</br>"+'id:'+params.data.id;//返回标签
            return show;//返回标签
          }else {//如果触发边
            console.log('关系:'+params.data.name)
            // return '关系:'+params.data.name+"</br>"+'id:'+params.data.id;
            return params.data.des;
          }
        }

      },
      // 工具箱
      toolbox: {
        // 显示工具箱
        show: true,
        feature: {
          mark: {
            show: true
          },
          // 还原
          restore: {
            show: true
          },
          // 保存为图片
          saveAsImage: {
            show: true
          }
        }
      },
      legend: [{
        // selectedMode: 'single',
        data: categories.map(function (a) {
          return a.name;
        }),
        'textStyle':{
          'color':'#eaeaea'
        },
      }],
      series: [{
        type: 'graph', // 类型:关系图
        layout: 'force', // 图的布局，类型为力导图
        symbolSize: 40, // 调整节点的大小

        roam: true, // 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移,可以设置成 'scale' 或者 'move'。设置成 true 为都开启
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [2, 10], // 边的箭头大小
        force: {
          repulsion: 1000, // 斥力
          layoutAnimation: true,
          edgeLength: [60, 200] // 边的长度 两节点之间的距离
        },
        draggable: true,
        labelLayout: {
          moveOverlap: 'shiftX', //标签重叠时，挪动标签防止重叠
          draggable: true //节点标签是否允许鼠标拖拽定位
        },
//将指定的节点以及其所有邻接节点高亮。

        focusNodeAdjacency : true,
        lineStyle: {
          normal: {
            width: 2,
            color: '#4b565b',
            // curveness: 0 //节点连线的曲率，0-1 越大越弯。
          }
        },
        autoCurveness: true, // 自动多关系放重叠，必须关闭curveness
        edgeLabel: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 12 //边的字体大小
            },
            // 边所显示的属性
            formatter: function (x) {
              return x.data.name;
            }
          }
        },
        label: {
          normal: {
            show: true,
            textStyle: {},
            // 节点显示的属性
            formatter: function (x) {
              // return x.data.name;
              return x.data.showValue;
            }
          }
        },

        // 数据
        data: [],
        links: [],
        // data: [{
        //   // id只能是string类型，int类型有问题
        //   id: '1',
        //   name: 'node01',
        //   age: 12,
        //   des: 'nodedes01',
        //   symbolSize: 70,
        //   category: 0,
        //   //可以根据节点类别，设置不同颜色
        //   itemStyle: {
        //     color: "#3fb1e3"
        //   },
        // }, {
        //   id: '2',
        //   name: 'node02',
        //   age: 13,
        //   des: 'nodedes02',
        //   symbolSize: 50,
        //   category: 1,
        //   itemStyle: {
        //     color: "#981234"
        //   },
        // }, {
        //   id: '3',
        //   name: 'node03',
        //   age: 23,
        //   des: 'nodedes3',
        //   symbolSize: 50,
        //   category: 1,
        // }, {
        //   id: '4',
        //   name: 'node04',
        //   age: 32,
        //   des: 'nodedes04',
        //   symbolSize: 50,
        //   category: 1,
        // }, {
        //   id: '5',
        //   name: 'node05',
        //   age: 45,
        //   des: 'nodedes05',
        //   symbolSize: 50,
        //   category: 1,
        // }, {
        //   id: '6',
        //   name: 'node06',
        //   des: 'nodedes06',
        //   symbolSize: 50,
        //   category: 1,
        // }, {
        //   id: '100',
        //   name: 'node06',
        //   nation: '汉族',
        //   des: 'nodedes06',
        //   symbolSize: 50,
        //   category: 1,
        // }],
        // links: [{
        //   id: '11',
        //   source: '1',
        //   target: '2',
        //   name: 'link01',
        //   des: 'link01des'
        // }, {
        //   id: '12',
        //   source: '1',
        //   target: '3',
        //   name: 'link02',
        //   des: 'link02des'
        // }, {
        //   id: '13',
        //   source: '1',
        //   target: '4',
        //   name: 'link03',
        //   des: 'link03des'
        // }, {
        //   id: '14',
        //   source: '1',
        //   target: '5',
        //   name: 'link04',
        //   des: 'link05des'
        // }, {
        //   id: '15',
        //   source: '5',
        //   target: '6',
        //   name: 'link05',
        //   des: 'link06des'
        // }, {
        //   id: '16',
        //   source: '4',
        //   target: '6',
        //   name: 'link07',
        //   des: 'link07des'
        // }],
        categories: categories,
      }]
    };

    // let newarr = Object.assign([],this.nodeList).map(item => {
    //   return Object.assign({},item)
    // })
    // console.log(this.nodeList)
    // alert(this.nodeList.length)
    // for(var i=0;i<this.nodeList.length;i++){
    //   console.log(this.nodeList[i])
    // }
    // this.option.series[0].data = this.nodeList

    // this.fetchData()

  }

}
</script>

<style lang="scss" scoped>
@import "../../../styles/black.css";
.el-row{
  display:flex;
  flex-wrap: wrap;
}
.app-container{
  height: 100%;
}
.line {
  text-align: center;
}
.el-row {
  margin-bottom: 20px;
}

.name {
  text-overflow: ellipsis;
  overflow: hidden;
}
.idNum {
  font-size: 14px;
  color: #b4b4b4;
}
.my-autocomplete{
  width: 300px;
}
.el-table th.is-leaf {
  border-bottom: none;
}
//去除表格的最下边框线；
.el-table::before {
  height: 0;
}

</style>
