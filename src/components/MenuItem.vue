<template>
  <template v-for="item in menuList" :key="item.meta.id">
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path" >
      <template #title>
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <span>{{item.meta.title}}</span>
      </template>
      <!-- 递归 -->
      <menu-item :menuList="item.children"></menu-item>
    </el-sub-menu>
    <el-menu-item v-else :index="item.path" :key="item.meta.id">
        <el-icon><component :is="item.meta.icon"></component></el-icon>
        <template #title>
          <span>{{item.meta.title}}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
defineProps(['menuList'])

</script>

<style lang="scss" scoped>

</style>
