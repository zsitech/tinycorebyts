<template>
  <el-card>
    <el-row class="header" :gutter="20">
      <el-col :span="12">
        <el-input prefix-icon="User"  clearable :placeholder="$t('button.search')"></el-input>
      </el-col>      
      <el-button type="primary" :icon="Search">{{ $t('button.search') }}</el-button>
      <el-button type="primary" :icon="Plus" @click="handleDialog">{{ $t('button.add') }}</el-button>
    </el-row>
    <el-table class="table"
      :data="tabData"
      :stripe="true"
      :highlight-current-row="true"
      :border="true"  
      style="width: 100%"
      :header-cell-style="{textAlign:'center'}"       
      >
      <!--  "{textAlign:'center'}"  等介 "{text-align:'center'}"    -->
      <el-table-column type="index" />
      <el-table-column v-for="(item, index) in tabColumns" :key="index"
       :align="item.align" :prop="item.prop" :label="$t(`userPage.table.${item.label}`)" :width="item.width"> 
       
      
      <!-- <template #default v-if="item.prop === 'userId' ? true : false">
      
      </template> -->

      <template v-slot="{ row }" v-if="item.prop === 'status'">
        <el-switch v-model='row.status' />
      </template>

      <template #default v-else-if="item.prop === 'action'">
        <el-button size="small" type="warning" :icon="Edit" @click="handleEdit()"
          >{{ $t('button.edit') }}</el-button>
        <el-button size="small" type="danger" :icon="Delete" @click="handleDelete()"
          >{{ $t('button.delete') }}</el-button>
          <el-button size="small" type="primary" :icon="Refresh" @click="handleDelete()"
            >{{ $t('button.refresh') }}</el-button>
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
import { tabColumns } from './tabUserColumns';
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
let data = reactive([{}])
const dialogVisible = ref(false)
const loadData = () => {  
  data = user
  total.value = user.length
}

const tabData = computed(() => {
  return data.slice((page.value - 1) * limit.value, (page.value * limit.value)) 
})
const handleSizeChange = (pageSize:number) => {
  page.value = 1
  limit.value = pageSize
  // loadData()  // 后端分页就需要重载
  total.value = user.length
}

const handleCurrentChange = (pageNun:number) => {
  page.value = pageNun
  // loadData()  // 后端分页就需要重载  
  total.value = user.length
}

const handleDialog = () => {
  dialogVisible.value = true
}

const handleEdit = (index: number, row: any) => {
  console.log(index, row)
}

const handleDelete = () => {

}

onBeforeMount(() => {
  loadData()  
  total.value = user.length
})

onMounted(()=>{  
  console.log(total.value)
})


//
const user = [
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0d', userCode: 'U0001', userName: 'Alan', empId: 'EMP0001', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0e', userCode: 'U0002', userName: 'Tesla', empId: 'EMP0002', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0f', userCode: 'U0003', userName: '蜥蜴人', empId: 'EMP0003', deptCode: 'D001', deptName: '制造一部', status: false},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0g', userCode: 'U0004', userName: '元宇宙', empId: 'EMP0004', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0d', userCode: 'U0005', userName: 'Alan', empId: 'EMP0005', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0e', userCode: 'U0006', userName: 'Tesla', empId: 'EMP0006', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0f', userCode: 'U0007', userName: '蜥蜴人', empId: 'EMP0007', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0g', userCode: 'U0008', userName: '元宇宙', empId: 'EMP0008', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0d', userCode: 'U0009', userName: 'Alan', empId: 'EMP0009', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0e', userCode: 'U0010', userName: 'Tesla', empId: 'EMP0010', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f1X', userCode: 'U0011', userName: '蜥蜴人', empId: 'EMP0011', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0g', userCode: 'U0012', userName: '元宇宙', empId: 'EMP0012', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0d', userCode: 'U0013', userName: 'Alan', empId: 'EMP0013', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0e', userCode: 'U0014', userName: 'Tesla', empId: 'EMP0014', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f2X', userCode: 'U0015', userName: '蜥蜴人', empId: 'EMP0015', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0g', userCode: 'U0016', userName: '元宇宙', empId: 'EMP0016', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0d', userCode: 'U0017', userName: 'Alan', empId: 'EMP0017', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0e', userCode: 'U0018', userName: 'Tesla', empId: 'EMP0018', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f2X', userCode: 'U0019', userName: '蜥蜴人', empId: 'EMP0019', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0g', userCode: 'U0020', userName: '元宇宙', empId: 'EMP0020', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0d', userCode: 'U0021', userName: 'Alan', empId: 'EMP0021', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0e', userCode: 'U0022', userName: 'Tesla', empId: 'EMP0022', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0f', userCode: 'U0023', userName: '蜥蜴人', empId: 'EMP0023', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f2X', userCode: 'U0024', userName: '元宇宙', empId: 'EMP004', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0d', userCode: 'U0025', userName: 'Alan', empId: 'EMP0025', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0e', userCode: 'U0026', userName: 'Tesla', empId: 'EMP0026', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0f', userCode: 'U0027', userName: '蜥蜴人', empId: 'EMP0027', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0g', userCode: 'U0028', userName: '元宇宙', empId: 'EMP0028', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0d', userCode: 'U0029', userName: 'Alan', empId: 'EMP0029', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0e', userCode: 'U0030', userName: 'Tesla', empId: 'EMP0030', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0f', userCode: 'U0031', userName: '蜥蜴人', empId: 'EMP0031', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f3X', userCode: 'U0032', userName: '元宇宙', empId: 'EMP0032', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0d', userCode: 'U0033', userName: 'Alan', empId: 'EMP0033', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0e', userCode: 'U0034', userName: 'Tesla', empId: 'EMP0034', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0f', userCode: 'U0035', userName: '蜥蜴人', empId: 'EMP0035', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f3X', userCode: 'U0036', userName: '元宇宙', empId: 'EMP0036', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0d', userCode: 'U0037', userName: 'Alan', empId: 'EMP0037', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0e', userCode: 'U0038', userName: 'Tesla', empId: 'EMP0038', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0f', userCode: 'U0039', userName: '蜥蜴人', empId: 'EMP0039', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0g', userCode: 'U0040', userName: '元宇宙', empId: 'EMP0040', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0d', userCode: 'U0041', userName: 'Alan', empId: 'EMP0041', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0e', userCode: 'U0042', userName: 'Tesla', empId: 'EMP0042', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0f', userCode: 'U0043', userName: '蜥蜴人', empId: 'EMP0043', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0g', userCode: 'U0044', userName: '元宇宙', empId: 'EMP0044', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0d', userCode: 'U0045', userName: 'Alan', empId: 'EMP0045', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f0e', userCode: 'U0046', userName: 'Tesla', empId: 'EMP0046', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f47', userCode: 'U0047', userName: '蜥蜴人', empId: 'EMP0047', deptCode: 'D001', deptName: '制造一部', status: true},
    {userId: '1984e5f4-a729-43f4-90a3-298945c84f48', userCode: 'U0048', userName: '元宇宙', empId: 'EMP0048', deptCode: 'D001', deptName: '制造一部', status: true},
  ]

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
