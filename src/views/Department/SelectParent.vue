<template>
  <el-dialog :model-value="`{{selectDialog}}`" 
  append-to-body
  width="25%" 
  :show-close="false"
  :destroy-on-close="true">    
    <template #title>
      <el-icon><LinkIcon /></el-icon>
      <span>{{$t('dialog.title.select')}}</span>
    </template>
    <template #default>
      <el-tree             
        :default-expanded-keys="treeExpandData"
        node-key="id"
        :props="props" 
        :load="loadNode" 
        lazy 
        accordion
        @node-click="handleNodeClick">
      </el-tree> 
    </template>
   
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="handleCancel()">{{$t('button.cancel')}}</el-button>
        <el-button type="primary" @click="handleOk()">{{$t('button.ok')}}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import {
    Edit,
    Link as LinkIcon
  } from '@element-plus/icons-vue'
  import type Node from 'element-plus/es/components/tree/src/model/node'
  import axios from 'axios'
  import { api } from '../../api/department'
  // import { CodegenContext } from '@vue/compiler-core'
  import { IDepartment } from '../../ts/Department/type'

  interface Tree {
    id: string
    code: string
    name: string
    hasChildren: boolean
  }

  let treeExpandData:string[] = reactive([])
  let nodeData:IDepartment[] = reactive([])

  const props = {
    id: 'id',
    code: 'code',
    label: (nodeData:IDepartment) => {
      return nodeData.code + '    ' + nodeData.name
    },
    isLeaf: (nodeData:IDepartment) => {
      return !nodeData.hasChildren
    }
  }

  const getDeptFirst = async () => {  
    const { status, data } = await api.findTop('/base/dept/findTop')   
    nodeData.push(data)  
    treeExpandData.push(nodeData[0].id) // 只展开第一级，注意：必须设置node-key="id"
  }

  const loadNode = async (node: Node, resolve: (data: Tree[]) => void) => {    
    if (node.level === 0) {
      return resolve(nodeData)
    } else {
      if(node.data.hasChildren) {     
        const { status, data } = await api.findByPid('/base/dept/findByPid', {pid: node.data.id})
        if (status === 200) return resolve(data)  
      }       
      return resolve([]) 
    }
  }

  const emits = defineEmits(['update:modelValue','onUpdate:parent'])
  const handleCancel = () => {
    emits('update:modelValue', false)
  }
  
  const handleNodeClick = (nodeData: Tree, treeNode: Tree, c: any) => {
    console.log(nodeData.id + '  ' + nodeData.name)
    emits('onUpdate:parent', [nodeData.id, nodeData.name])
  }
  
  const handleOk = () => {
    console.log(nodeData)
    // emits('update:parent', [nodeData.id, nodeData.name])
    handleCancel()    
  }
  
  // 初始加载
  getDeptFirst()
  // emits('getDeptFirst')
</script>

<style lang="scss" >
  .el-dialog__header{
    display: flex;
    align-items: center;
    color: white;
    background-color: #409EFF;
    padding: 10px 5px 10px 5px;
  }

  .el-tree-node:focus > .el-tree-node__content {
    background-color: #d9ecff !important;
  }


</style>