<template>
  <div class="app-container" v-loading="loading">
    <el-row :gutter="20">
      <el-col :span="20">
        <el-card shadow="hover" class="mgb20">
          <template #header>
            <div class="clearfix">
              <span>生成测试数据</span>
            </div>
          </template>
          <el-form ref="form" :rules="rules" :model="form" label-width="220px">
            <el-form-item label="专案数量" prop="projectNum">
              <el-input v-model="form.projectNum"/>
            </el-form-item>
<!--            <el-form-item label="身份证号" prop="idNum">-->
            <el-form-item label="每个专案下的Person节点数量" prop="batchNum">
              <el-input v-model="form.batchNum"/>
            </el-form-item>


            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')">Create</el-button>
              <el-button @click="onCancel">Cancel</el-button>
            </el-form-item>
          </el-form>
          <el-divider></el-divider>
          <div>
            <h3>提示：</h3>
            <ul>
              <li>【专案数量】是大于1的整数，如10</li>
              <li>【每个专案下的Person节点数量】也为整数，如2000</li>
            </ul>
          </div>
        </el-card>
      </el-col>


    </el-row>


  </div>
</template>

<script>
import { doInsertNodeAndRelation } from '@/api/form'

export default {
  data() {
    return {
      form: {
        projectNum: '',
        batchNum: ''
      },
      // 等待遮罩
      loading: false,
      // 校验
      rules: {
        projectNum: [
          { required: true, message: '请输入专案数量（大于0的整数）', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        batchNum: [
          { required: true, message: '请输入每个专案下的Person节点数量', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    onSubmit(form) {
      console.log(form)
      this.$refs[form].validate((valid) => {
        if (valid) {
          // alert('submit!');
          this.handleSave(form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // this.handleSave(this.form)
      // this.$message('submit!')
    },

    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },

    handleSave() {
      this.loading = true
      console.log('生成测试数据')
      var _this = this
      doInsertNodeAndRelation(this.form.projectNum,this.form.batchNum).then(response => {
        console.log(response)
        _this.loading = false
        _this.$notify({
          title: '生成完成',
          message: _this.form.projectNum+'个专案测试数据生成完成',
          type: 'success'
        });
      })
    },



  }
}
</script>

<style scoped>
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

