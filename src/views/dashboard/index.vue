<template>
  <div class="dashboard-container">
      <div class="app-container" >
        <el-row :gutter="24">
          <el-col :span="24">
            <el-card shadow="hover" class="mgb20">
              <template #header>
                <div class="clearfix">
                  <span>Neo4j概况</span>
                  <el-button type="primary" size="small"   @click="getTotalNodeAndRelationCount" style="float: right">刷新neo4j数量</el-button>
                </div>
              </template>


              <div>
                <el-col :span="8" >
                <h2>节点总数：<span style="color: indianred;font-size: 40px;">
                  {{ neo4j.totalNodeCount }}
                </span></h2>
                </el-col>

                <el-col :span="8">
                  <h2>关系总数：<span style="color: indianred;font-size: 40px;">
                    {{ neo4j.totalRelationCount }}
                  </span></h2>
                </el-col>
              </div>
            </el-card>
          </el-col>


        </el-row>

        <el-row :gutter="24">
          <el-col :span="8" style="background-color: #f4f4f5">
            <el-select v-model="selectedProjectId" placeholder="请选择专案">
              <el-option
                v-for="item in allDataBaseId"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-button type="danger" :loading=pullLoading  @click="pullFromPostgreSQL(selectedProjectId)" style="margin-right: 50px">拉取</el-button>

          </el-col>
        </el-row>

        <el-row :gutter="24">
          <el-col :span="24">
            <el-card shadow="hover" class="mgb20">
              <template #header>
                <div class="clearfix">
                  <span>拉取数据</span>
                </div>
              </template>

              <div>
                <el-button type="danger" :loading=loading  @click="pullFromPostgreSQL" style="margin-bottom: 10px">拉取全部表格</el-button>
                <el-button type="primary" :loading=loading  @click="pullTableFromPostgreSQL('huji')" style="margin-bottom: 10px">拉取户籍信息表</el-button>
                <el-button type="primary" :loading=loading  @click="pullTableFromPostgreSQL('weizhang')" style="margin-bottom: 10px">拉取违章信息表</el-button>
                <el-button type="primary" :loading=loading  @click="pullTableFromPostgreSQL('yinhangchika')" style="margin-bottom: 10px">拉取银行持卡人信息表</el-button>
                <el-button type="primary" :loading=loading  @click="pullTableFromPostgreSQL('chuxing')" style="margin-bottom: 10px">拉取出行信息表</el-button>
                <el-button type="primary" :loading=loading  @click="pullTableFromPostgreSQL('hunyin')" style="margin-bottom: 10px">拉取婚姻信息表</el-button>
                <el-button type="primary" :loading=loading  @click="pullTableFromPostgreSQL('tonghu')" style="margin-bottom: 10px">拉取同户信息表</el-button>
                <el-button type="primary" :loading=loading  @click="pullTableFromPostgreSQL('tongxunjizhu')" style="margin-bottom: 10px">拉取通讯机主信息表</el-button>
                <el-button type="primary" :loading=loading  @click="pullTableFromPostgreSQL('jidongche')" style="margin-bottom: 10px">拉取机动车信息表</el-button>
                <el-button type="primary" :loading=loading  @click="pullTableFromPostgreSQL('jigou')" style="margin-bottom: 10px">拉取机构信息表</el-button>
                <el-button type="primary" :loading=loading  @click="pullTableFromPostgreSQL('xiangguanrenyuan')" style="margin-bottom: 10px">拉取机构相关人员信息表</el-button>
                <el-button type="primary" :loading=loading  @click="pullTableFromPostgreSQL('fangchan')" style="margin-bottom: 10px">拉取房产信息表</el-button>
                <el-button type="primary" :loading=loading  @click="pullTableFromPostgreSQL('tongxunjilu')" style="margin-bottom: 10px">拉取通讯记录信息表</el-button>
                <el-button type="primary"   @click="getTotalNodeAndRelationCount">获取neo4j数量</el-button>
              </div>
            </el-card>
          </el-col>


        </el-row>


      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {postgres2Neo4j} from '@/api/dashboard'
import {getTotalNodeAndRelationCount} from '@/api/dashboard'
import {postgresTable2Neo4j} from '@/api/dashboard'
import { getAllDataBaseId } from '@/api/doubtMining'

export default {
  name: 'Dashboard',
  data() {
    return {
      neo4j: {
        totalNodeCount: 0,
        totalRelationCount: 0
      },
      // 等待遮罩
      loading: false,
      // 计时器
      timer:'',
      userId : 1,
      allDataBaseId: [],
      selectedProjectId:'',
    }
  },
  created() {
    this.getTotalNodeAndRelationCount()
    this.getAllDataBaseId()
  },
  methods: {
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
    pullFromPostgreSQL(projectId){
      this.pullLoading = true
      const _this = this
      _this.$message('正在拉取')
      this.timer = setInterval(this.getTotalNodeAndRelationCount, 1000);
      postgres2Neo4j(projectId).then(response => {
        console.log(response)
        _this.pullLoading = false
        clearInterval(_this.timer);
      }).catch(function(error) {
        console.log(error)
        clearInterval(_this.timer);
      })
    },


    pullTableFromPostgreSQL(tableName){
      const _this = this
      _this.$message('正在拉取')
      postgresTable2Neo4j(tableName).then(response => {
        _this.$notify({
          title: '拉取完成',
          message: tableName+'导入成功',
          type: 'success'
        });
        this.getTotalNodeAndRelationCount()
      })
    },

    getTotalNodeAndRelationCount(){
      const _this = this
      getTotalNodeAndRelationCount().then(response => {
        console.log(response)
        _this.neo4j.totalNodeCount = response.data.totalNodeCount
        _this.neo4j.totalRelationCount = response.data.totalRelationCount
      }).catch(function(error) {
        console.log(error)
        clearInterval(_this.timer);
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
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
</style>
