<template>
  <el-container class="layout">
    <el-aside class="aside" width="auto">
      <MenuBar />
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header />
      </el-header>
      <el-main class="main">
        <Tabs />
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import MenuBar from '@components/MenuBar.vue'
import Header from '@components/Header.vue'
import Tabs from '@components/Tabs.vue'
</script>

<style lang="scss" scoped>
  .layout {
    height: 100vh;
    width: 100vw;
    background-color: #fff;
    .aside {      
      width: auto;
      background-color: #001529;      
      /* 侧边栏折叠动画速度 */
      transition: width 5.75s;
      -webkit-transition: width 5.75s;
      -moz-transition: width 5.75s;
      -webkit-transition: width 5.75s;
      -o-transition: width 5.75s;
    } 
    .header {
      position: relative;
      display: inline-flex;
      height: 50px;
      align-items: center;
      border-bottom: 1px solid #e5e5e5;
      padding: 5px;
    } 

    .main {
      padding: 2px 8px 2px 8px;
      background-color:#fff;
    }
  }
</style>
