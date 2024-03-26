<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>

html,body,#app{
  height: 100%;
}
#app .sidebar-container.has-logo .el-scrollbar {
  overflow-x: hidden;
}
#app .hideSidebar .main-container {
  margin-left:0px;
}
</style>
