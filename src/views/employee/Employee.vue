<template>
  <el-card>
    <el-row class="header" :gutter="20">
      <el-col :span="12">
        <el-input prefix-icon="User"  clearable :placeholder="$t('button.search')"></el-input>
      </el-col>      
      <el-button type="primary" :icon="Search">{{ $t('button.search') }}</el-button>
      <el-button type="primary" :icon="Plus" @click="handleDialog">{{ $t('button.add') }}</el-button>
      <el-button type="primary" :icon="Refresh" @click="handleRefresh">{{ $t('button.refresh') }}</el-button>
    </el-row>
    <el-table class="table"
      :data="tabData"
      :stripe="true"
      :highlight-current-row="true"
      :border="true"  
      style="width: 100%"
      :header-cell-style="{textAlign:'center'}"       
      >
      <el-table-column v-for="(item, index) in tabEmployeeColumns" :key="index"
       :align="item.align" :prop="item.prop" :label="$t(`employeePage.table.${item.label}`)" :width="item.width"> 
       
      <template v-slot="{ row }" v-if="item.prop === 'status'">
        <el-switch v-model='row.status' />
      </template>

      <template #default v-else-if="item.prop === 'action'">
        <el-button size="small" type="warning" :icon="Edit" @click="handleEdit()"
          >{{ $t('button.edit') }}</el-button>
        <el-button size="small" type="danger" :icon="Delete" @click="handleDelete()"
          >{{ $t('button.delete') }}</el-button>
      </template>
      </el-table-column>
     
    </el-table>
    <el-config-provider :locale="locale">
      <el-pagination
        v-model:currentPage="page"
        :page-sizes="[5, 10, 15, 20, 25]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </el-config-provider>

  </el-card>
  <AddUser v-model="dialogVisible" />
</template>

<script lang="ts" setup>
import locale from 'element-plus/lib/locale/lang/zh-cn' //引入中文
import { onBeforeMount, onMounted, reactive, ref, computed } from  'vue'
import AddUser from '@components/user/AddUser.vue'
import { tabEmployeeColumns } from './tabEmployeeColumns';
import { IUser } from './type';
 
import {
  Edit,
  Delete,
  Search,
  Plus,
  Refresh
} from '@element-plus/icons-vue'

let total = ref(0)
let page = ref(1)
let limit = ref(10)
let empData = reactive([{}])
const dialogVisible = ref(false)
const loadData = () => {  
  // data = user
  total.value = empData.length
}

const tabData = computed(() => {
  return empData.slice((page.value - 1) * limit.value, (page.value * limit.value)) 
})
const handleSizeChange = (pageSize:number) => {
  page.value = 1
  limit.value = pageSize
  // loadData()  // 后端分页就需要重载
  total.value = empData.length
}

const handleCurrentChange = (pageNun:number) => {
  page.value = pageNun
  // loadData()  // 后端分页就需要重载  
  total.value = empData.length
}

const handleDialog = () => {
  dialogVisible.value = true
}

const handleEdit = (index: number, row: any) => {
  console.log(index, row)
}

const handleDelete = () => {

}
const handleRefresh = () => {

}

onBeforeMount(() => {
  loadData()  
  total.value = empData.length
})

onMounted(()=>{  
  console.log(total.value)
})


//

</script>

<!-- scoped -->
<style lang="scss" >
  .header {
    padding-bottom: 18px;
    box-sizing: border-box;
  }

  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: #FFF !important;
    background-color: #d9ecff !important;
  }
  // .table {
  //   height: 60vh;
  // }
</style>
