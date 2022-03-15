<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="item in current" :key="item.path">
            <router-link :to="item.path">{{item.meta.title}}</router-link>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script lang="ts" setup>
import { watch, ref, Ref, onMounted } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'

import { useRoute, RouteLocationMatched } from 'vue-router'
const route = useRoute();

let current: Ref<RouteLocationMatched[]> = ref([])

const getBreadcrumb = (matched: Array<RouteLocationMatched>) => {
      if(matched.length == 2 && matched[1].name == 'Main'){
        current.value = [{path: '/home', meta: {title:'首页'}}  as any,
                         {path: '/home/main', meta: {title:''} as any}]
    } else{
        current.value = matched
    }
}
onMounted(() => {
    getBreadcrumb(route.matched)
})

watch(
    route,(to, from) => {        
        getBreadcrumb(to.matched)
    }
)

</script>

<style scoped>

</style>