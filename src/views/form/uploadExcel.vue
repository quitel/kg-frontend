<template>
  <div class="app-container" v-loading="loading">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover" class="mgb20">
          <template #header>
            <div class="clearfix">
              <span>从表单创建</span>
            </div>
          </template>
          <el-form ref="form" :rules="rules" :model="form" label-width="120px">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name"/>
            </el-form-item>
<!--            <el-form-item label="身份证号" prop="idNum">-->
            <el-form-item label="身份证号" >
              <el-input v-model="form.idNum"/>
            </el-form-item>


            <el-form-item label="备注">
              <el-input v-model="form2.desc" type="textarea"/>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit('form')">Create</el-button>
              <el-button @click="onCancel">Cancel</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card shadow="hover" class="mgb20">
          <template #header>
            <div class="clearfix">
              <span>从文件导入</span>
            </div>
          </template>
          <el-form ref="form2" :rules="rules" :model="form2" label-width="120px">
            <el-form-item label="类别" prop="fileCategory">
              <el-radio-group v-model="form2.fileCategory" style="line-height: 25px;">
                <el-radio label="1" >出行汇总表</el-radio>
                <el-radio label="2" >房产</el-radio>
                <el-radio label="3" >户籍信息</el-radio>
                <el-radio label="4" >婚姻表</el-radio>
                <el-radio label="5" >机动车违章信息</el-radio>
                <el-radio label="6" >机动车信息</el-radio>
                <el-radio label="7" >机构相关人员表</el-radio>
                <el-radio label="8" >机构信息表</el-radio>
                <el-radio label="9" >通讯机主</el-radio>
                <el-radio label="10" >通讯记录</el-radio>
                <el-radio label="11" >同户信息</el-radio>
                <el-radio label="12" >银行持卡人</el-radio>
                <el-radio label="13" >银行流水</el-radio>
                <el-radio label="14" >云搜关系人数据</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="文件"  prop="file">
              <el-upload
                ref="upload"
                class="upload-demo"
                drag
                action="http://localhost:8080/file/excel/import"
                multiple
                :limit="1"
                :before-upload="beforeUpload">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传.xls/.xlsx文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>


            <el-form-item>
              <el-button type="primary" @click="onSubmit2('form2')">Create</el-button>
              <el-button @click="onCancel">Cancel</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>


    </el-row>


    <el-row :gutter="20" >
      <el-col :span="24">
        <el-card shadow="hover" class="mgb20">
          <template #header>
            <div class="clearfix">
              <span>表头模板</span>
            </div>
          </template>


          <template>
            <el-tabs >
              <el-tab-pane label="出行汇总表" name="chuxing">
                <span>需要严格对应表头字段</span>
                <template>
                  <el-table
                    border
                    style="width: 100%;">
                    <el-table-column label="姓名" ></el-table-column>
                    <el-table-column label="证件号码"></el-table-column>
                    <el-table-column label="出行类别"></el-table-column>
                    <el-table-column label="状态"></el-table-column>
                    <el-table-column label="起始日期"></el-table-column>
                    <el-table-column label="终止日期"></el-table-column>
                    <el-table-column label="起始地区"></el-table-column>
                    <el-table-column label="到达地区"></el-table-column>
                    <el-table-column label="航班车次"></el-table-column>
                    <el-table-column label="厢号"></el-table-column>
                    <el-table-column label="座位房号"></el-table-column>
                    <el-table-column label="航空公司"></el-table-column>
                    <el-table-column label="住宿名称"></el-table-column>
                  </el-table>
                </template>

              </el-tab-pane>
              <el-tab-pane label="房产表" name="fangchan">
                <span>需要严格对应表头字段</span>
                <template>
                  <el-table
                    border
                    style="width: 100%;">
                    <el-table-column label="姓名" ></el-table-column>
                    <el-table-column label="身份证号"></el-table-column>
                    <el-table-column label="证件类型"></el-table-column>
                    <el-table-column label="查询结果套数"></el-table-column>
                    <el-table-column label="所有权人或购房人姓名"></el-table-column>
                    <el-table-column label="所有权人或购房人证件号码"></el-table-column>
                    <el-table-column label="共有权人姓名"></el-table-column>
                    <el-table-column label="共有权人证件号码"></el-table-column>
                    <el-table-column label="房产所属地"></el-table-column>
                    <el-table-column label="项目名称"></el-table-column>
                    <el-table-column label="房屋坐落"></el-table-column>
                    <el-table-column label="建筑面积"></el-table-column>
                    <el-table-column label="规划用途或用途"></el-table-column>
                    <el-table-column label="居住类型"></el-table-column>
                    <el-table-column label="房屋登记时间或网签时间"></el-table-column>
                    <el-table-column label="交易金额"></el-table-column>
                    <el-table-column label="付款方式"></el-table-column>
                    <el-table-column label="库状态"></el-table-column>
                    <el-table-column label="转出时间或退房时间"></el-table-column>
                    <el-table-column label="下一手所有权人或购房人"></el-table-column>
                    <el-table-column label="下一手所有权人或购房人证件号码"></el-table-column>
                    <el-table-column label="地址缩写"></el-table-column>
                    <el-table-column label="楼号"></el-table-column>
                    <el-table-column label="门号"></el-table-column>
                    <el-table-column label="户号"></el-table-column>
                    <el-table-column label="是否初始登记"></el-table-column>
                    <el-table-column label="是否转移登记"></el-table-column>
                    <el-table-column label="转移登记时间"></el-table-column>
                    <el-table-column label="数据来源"></el-table-column>
                    <el-table-column label="备注"></el-table-column>
                    <el-table-column label="收件号"></el-table-column>
                  </el-table>
                </template>
              </el-tab-pane>
              <el-tab-pane label="户籍信息表" name="huji">户籍信息表</el-tab-pane>
              <el-tab-pane label="婚姻表" name="hunyin">婚姻表</el-tab-pane>
            </el-tabs>
          </template>

        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { addPersonVertex } from '@/api/form'
import { uploadExcelFile } from '@/api/form'

export default {
  data() {
    return {
      form: {
        name: '',
        idNum: ''
      },
      form2: {
        fileCategory: '',
        file: null,
        fileList: null,
        fileName: '',
        desc: ''
      },
      // 等待遮罩
      loading: false,
      // 校验
      rules: {
        name: [
          { required: true, message: '请输入姓名名称', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        idNum: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { validator: this.isCardID, trigger: 'blur' }
        ],
        fileCategory: [
          { required: true, message: '请选择文件类别', trigger: 'change' }
        ],
        file: [{
            message: '请先上传文件',
            trigger: 'change',
            required: true,
          }]
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
    onSubmit2(form2) {
      console.log(form2)
      this.$refs[form2].validate((valid) => {
        if (valid) {
          this.handleSave2(form2)
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
      console.log('保存personVertex')
      var _this = this
      addPersonVertex(this.form).then(response => {
        console.log(response)
        _this.loading = false
        _this.$message('submit!')
      })
    },

    handleSave2() {
      this.loading = true
      console.log('上传文件，导入信息')
      var _this = this
      _this.$message('上传成功，正在导入')
      _this.$refs.upload.clearFiles()

      uploadExcelFile(this.form2.file,this.form2.fileCategory).then(response => {
        // console.log(response)
        _this.$notify({
          title: '导入完成',
          message: _this.form2.file.name+'导入成功',
          type: 'success'
        });
        _this.loading = false
      }).catch(function(error) {
        console.log(error)
        _this.$refs.upload.clearFiles()
        _this.loading = false
      })
    },

    // 上传前校验文件
    beforeUpload(file){
      this.form2.file = file;
      const extension = file.name.split('.')[1] === 'xls'
      const extension2 = file.name.split('.')[1] === 'xlsx'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!extension && !extension2) {
        this.$message.warning('上传模板只能是 xls、xlsx格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.warning('上传模板大小不能超过 5MB!')
        return false
      }
      this.form2.fileName = file.name;
      // return false // 返回false不会自动上传
      console.log(this.form2.file)
      console.log(this.form2.fileName)
    },

    // 身份证号校验
    // 身份证验证
    isCardID(rule, value, callback) {
      console.log(value)
      if (!/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(value)) {
        callback(new Error('你输入的身份证长度或格式错误'))
      }
      // 身份证城市
      var aCity = {
        11: '北京',
        12: '天津',
        13: '河北',
        14: '山西',
        15: '内蒙古',
        21: '辽宁',
        22: '吉林',
        23: '黑龙江',
        31: '上海',
        32: '江苏',
        33: '浙江',
        34: '安徽',
        35: '福建',
        36: '江西',
        37: '山东',
        41: '河南',
        42: '湖北',
        43: '湖南',
        44: '广东',
        45: '广西',
        46: '海南',
        50: '重庆',
        51: '四川',
        52: '贵州',
        53: '云南',
        54: '西藏',
        61: '陕西',
        62: '甘肃',
        63: '青海',
        64: '宁夏',
        65: '新疆',
        71: '台湾',
        81: '香港',
        82: '澳门',
        91: '国外'
      }
      if (!aCity[parseInt(value.substr(0, 2))]) {
        callback(new Error('你的身份证地区非法'))
      }

      // 出生日期验证
      var sBirthday = (value.substr(6, 4) + '-' + Number(value.substr(10, 2)) + '-' + Number(value.substr(12, 2))).replace(/-/g, '/'),
        d = new Date(sBirthday)
      if (sBirthday != (d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate())) {
        callback(new Error('身份证上的出生日期非法'))
      }

      // 身份证号码校验
      var sum = 0,
        weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2],
        codes = '10X98765432'
      for (var i = 0; i < value.length - 1; i++) {
        sum += value[i] * weights[i]
      }
      var last = codes[sum % 11] //计算出来的最后一位身份证号码
      if (value[value.length - 1] != last) {
        callback(new Error('你输入的身份证号非法'))
      }

      callback()
    }
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

