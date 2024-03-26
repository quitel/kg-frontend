<template>

  <div id="main" style="width: 100%;height: calc(100vh - 50px);margin:0 auto;"></div>
</template>

<script>
// import { hideLoading } from '@/utils/showLoading'

const echarts = require('echarts')

export default {
  name: 'KGEchartsCSDN',
  data() {
    return {}
  },
  mounted() {
    var myChart = echarts.init(document.getElementById('main'));
    var categories = [];
    for (var i = 0; i < 2; i++) {
      categories[i] = {
        name: '类目' + i
      };
    }
    let option = {
      // 图的标题
      title: {
        text: 'ECharts 关系图'
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
            console.log('节点:'+params.data.name)
            return '节点:'+params.data.name;//返回标签
          }else {//如果触发边
            console.log('关系:'+params.data.name)
            return '关系:'+params.data.name;
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
        edgeSymbolSize: [2, 10],
        force: {
          repulsion: 2500,
          edgeLength: [10, 50]
        },
        draggable: true,
        lineStyle: {
          normal: {
            width: 2,
            color: '#4b565b',
          }
        },
        edgeLabel: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 20
            },
            formatter: function (x) {
              return x.data.name;
            }
          }
        },
        label: {
          normal: {
            show: true,
            textStyle: {}
          }
        },

        // 数据
        data: [{
          // id只能是string类型，int类型有问题
          id: '1',
          name: "主体人1",
          age: 12,
          des: 'nodedes01',
          symbolSize: 70,
          category: 0,
          //可以根据节点类别，设置不同颜色
          itemStyle: {
            color: "#3fb1e3",
          },
          symbol:'image://'+require('../../../../public/img/person.svg')
        }, {
          id: '2',
          name: 'node02',
          age: 13,
          des: 'nodedes02',
          symbolSize: 50,
          category: 1,
          itemStyle: {
            color: "#981234"
          },
        }, {
          id: '3',
          name: 'node03',
          age: 23,
          des: 'nodedes3',
          symbolSize: 50,
          category: 1,
        }, {
          id: '4',
          name: 'node04',
          age: 32,
          des: 'nodedes04',
          symbolSize: 50,
          category: 1,
          symbol:'image://'+require('../../../../public/img/person.svg')
        }, {
          id: '5',
          name: 'node05',
          age: 45,
          des: 'nodedes05',
          symbolSize: 50,
          category: 1,
        }, {
          id: '6',
          name: 'node06',
          des: 'nodedes06',
          symbolSize: 50,
          category: 1,
        }],
        links: [{
          id: '11',
          source: '1',
          target: '2',
          name: 'link01',
          des: 'link01des'
        }, {
          id: '12',
          source: '1',
          target: '3',
          name: 'link02',
          des: 'link02des'
        }, {
          id: '13',
          source: '1',
          target: '4',
          name: 'link03',
          des: 'link03des'
        }, {
          id: '14',
          source: '1',
          target: '5',
          name: 'link04',
          des: 'link05des'
        }, {
          id: '15',
          source: '5',
          target: '6',
          name: 'link05',
          des: 'link06des'
        }, {
          id: '16',
          source: '4',
          target: '6',
          name: 'link07',
          des: 'link07des'
        }],
        categories: categories,
      }]
    };
    myChart.setOption(option);

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
