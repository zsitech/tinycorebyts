<template>
     <el-tabs
    v-model="activeTab"
    type="card"
    class="demo-tabs"
    closable
    @tab-click="tabClick"
    @tab-remove="removeTab"
  >
    <el-tab-pane
      v-for="tab in tabs"
      :key="tab.path"
      :label="tab.title"
      :name="tab.path"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useStore } from '../store/store';
import { useRoute, useRouter } from 'vue-router';
import { ITab } from '../store/type'

const store = useStore()
const route = useRoute()
const router = useRouter()

// 获取选项卡
const tabs = computed(() => {
    return store.getters['getTabs']
})

// 设置当前激活的选项卡
const activeTab = ref('')
const setActiveTab= () =>{
    activeTab.value = route.path
}

// 添加选项卡
const addTab = () => {
    const { path, meta } = route // 从路由获取
    // console.log('路径' + path) //  || meta.title === '首页'
    if(meta.title === '登录') return   // 排除login和home，注意：不是HomeDefault
    const tab: ITab = {
        path: path,
        title: meta.title as string
    }
    store.commit('addTab', tab)
}

watch(() => route.path, () => {
    setActiveTab()  // tab选中是根据当前路由决定的
    addTab()        // 有新的路由，就加入tabs
})

onMounted(()=> {    
    saveBeforeRefresh()
    setActiveTab()
    addTab()
})

// 点击选项卡
const tabClick = (tab: any) => {
    const { props } = tab
    // router.push({path:props.name})
    router.push(props.name)
}

// 移除选项卡
const removeTab = (targetName: string) => {
    console.log('选项卡' + targetName)
    if( targetName === '/' || targetName === '/home') return // 保留首页不删除
    
    const tabList = tabs.value
    let tabPath = activeTab.value
    if (tabPath === targetName) {
        tabList.forEach((tab: ITab, index: number) => {
        if (tab.path === targetName) {
            const nextTab = tabList[index + 1] || tabList[index - 1]
            if (nextTab) { 
            tabPath = nextTab.path
            }
        }
        })
    }
    activeTab.value = tabPath // 设置新的激活tab
    store.state.tabs = tabList.filter((tab:ITab) => tab.path !== targetName) // 更新store
    router.push(tabPath)  // 路由到新的tab
}

// 处理刷新丢失非激活选项卡，放到onMounted生命周期里
const saveBeforeRefresh = () => {
    window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('myTabs', JSON.stringify(tabs.value))
    })

    let myTabsSession = sessionStorage.getItem('myTabs')
    if(myTabsSession){
        let old = JSON.parse(myTabsSession)
        if(old.length > 0){
            store.state.tabs = old
        }
    }
}
</script>

<style lang="scss"> // 注意：这里不能加scoped
    // .el-tabs--card>.el-tabs__header .el-tabs__item.is-active.is-closable
    .el-tabs__item.is-active.is-closable {
        color: #000;
        background-color: #409EFF
    }
</style>