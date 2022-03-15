<template>
<el-card>
    <el-row class="header" :gutter="20">
      <el-col :span="12">
        <el-input prefix-icon="Search"  clearable :placeholder="$t('button.search')"></el-input>
      </el-col>      
        <el-button type="primary" :icon="Search">{{ $t('button.search') }}</el-button>
        <el-button type="primary" :icon="Refresh" @click="handleRefresh">{{ $t('button.refresh') }}</el-button>
        <el-button type="danger" :icon="Plus" @click="handleAdd">{{ $t('button.add') }}</el-button>
    </el-row>
    <el-table     
      height="75vh"
      ref="deptTable"       
      row-key="id"  
      :data="tabData"
      style="width: 100%;"
      :header-cell-style="{textAlign:'center'}"
      :load="load"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      border
      lazy
      resizable
    >
      <el-table-column      
        v-for="(item, index) in tabDeptColumns" :key="index"     
        :align="item.align" 
        :prop="item.prop" 
        :label="$t(`deptPage.table.${item.label}`)" 
        :width="item.width">  

        <template v-slot="{ row }" v-if="item.prop === 'status'">
          <el-switch v-model='row.status' />
        </template>

        <template #default="{row}" v-else-if="item.prop === 'action'">
          <el-button size="small" type="warning" :icon="Edit" @click="handleEdit(row)"
            >{{ $t('button.edit') }}</el-button>
          <el-button size="small" type="danger" :icon="Delete" @click="handleDelete(row)"
            >{{ $t('button.delete') }}</el-button>
          <!-- <el-button size="small" type="primary" :icon="Refresh" @click="handleRefresh()"
            >{{ $t('button.refresh') }}</el-button> -->
        </template>

      </el-table-column>
    </el-table>
    <el-config-provider :locale="locale">
      <el-pagination
        v-model:currentPage="page"
        :page-sizes="[5, 10, 15, 20, 25, 30, 50, 100, 200]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-config-provider>
  </el-card>
  <AddDepartment v-model="addDialog" v-if="addDialog" @getDeptFirst="getDeptFirst"/>
  <EditDepartment v-model="editDialog" v-if="editDialog" />
</template>

<script lang="ts" setup>
  import locale from 'element-plus/lib/locale/lang/zh-cn' //引入中文
  import { onBeforeMount, onMounted, reactive, ref, provide, computed } from  'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import axios from 'axios'
  import { api } from '../../api/department'
  import { IDepartment } from '../../ts/Department/type'
  import { tabDeptColumns } from '../../ts/Department/tabDeptColumns'
  import {
    Edit,
    Delete,
    Search,
    Plus,
    Refresh
  } from '@element-plus/icons-vue'
  import AddDepartment from '@/views/Department/AddDepartment.vue'
  import EditDepartment from '@/views/Department/EditDepartment.vue'

  let tableExpandData: Array<string> = reactive([])
  let total = ref(0)
  let page = ref(1)
  let limit = ref(10)
  let tableData: Array<IDepartment> = reactive([])
  let addDialog = ref(false)
  let editDialog = ref(false) 
  let editRow:IDepartment | any = ref({}) 
  let isLoading = ref(false)  // 关键，变量isLoading在computed中使用，解决computed不支持异步   
    
  provide('editRow', editRow)

  const tabData:IDepartment[] | any = computed(() => {
    if(isLoading.value) {  
      isLoading.value = false     
      return tableData.slice((page.value - 1) * limit.value, (page.value * limit.value)) 
    } else {
      isLoading.value = false
      return
    }
  })

  const getDeptFirst = async () => {  
    const { status, data } = await api.findFirst('/base/dept/findFirst')     
    tableData = data
    total.value = tableData.length
    isLoading.value = true
  }

  const load = async (
    row: IDepartment, 
    treeNode: unknown,
    resolve: (pid: IDepartment[]) => void) => {
      const { status, data } = await api.findByPid('/base/dept/findByPid', {pid: row.id})  
      return resolve(data)   
  }

  const handleRefresh = () => {
    getDeptFirst()
    isLoading.value = true
  }
  const handleSizeChange = (pageSize:number) => { // loadData()  // 后端分页就需要重载
    page.value = 1
    limit.value = pageSize  
    total.value = tableData.length
    isLoading.value = true
  }

  const handleCurrentChange = (pageNun:number) => {
    page.value = pageNun
    total.value = tableData.length
    isLoading.value = true
  }

  const handleAdd = () => {
    addDialog.value = true
  }

  const handleEdit = (currentRow: IDepartment) => {
    editRow.value = currentRow // JSON.parse(JSON.stringify(currentRow))     
    editDialog.value = true
  }

  const handleDelete = async (row: IDepartment) => {
    const { status, data } = await api.findByPid('/base/dept/findByPid', {pid: row.id})  
    if(data.length > 0){
      ElMessage({
        showClose: true,
        message: '请先删除子级部门!',
        type: 'error'
      })
      return
    }
    ElMessageBox.confirm(
      '确定要删除记录吗?',
      '',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        cancelButtonClass: 'btnCancel',
        confirmButtonClass:'btnConfirm'
        // draggable: true
      }).then(async () => {
        try {
          const res = await api.del('/base/dept/deleteById', {params: row.id})
          .then( () => {
            getDeptFirst()          
          })                
        } catch (err) {
          console.log(err);              
        }})
      .catch(() => {
          ElMessage({
          type: 'info',
          message: '取消操作',
        })
    })

  }

  onBeforeMount(() => {  
  })

  onMounted(()=>{  
  })

  // 相当于在created执行
  getDeptFirst()
</script>

<style lang="scss" >
  .header {
    padding-bottom: 18px;
    box-sizing: border-box;
  }
  
  .btnCancel {
    background: #409eff  !important;
    border-color: #409eff  !important;
    color: white;
  }
  .btnCancel:hover{
    background: #66b1ff  !important;
    border-color: #66b1ff  !important;
    color: white;
  }

  .btnConfirm{
    background: #f56c6c !important;
    border-color: #f56c6c !important;
  }
  .btnConfirm:hover{
    background: #f78989 !important;
    border-color: #f78989 !important;
  }
</style>

