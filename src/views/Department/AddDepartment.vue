<template>
  <el-dialog :model-value="`{{dialog}}`"  
  width="20%" 
  :show-close="false"
  :destroy-on-close="true">    
    <template #title>
      <el-icon><plus /></el-icon>
      <span>{{$t('dialog.title.add')}}</span>
    </template>

    <template #default>
      <SelectParent v-model="selectDialog" />
      <el-form ref="addDepartmentForm" :model="addForm" :rules="formRules" label-width="90px">
      <el-form-item :label="$t('deptPage.dialog.code')" prop="code">
        <el-input v-model="addForm.code" clearable :placeholder="$t('deptPage.dialog.code')" @input="addForm.code = addForm.code.toUpperCase()"></el-input>
      </el-form-item>
      <el-form-item :label="$t('deptPage.dialog.name')" prop="name">
        <el-input v-model="addForm.name" clearable :placeholder="$t('deptPage.dialog.name')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('deptPage.dialog.description')" prop="description">
        <el-input v-model="addForm.description" clearable :placeholder="$t('deptPage.dialog.description')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('deptPage.dialog.parent')" prop="pid">
        <el-row class="parent">
          <el-col :span="18">
            <el-input v-model="addForm.pid" value-key="addForm.code" clearable :placeholder="$t('deptPage.dialog.parent')"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button style="margin-left:5px;float:right;width:90%" @click="selectParent">{{$t('button.select')}}</el-button>
          </el-col>
        </el-row>    
      </el-form-item>
      <!-- <el-form-item :label="$t('deptPage.dialog.managerName')" prop="managerName">
        <el-input v-model="addForm.managerCode" clearable :placeholder="$t('deptPage.dialog.managerName')"></el-input>
      </el-form-item> -->
      <el-row>
        <el-col :span="12">
          <el-form-item :label="$t('deptPage.dialog.status')" prop="status">
            <el-switch v-model='addForm.status' />
          </el-form-item>
        </el-col>
        <el-form-item :label="$t('deptPage.dialog.hasChildren')" prop="hasChildren">
          <el-switch v-model='addForm.hasChildren' />
        </el-form-item>
      </el-row>
    </el-form>
      
    </template>
   
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="handleCancel()">{{$t('button.cancel')}}</el-button>
        <el-button type="primary" @click="handleOk(addDepartmentForm, addForm)">{{$t('button.ok')}}</el-button>
      </span>
    </template>
    
  </el-dialog>
  
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { ElForm } from 'element-plus'
  import { IDepartment } from '../../ts/Department/type'
  import SelectParent from '@/views/Department/SelectParent.vue'
  import {
    Edit,
    Delete,
    Search,
    Plus
  } from '@element-plus/icons-vue'
  import axios from 'axios'
  import { api } from '../../api/department'

  const selectDialog = ref(false)
  const selectParent = () =>{
    selectDialog.value = true
  }

  const parent: Array<string> = reactive([])
  const addForm = reactive({
    id: '',
    pid: '3d20d401-b955-4e5b-9e6a-f44b52b4949d',
    code: '',
    name: '',
    description: '',
    status: true,    
    hasChildren: false
  })

  const emits = defineEmits(['update:modelValue','getDeptFirst'])
  const handleCancel = () => {
    emits('update:modelValue', false)
  }
  
  type FormInstance = InstanceType<typeof ElForm>
  const addDepartmentForm = ref<FormInstance>()
  const formRules = reactive({  
    code: [{
            required: true,
            min: 3,
            max: 8,
            message: '部门编码至少3个字符，最多8个字符',
            trigger: ['blur', 'change'],
          }],
    name: [{
        required: true,
        min: 3,
        max: 8,
        message: '部门名称至少3个字符，最多8个字符',
        trigger: ['blur', 'change'],
      }],
  })

  // const toUpperCase = () => {
  //   addForm.code = addForm.code.toUpperCase()
  // }
  const handleOk =  (form: FormInstance | undefined, addForm: IDepartment) => {
    if (!form) return
    form.validate(async (valid) => {
      if (valid) {
        console.log('通过验证')
        await api.add('/base/dept/add', {data: addForm}) 
        emits('getDeptFirst')
        handleCancel()
      } else {
        console.log('验证失败')
        return
      }
    })
  }
</script>

<style lang="scss">
  .el-dialog__header{
    display: flex;
    align-items: center;
    color: white;
    background-color: #409EFF;
    padding: 10px 5px 10px 5px;
  }

  .parent {
    display: flex;
    box-sizing: border-box;
  }
</style>