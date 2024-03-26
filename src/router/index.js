import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import {getHeFaInfo} from "@/api/doubtMining";
import es from "element-ui/src/locale/lang/es";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/error',
    component: () => import('@/views/error/index'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/labelDetail',
    children: [{
      path: 'labelDetail',
      name: 'LabelDetail',
      component: () => import('@/views/labelDetail/index'),
      meta: { title: 'labelDetail', icon: 'labelDetail' }
    }]
  },
  {
    path: '/echarts',
    component: Layout,
    redirect: '/echarts/pie',
    name: 'Echarts图表',
    meta: { title: '图谱展示', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'pie',
        name: 'pie',
        component: () => import('@/views/echarts/example/PieEcharts'),
        hidden: true,
        meta: { title: '饼图示例', icon: 'table' }
      },
      {
        path: 'bar',
        name: 'bar',
        component: () => import('@/views/echarts/example/BarEcharts'),
        hidden: true,
        meta: { title: '直方图示例', icon: 'tree' }
      },
      {
        path: 'kg1',
        name: 'kg1',
        component: () => import('@/views/echarts/kg/KGEchartsCSDN'),
        hidden: true,
        meta: { title: '关系图示例', icon: 'el-icon-share' }
      },
      {
        path: 'kg2',
        name: 'kg2',
        component: () => import('@/views/echarts/kg/KGEcharts'),
        meta: { title: '知识图谱', icon: 'el-icon-share' }
      }
    ]
  },
  {
    path: '/kg',
    component: Layout,
    redirect: '/kg/doubtMining',
    name: 'Echarts图表',
    meta: { title: '疑点推送', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'pullData/userId/:userId/projectId/:projectId',
        name: 'pullData',
        component: () => import('@/views/echarts/kg/pullData'),
        meta: { title: '拉取数据', icon: 'el-icon-share' }
      },
      {
        path: 'doubtMining/userId/:userId/projectId/:projectId',
        name: 'doubtMining',
        component: () => import('@/views/echarts/kg/doubtMining'),
        meta: { title: '疑点推送', icon: 'el-icon-share' },
        beforeEnter:(to, from, next) => {
          if (to.name === 'doubtMining') {
            getHeFaInfo(to.params.userId,to.params.projectId).then(response => {
              if(response.data==true){
                next();
              }
              else{
                router.push("/error")
              }
            })
          }else {
            next();
          }
        }
      }
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '列表展示', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'personVertexList',
        name: 'Table',
        component: () => import('@/views/table/personVertextTable'),
        meta: { title: '主体人列表', icon: 'table' }
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        hidden: true,
        meta: { title: '表格', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        hidden: true,
        meta: { title: '树形结构', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    redirect: 'form/addPersonVertex',
    name: '数据导入',
    meta: { title: '表单样例', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        hidden: true,
        meta: { title: '表单', icon: 'form' }
      },
      {
        path: 'uploadExcel',
        name: '数据导入',
        component: () => import('@/views/form/uploadExcel'),
        meta: { title: '数据导入', icon: 'form' }
      }
    ]
  },

  {
    path: '/form/generateData',
    component: Layout,
    redirect: 'form/generateData',
    name: '数据导入',
    meta: { title: '表单样例', icon: 'el-icon-s-help' },
    children: [
      {
        path: '',
        name: '生成数据',
        component: () => import('@/views/form/generateData'),
        meta: { title: '生成数据', icon: 'form' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '打开外部链接', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

// router.beforeEach((to, from, next) => {
//   console.log(to)
//   if (to.name === 'doubtMining') {
//     getHeFaInfo(to.params.userId,to.params.projectId).then(response => {
//       if(response.data==true){
//         next();
//       }
//       else{
//         router.push("/error")
//       }
//     })
//   }else {
//     next();
//   }
// });

export default router
