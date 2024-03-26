<template>
  <div class="app-container" v-loading="loading">
    <el-input v-model="input"  placeholder="请输入分数"></el-input>
    <el-table
      :data="list"
      element-loading-text="Loading"
      border
      fit
      @row-click="getRow"
      highlight-current-row
    >
      <el-table-column align="center" fixed label="ID" width="100">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="id" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column label="身份证号" width="350" align="center">
        <template slot-scope="scope">
          {{ scope.row.idNum }}
        </template>
      </el-table-column>
      <el-table-column label="标定分数" property="modifyScore" prop="modifyScore" width="120"  align="center">
        <template slot-scope="scope">
          <el-input v-model="scope.row.modifyScore" type="number" @input="onExchange(scope)" placeholder="请输入分数"></el-input>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="200" align="center">
        <template slot-scope="scope">
<!--          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>-->
          <el-tag :type="'published' | statusFilter">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="300">
        <template slot-scope="scope">
          <i class="el-icon-time" />
<!--          <span>{{ scope.row.display_time }}</span>-->
          <span>2023-01-01 08:09:10</span>
        </template>
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="300"
        align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="success" plain size="small">查看</el-button>
          <el-button type="primary" plain size="small">编辑</el-button>
          <el-button type="danger" plain size="small">删除</el-button>
        </template>
      </el-table-column>

    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="10"
      :total="total"
      @current-change="page"
    style="width: 100%;margin: 0 auto;text-align: center;margin-top: 20px;">
    </el-pagination>
  </div>
</template>

<script>
import { pageListPerson } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      total: 0,// 总记录数
      // 等待遮罩
      loading: false,
      projectId:'230220205521610',
      input:''
    }
  },
  created() {
    this.fetchData(1) //初始从第1页查询
  },
  methods: {
    //点击可疑特征行
    getRow(row,event,column){
      console.log(row)
      console.log(this.list)
      // console.log(column)
      // console.row.id
    },
    onExchange(scope){
      let moment = this.list[scope.$index]
      this.$set(this.list,scope.$index, moment)
    },

    page(currentPage){
      this.fetchData(currentPage)
    },
    fetchData(currentPage) {
      this.loading = true
      console.log('table取数据')
      const _this = this
      pageListPerson(currentPage,10,this.projectId).then(response => {
        _this.loading = false
        _this.list = response.data.content
        console.log(_this.list)
        for(let i=0;i<_this.list.length;i++){
          _this.list[i].modifyScore = _this.list[i].id
        }
        _this.total = parseInt(response.data.totalElements)
        console.log(_this.total)
        console.log(_this.list)
      })
    }
  }
}
</script>
