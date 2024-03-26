<template>

  <div id="main" style="width: 100%;height: calc(100vh - 50px);margin:0 auto;"  v-loading="loading"></div>
</template>

<script>
// import { hideLoading } from '@/utils/showLoading'

import { getPersonFangChanRelationtList } from '@/api/form'
import { getPersonRuZhuRelationtList } from '@/api/form'
import { getPersonChengZuoRelationtList } from '@/api/form'
import { getPersonHuJiRelationtList } from '@/api/form'
import { getPersonHunYinRelationtList } from '@/api/form'
import { getPersonWeiZhangRelationtList } from '@/api/form'
import { getPersonJiDongCheRelationtList } from '@/api/form'
import { getPersonXiangGuanRenYuanRelationtList } from '@/api/form'
import { getPersonLianLuoYuanRelationtList } from '@/api/form'
import { getPersonFaDingRelationtList } from '@/api/form'
import { getPersonCaiWuRelationtList } from '@/api/form'
import { getPersonYinHangChiKaRelationtList } from '@/api/form'
import { getPersonTongXunJiZhuRelationtList } from '@/api/form'
import { getPersonCallRelationtList } from '@/api/form'
import { getCoPersonRelationList } from '@/api/form'


import { personFangChanRelationtListHandler } from '@/utils/kg/kgListResultHandler'
import { personHuJiRelationtListHandler } from '@/utils/kg/kgListResultHandler'
import { personChengZuoRelationtListHandler } from '@/utils/kg/kgListResultHandler'
import { personRuZhuRelationtListHandler } from '@/utils/kg/kgListResultHandler'
import { personHunYinRelationtListHandler } from '@/utils/kg/kgListResultHandler'
import { personWeiZhangRelationtListHandler } from '@/utils/kg/kgListResultHandler'
import { personJiDongCheRelationtListHandler } from '@/utils/kg/kgListResultHandler'
import { personXiangGuanRenYuanRelationtListHandler } from '@/utils/kg/kgListResultHandler'
import { personJiGouRelationtListHandler } from '@/utils/kg/kgListResultHandler'
import { personYinHangChiKaRelationtListHandler } from '@/utils/kg/kgListResultHandler'
import { personTongXunJiZhuRelationtListHandler } from '@/utils/kg/kgListResultHandler'
import { personCallRelationtListHandler } from '@/utils/kg/kgListResultHandler'

import { coPersonRelationtListHandler } from '@/utils/kg/kgListResultHandler'
import { nodeCategory } from '@/utils/kg/kgListResultHandler'
const echarts = require('echarts')

export default {
  name: 'KGEcharts',
  data() {
    return {
      option: null,
      list: null,
      nodeList:[],
      relationList:[],
      projectId: 'test_230131093423588',
      limit: 1,
      // 等待遮罩
      loading: false
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    fetchData() {
      var myChart = echarts.init(document.getElementById('main'));

      this.loading = true
      console.log('获取人物-房产关系数据')
      getPersonFangChanRelationtList().then(response => {
        this.list = response.data
        this.option = personFangChanRelationtListHandler(this.list,this.option)
        myChart.setOption(this.option)
        this.loading = false
      })


      console.log('获取人物-入住关系数据')
      getPersonRuZhuRelationtList().then(response => {
        this.list = response.data
        this.option = personRuZhuRelationtListHandler(this.list,this.option)
        myChart.setOption(this.option)
        this.loading = false
      })

      console.log('获取人物-乘坐关系数据')
      getPersonChengZuoRelationtList().then(response => {
        this.list = response.data
        this.option = personChengZuoRelationtListHandler(this.list,this.option)
        myChart.setOption(this.option)
        this.loading = false
      })

      // return

      console.log('获取人物-户籍关系数据')
      getPersonHuJiRelationtList().then(response => {
        this.list = response.data
        this.option = personHuJiRelationtListHandler(this.list,this.option)
        myChart.setOption(this.option)
        this.loading = false
      })

      console.log('获取人物-婚姻关系数据')
      getPersonHunYinRelationtList().then(response => {
        this.list = response.data
        this.option = personHunYinRelationtListHandler(this.list,this.option)
        myChart.setOption(this.option)
        this.loading = false
      })

      console.log('获取人物-违章关系数据')
      getPersonWeiZhangRelationtList().then(response => {
        this.list = response.data
        this.option = personWeiZhangRelationtListHandler(this.list,this.option)
        myChart.setOption(this.option)
        this.loading = false
      })
      console.log('获取人物-机动车关系数据')
      getPersonJiDongCheRelationtList().then(response => {
        this.list = response.data
        this.option = personJiDongCheRelationtListHandler(this.list,this.option)
        myChart.setOption(this.option)
        this.loading = false
      })
      console.log('获取人物-机构相关人员关系数据')
      getPersonXiangGuanRenYuanRelationtList().then(response => {
        this.list = response.data
        this.option = personXiangGuanRenYuanRelationtListHandler(this.list,this.option)
        myChart.setOption(this.option)
        this.loading = false
      })
      console.log('获取联络员-机构关系数据')
      getPersonLianLuoYuanRelationtList().then(response => {
        this.list = response.data
        this.option = personJiGouRelationtListHandler(this.list,this.option)
        myChart.setOption(this.option)
        this.loading = false
      })
      console.log('获取法定代表人-机构关系数据')
      getPersonFaDingRelationtList().then(response => {
        this.list = response.data
        this.option = personJiGouRelationtListHandler(this.list,this.option)
        myChart.setOption(this.option)
        this.loading = false
      })
      console.log('获取财务负责人-机构关系数据')
      getPersonCaiWuRelationtList().then(response => {
        this.list = response.data
        this.option = personJiGouRelationtListHandler(this.list,this.option)
        myChart.setOption(this.option)
        this.loading = false
      })
      console.log('获取人物-通讯机主数据')
      getPersonTongXunJiZhuRelationtList().then(response => {
        this.list = response.data
        this.option = personTongXunJiZhuRelationtListHandler(this.list,this.option)
        myChart.setOption(this.option)
        this.loading = false
      })

      console.log('获取通讯机主-通讯机主数据')
      getPersonCallRelationtList(this.projectId,this.limit).then(response => {
        this.list = response.data
        this.option = personCallRelationtListHandler(this.list,this.option)
        myChart.setOption(this.option)
        this.loading = false
      })

      console.log('获取人物-银行持卡关系数据')
      getPersonYinHangChiKaRelationtList().then(response => {
        this.list = response.data
        this.option = personYinHangChiKaRelationtListHandler(this.list,this.option)
        myChart.setOption(this.option)
        this.loading = false
      })

      console.log('获取人物-人物关系数据，即共同**人关系')
      getCoPersonRelationList().then(response => {
        var responseData = response.data
        this.option = coPersonRelationtListHandler(responseData,this.option)
        myChart.setOption(this.option)
      })
    }
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
        })
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

    this.fetchData()

  }
}
</script>

<style scoped>
:-webkit-full-screen {
  /* properties */
  background-color: white;
}

:-moz-full-screen {
  /* properties */
  background-color: white;
}

:-ms-fullscreen {
  /* properties */
  background-color: white;
}

:full-screen { /*pre-spec */
  /* properties */
  background-color: white;
}

:fullscreen { /* spec */
  /* properties */
  background-color: white;
}

</style>
