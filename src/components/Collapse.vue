
<template>
    <el-icon size="24px" @click="btnClick"><component  :is="isCollapse ? 'Expand' : 'Fold'"></component></el-icon>
</template>

<script lang="ts" setup>
    import { computed } from "vue"
    import { useStore } from "../store/store"

    const store = useStore()
    const isCollapse = computed(() => {
        return store.getters['getIsCollapse']
    })

    const btnClick = () => {
        store.commit('setIsCollapse', !isCollapse.value)
    }
</script>

<style lang="scss" scoped>
    .el-icon {
        display: inline-flex;
        cursor: pointer;
    }
</style>