<template>
  <div>
    <div class="table-container">
      <el-button type="primary" size="large"  @click="trainModel" style="border-radius: 0px;">
        模型试判
      </el-button>
      <el-button type="primary" size="large"  @click="trainprogressDialogVisible = true" style="border-radius: 0px;">
        训练进度
      </el-button>
      <el-table
        :data="scoresList"
        border
        stripe
        >
        <el-table-column
          prop="score"
          label="标签分数"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="number"
          label="标签数量"
          width="180"
          align="center"
        >
        </el-table-column>
      </el-table>
    </div>
    <div style="height: 20px">

    </div>
    <el-button type="primary" @click="exportToExcel">导出</el-button>
    <el-table id="out-table" :data="currentPageData" border stripe>
      <el-table-column
        v-for="(column, index) in labelList"
        :key="index"
        :prop="column.prop"
        :label="column.label"
        width="90"
        align="center"
        :render-header="renderHeader"
      >
        <template slot-scope="scope">
          <template v-if="column.prop === 'score'">
            <template v-if="scope.$index !== editIndex">
              <template>{{ scope.row[column.prop] }} </template>
              <el-button @click="startEdit(scope.$index)" type="text">编辑</el-button>
            </template>
            <template v-else>
              <el-input v-model="editedScore" @keyup.enter="showConfirmDialog(scope.$index)" ref="input" size="mini"></el-input>
              <el-button @click="showConfirmDialog(scope.$index)" type="text" size="mini">保存</el-button>
              <el-button @click="cancelEdit(scope.$index)" type="text" size="mini">取消</el-button>
            </template>
          </template>
          <template v-else>
            {{ scope.row[column.prop] }}
          </template>
        </template>
      </el-table-column>
      <el-table-column
        prop="score"
        label="分数"
        width="90"
        align="center"
        fixed="right"
      >
        <template slot-scope="scope">
            <template v-if="scope.$index !== editIndex">
              <template>{{ scope.row["score"] }} </template>
              <el-button @click="startEdit(scope.$index)" type="text">编辑</el-button>
            </template>
            <template v-else>
              <el-input v-model="editedScore" @keyup.enter="showConfirmDialog(scope.$index)" ref="input" size="mini"></el-input>
              <el-button @click="showConfirmDialog(scope.$index)" type="text" size="mini">保存</el-button>
              <el-button @click="cancelEdit(scope.$index)" type="text" size="mini">取消</el-button>
            </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="padding-bottom: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5,10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="detailData.length">
    </el-pagination>
    <el-dialog title="模型训练进度" :visible.sync="trainprogressDialogVisible">
      <el-form :model="r2Score">
      <el-form-item label="数量" :label-width="formLabelWidth">
        <el-input v-model="r2Score.count" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="训练进度" :label-width="formLabelWidth">
        <el-input v-model="r2Score.score" :disabled="true" autocomplete="off"></el-input>
      </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="loadTrainProgress">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // 引入导出Excel表格依赖
  // import * as FileSaver from "file-saver";
  import * as XLSX from "xlsx";
  import $ from "jquery";
  import {getLabelClassify} from '@/api/doubtMining'
  import {getLabelDetail} from '@/api/doubtMining'
  import {saveScore} from '@/api/doubtMining'
  export default {
    name: 'LabelDetail',
    data() {
      return {
        scoresList: [],
        labelList: [],
        detailData: [],
        currentPage: 1,
        pageSize: 5,
        editIndex: -1,
        editedScore: '',
        trainprogressDialogVisible: false,
        r2Score: {
          score: '',
          count: ''//取记录条数
        },
        formLabelWidth: '120px'
      }
    },
    created() {
      this.getLabelClassify();
      this.getRule();
      this.getLabelDetail();
    },
    computed: {
      currentPageData() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.detailData.slice(startIndex, endIndex);
      },
    },
    methods: {
      getLabelClassify() {
        getLabelClassify().then(response=>{
          this.scoresList=[]
          const scoreMap=response.data
          console.log("scoreMap:"+scoreMap)
          for (const key in scoreMap) {
            if (scoreMap.hasOwnProperty(key)) {
              this.scoresList.push({
                "score": key, "number": scoreMap[key] });
            }
          }
          console.log("scoreList:"+this.scoresList)
        }).catch(error=>{
          console.log("出错");
        })
      },
      getRule() {
        let label=["其中一个手机号在三日内通话次数低于10次","主体人的其中一个手机号在三日内通话次数高于10次小于20次","主体人的其中一个手机号在三日内通话次数高于20次",
          "银行流水中主体人与对方吉利数转账金额在一个月内低于10次","银行流水中主体人与对方吉利数转账金额在一个月内高于10次低于20次","银行流水中主体人与对方吉利数转账金额在一个月内高于20次",
          "主体人与交易对象在一个月内在凌晨交易低于10次","主体人与交易对象在一个月内在凌晨交易高于10次低于20次","主体人与交易对象在一个月内在凌晨交易高于20次",
          "主体人及其家人房产数量","主体人及其家人拥有机构数量","主体人及其家人拥有汽车数量","主体人三日交易金额每笔都大于等于1000 且是100的整数倍的整数的交易次数小于三日总交易次数的30%",
          "主体人三日交易金额每笔都大于等于1000 且是100的整数倍的整数的交易次数小于三日总交易次数的60%","主体人三日交易金额每笔都大于等于1000 且是100的整数倍的整数的交易次数大于三日总交易次数的60%",
          "同行人数量","频繁夜间通话:主体人与通讯方夜间通话次数","主体人同一天出行记录中最大时间的出行记录的目的地在当日和次日没有住宿记录","主体人及其家人与对方有支出类型为转账的大额银行流水",
          "主体人及其家人有大额消费，支出类型为消费或 pos 机","主体人及其家人的现金交易次数 (银行流水中无对方账号的为现金交易)","主体人及其家人在一个时间段内在同一个 ATM 机频繁存取款",
          "主体人的违章记录中，有非车主本人处理违章信息记录","主体人拥有特定意义的手机靓号","代持卡数量","热点地区排名前五的出行次数","寄递物流地区排名前三的次数","出行但未有住宿信息的地区排名前三的出行次数"];
        let prop=["rule_1_0","rule_1_1","rule_1_2","rule_2_0","rule_2_1","rule_2_2","rule_3_0","rule_3_1","rule_3_2","rule_4","rule_5","rule_6"
          ,"rule_7_0","rule_7_1","rule_7_2","rule_8","rule_10","rule_11","rule_12","rule_14","rule_15","rule_17"
          ,"rule_18","rule_20","rule_21","rule_22","rule_23","rule_24"];
        console.log(label.length)
        for(let n=0;n<label.length;n++){
          console.log(label[n])
          this.labelList.push({
            "label":label[n], "prop": prop[n] });
        }
      },
      getLabelDetail() {
        getLabelDetail().then(response=>{
          this.detailData = response.data
          this.handleSort()
        }).catch(error=>{
          console.log("出错")
        })
      },
      handleSizeChange(newSize) {
        this.pageSize = newSize;
        this.currentPage = 1;
      },
      handleCurrentChange(newPage) {
        this.currentPage = newPage;
      },
      startEdit(index) {
        this.editIndex = index;
        index=(this.currentPage-1)*this.pageSize+index
        this.editedScore = this.detailData[index].score.toString();
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      },
      showConfirmDialog(index) {
        this.$confirm('确认保存修改吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.endEdit(index);
        }).catch(() => {
          // 用户点击取消，不进行任何操作
        });
      },
      endEdit(index) {
        if (!isNaN(this.editedScore)) {
          index = (this.currentPage - 1) * this.pageSize + index
          let num_feature = this.detailData[index].num_feature
          let idNum = num_feature.split("|")[0]
          let projectId = num_feature.split("|")[1]
          console.log(projectId)
          saveScore(idNum, projectId, this.editedScore).then(responce => {
            this.detailData[index].score = parseInt(this.editedScore);
            this.editIndex = -1;
            this.editedScore = '';
            this.getLabelClassify();
            this.handleSort();
            this.$message.success("修改成功");
          }).catch(error => {
            this.$message.error("修改失败");
          })

        } else {
          alert('请输入有效的分数');
        }
      },
      cancelEdit(index) {
        this.editIndex = -1;
        this.editedScore = '';
      },
      handleSort() {
        let sortData = [...this.detailData].sort((a, b) => b.score - a.score);
        console.log(sortData);
        this.detailData = sortData;
      },
    // 模型训练进度
    loadTrainProgress() {
      const _this = this
      $.ajax({
        // url: 'http://172.16.44.129:6888/kg/node/getR2Score',
        // url: 'http://127.0.0.1:8080/node/getR2Score',
        url: window.global_config.BASE_URL+'/node/getR2Score',
        data: {
          projectId:_this.r2Score.count
        },
        type: "post",
        dataType: "json",
        async: true,
        success: function (response) {
          // _this.trainprogressDialogVisible = true
          if (response.code == 500) {
            alert("模型训练进度获取失败")
          } else {
            _this.r2Score.score = response.data
          }
        }, fail: function () {
          alert("模型训练进度获取失败")
        }
      })
    },
    // 模型训练
    trainModel(){
      const _this = this
      $.ajax({
        // url: 'http://172.16.44.129:6888/kg/node/trainModelWithCount',
        // url: 'http://127.0.0.1:8080/node/trainModelWithCount',
        url: window.global_config.BASE_URL+'node/trainModelWithCount',
        data: {
          projectId:_this.r2Score.count
        },
        type: "post",
        dataType: "json",
        async: true,
        success: function(response) {
          if(response.code==500){
            alert("训练失败")
          }
          else{
            _this.$message.success('模型训练成功')
          }

        },error: function() {
          alert("训练失败")
        }
      });
    },
    renderHeader(h, { column, $index }) {
        return h('div', [

          h('span', `( ${$index + 1} )`),
          h('br'),
          h('br'),
          h('span', column.label) // 添加原始的列标签
        ]);
    },
      // 导出表格  按钮点击后触发事件
      exportToExcel() {
        const data = this.detailData;

        // 原本的英文表头
        const englishHeader = ["num_feature","rule_1_0","rule_1_1","rule_1_2","rule_2_0","rule_2_1","rule_2_2","rule_3_0","rule_3_1","rule_3_2","rule_4","rule_5","rule_6"
          ,"rule_7_0","rule_7_1","rule_7_2","rule_8","rule_10","rule_11","rule_12","rule_14","rule_15","rule_17"
          ,"rule_18","rule_20","rule_21","rule_22","rule_23","rule_24","score"];


        const columnMapping = { 'num_feature': '身份证号',
          'rule_1_0':"其中一个手机号在三日内通话次数低于10次",
          'rule_1_1':"主体人的其中一个手机号在三日内通话次数高于10次小于20次",
          'rule_1_2':"主体人的其中一个手机号在三日内通话次数高于20次",
          'rule_2_0':"银行流水中主体人与对方吉利数转账金额在一个月内低于10次",
          'rule_2_1':"银行流水中主体人与对方吉利数转账金额在一个月内高于10次低于20次",
          'rule_2_2':"银行流水中主体人与对方吉利数转账金额在一个月内高于20次" ,
          'rule_3_0':"主体人与交易对象在一个月内在凌晨交易低于10次",
          'rule_3_1':"主体人与交易对象在一个月内在凌晨交易高于10次低于20次",
          'rule_3_2':"主体人与交易对象在一个月内在凌晨交易高于20次",
          'rule_4':"主体人及其家人房产数量",
          'rule_5':"主体人及其家人拥有机构数量",
          'rule_6':"主体人及其家人拥有汽车数量",
          'rule_7_0':"主体人三日交易金额每笔都大于等于1000且是100的整数倍的整数的交易次数小于三日总交易次数的30%",
          'rule_7_1':"主体人三日交易金额每笔都大于等于1000 且是100的整数倍的整数的交易次数小于三日总交易次数的60%",
          'rule_7_2':"主体人三日交易金额每笔都大于等于1000 且是100的整数倍的整数的交易次数大于三日总交易次数的60%",
          'rule_8':"同行人数量",
          'rule_10':"频繁夜间通话:主体人与通讯方夜间通话次数",
          'rule_11':"主体人同一天出行记录中最大时间的出行记录的目的地在当日和次日没有住宿记录",
          'rule_12':"主体人及其家人与对方有支出类型为转账的大额银行流水",
          'rule_14':"主体人及其家人有大额消费，支出类型为消费或 pos 机",
          'rule_15':"主体人及其家人的现金交易次数(银行流水中无对方账号的为现金交易)",
          'rule_17':"主体人及其家人在一个时间段内在同一个ATM机频繁存取款",
          'rule_18':"主体人的违章记录中，有非车主本人处理违章信息记录",
          'rule_20':"主体人拥有特定意义的手机靓号",
          'rule_21':"代持卡数量",
          'rule_22':"热点地区排名前五的出行次数",
          'rule_23':"寄递物流地区排名前三的次数",
          'rule_24':"出行但未有住宿信息的地区排名前三的出行次数",
        'score':"分数"};
// 映射英文列名到中文列名
        const header = [{ num_feature: '身份证号',
            rule_1_0:"其中一个手机号在三日内通话次数低于10次",
            rule_1_1:"主体人的其中一个手机号在三日内通话次数高于10次小于20次",
            rule_1_2:"主体人的其中一个手机号在三日内通话次数高于20次",
            rule_2_0:"银行流水中主体人与对方吉利数转账金额在一个月内低于10次",
            rule_2_1:"银行流水中主体人与对方吉利数转账金额在一个月内高于10次低于20次",
            rule_2_2:"银行流水中主体人与对方吉利数转账金额在一个月内高于20次" ,
            rule_3_0:"主体人与交易对象在一个月内在凌晨交易低于10次",
            rule_3_1:"主体人与交易对象在一个月内在凌晨交易高于10次低于20次",
            rule_3_2:"主体人与交易对象在一个月内在凌晨交易高于20次",
            rule_4:"主体人及其家人房产数量",
            rule_5:"主体人及其家人拥有机构数量",
            rule_6:"主体人及其家人拥有汽车数量",
            rule_7_0:"主体人三日交易金额每笔都大于等于1000且是100的整数倍的整数的交易次数小于三日总交易次数的30%",
            rule_7_1:"主体人三日交易金额每笔都大于等于1000 且是100的整数倍的整数的交易次数小于三日总交易次数的60%",
            rule_7_2:"主体人三日交易金额每笔都大于等于1000 且是100的整数倍的整数的交易次数大于三日总交易次数的60%",
            rule_8:"同行人数量",
            rule_10:"频繁夜间通话:主体人与通讯方夜间通话次数",
            rule_11:"主体人同一天出行记录中最大时间的出行记录的目的地在当日和次日没有住宿记录",
            rule_12:"主体人及其家人与对方有支出类型为转账的大额银行流水",
            rule_14:"主体人及其家人有大额消费，支出类型为消费或 pos 机",
            rule_15:"主体人及其家人的现金交易次数(银行流水中无对方账号的为现金交易)",
            rule_17:"主体人及其家人在一个时间段内在同一个ATM机频繁存取款",
            rule_18:"主体人的违章记录中，有非车主本人处理违章信息记录",
            rule_20:"主体人拥有特定意义的手机靓号",
            rule_21:"代持卡数量",
            rule_22:"热点地区排名前五的出行次数",
            rule_23:"寄递物流地区排名前三的次数",
            rule_24:"出行但未有住宿信息的地区排名前三的出行次数",
            scoer:"分数"}];

// 根据映射创建中文表头
        const chineseHeader = englishHeader.map(column => columnMapping[column]);


// 将数据的列名从英文转换为中文
        const dataWithChineseHeader = data.map(item => {
          const newItem = {};
          for (const column in item) {
            newItem[columnMapping[column]] = item[column];
          }
          return newItem;
        });

// 重新排序数据列
        const reorderedData = dataWithChineseHeader.map(item => {
          const reorderedItem = {};
          chineseHeader.forEach(column => {
            reorderedItem[column] = item[column];
          });
          return reorderedItem;
        });

// 导出 Excel 文件
        const ws = XLSX.utils.json_to_sheet(reorderedData);

        // const ws = XLSX.utils.json_to_sheet(data, { header: header });

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, 'table_data.xlsx');
      },
  }
}
</script>
<style lang="scss" scoped>
  .table-container {
    margin: 0 auto; /* 水平居中 */
    max-width: 362px; /* 可以设置最大宽度 */
  }
</style>
