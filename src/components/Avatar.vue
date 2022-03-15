<template>
    <el-dropdown>
    <span class="el-dropdown-link">
      
    <el-avatar :size="38" :src="avatar" @error="errorHandler">
        <img  src="@assets/images/avatar-err.png" />
    </el-avatar>
    </span>
    <template #dropdown>
        <el-dropdown-menu>    
            <el-dropdown-item @click="langClick">
                <el-icon><location-information /></el-icon>
                {{ $t('avatar.items.langBtn') }}
            </el-dropdown-item>            
            <el-dropdown-item @click="quitClick">
                <el-icon><switch-button /></el-icon>
                {{ $t('avatar.items.exitBtn') }}
            </el-dropdown-item>           
        </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import { useRouter } from 'vue-router'    
    import { useStore } from '../store/store'
    import i18nVue from '../i18n/i18nVue'
    import { messages } from '../i18n/i18nVue'

    const avatar = '/src/assets/images/avatar.png'
    const router = useRouter()
    const errorHandler = () => true

    const store = useStore()
    const langClick = () =>{
        i18nVue.global.locale.value = i18nVue.global.locale.value === 'zh' ? 'en' : 'zh'    // 切换语音
        store.commit('setMenuList', i18nVue.global.locale.value)                            // 菜单和路由放到store随语言切换而变化
    }

    const quitClick = () =>{
        // 处理store
        // 处理loaclstore
        // 跳转到登录页面
        router.push('/login')
    }
</script>

<style lang="scss" scoped>
    .el-dropdown {    
        margin-left:auto;
        margin-right: 8px;
    }
</style>