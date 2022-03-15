<template>
  <Logo v-if="!isCollapse" />
  <el-menu
    :default-active="activeRoute"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    text-color="#fff"
    active-text-color="#409EFF"
    background-color="#001529"
    @open="handleOpen"
    @close="handleClose"      
    router
  >
    <MenuItem :menuList="menuList"/>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '../store/store'
import { useRoute } from 'vue-router'
import { i18nVue } from '../i18n/i18nVue'
import { messages } from '../i18n/i18nVue'
import Logo from '@components/Logo.vue'
import MenuItem from '@components/MenuItem.vue'
// 获取当前路由，保证刷新后页面还在原来的路由
const route = useRoute()
const activeRoute = computed(() => {
  const { path } = route
  return path
})

// 菜单是否展开控制
const store = useStore()
const isCollapse = computed(() => {
  return store.getters['getIsCollapse']
})

// ------------菜单------------ 把菜单和路由放到store随语言切换而变化
const menuList = computed(() => {
  return store.getters['getMenuList']
})

const handleOpen = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
}

</script>

<style lang="scss" scoped>
</style>
<style lang="scss">
  // 这里如果加了scoped，菜单样式将不起作用
  .el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  }
  .el-menu {
    border-right: none;
  }

  .el-menu-item:hover{
    color: #000;
    background-color:#409EFF;
  }

   .el-sub-menu__title:hover{
    color: #000;
    background-color:#409EFF;
  }
</style>


