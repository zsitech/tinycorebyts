<template>
  <el-dialog :model-value="`{{editDialog}}`"  
  width="20%" 
  :show-close="false"
  :destroy-on-close="true">    
    <template #title>
      <el-icon><Edit /></el-icon>
      <span>{{$t('dialog.title.edit')}}</span>
    </template>

    <template #default>
      <SelectParent v-model="selectDialog" />
      <el-form ref="editDepartmentForm" :model="editForm" :rules="formRules" label-width="90px">
        <el-form-item :label="$t('deptPage.dialog.code')" prop="code">
          <el-input v-model="editForm.code" disabled clearable :placeholder="$t('deptPage.dialog.code')" @input="editForm.code = editForm.code.toUpperCase()"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deptPage.dialog.name')" prop="name">
          <el-input v-model="editForm.name" clearable :placeholder="$t('deptPage.dialog.name')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deptPage.dialog.description')" prop="description">
          <el-input v-model="editForm.description" clearable :placeholder="$t('deptPage.dialog.description')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('deptPage.dialog.parent')" prop="pid">
          <el-row class="parent">
            <el-col :span="18">
              <el-input v-model="editForm.pid" value-key="editForm.code" clearable :placeholder="$t('deptPage.dialog.parent')"></el-input>
            </el-col>
            <el-col :span="6">
              <el-button style="margin-left:5px;float:right;width:90%" @click="selectParent">{{$t('button.select')}}</el-button>
            </el-col>
          </el-row>    
        </el-form-item>
        <!-- <el-form-item :label="$t('deptPage.dialog.managerName')" prop="managerName">
          <el-input v-model="editForm.managerCode" clearable :placeholder="$t('deptPage.dialog.managerName')"></el-input>
        </el-form-item> -->
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('deptPage.dialog.status')" prop="status">
              <el-switch v-model='editForm.status' />
            </el-form-item>
          </el-col>
          <el-form-item :label="$t('deptPage.dialog.hasChildren')" prop="hasChildren">
            <el-switch v-model='editForm.hasChildren' />
          </el-form-item>
        </el-row>
      </el-form>
      
    </template>
   
    <template #footer>
      <span class="dialog-footer">
        <el-button type="danger" @click="handleCancel()">{{$t('button.cancel')}}</el-button>
        <el-button type="primary" @click="handleOk(editDepartmentForm, editForm)">{{$t('button.ok')}}</el-button>
      </span>
    </template>
    
  </el-dialog>
  
</template>

<script lang="ts" setup>
  import { reactive, ref, inject, watch } from 'vue'
  import type { ElForm } from 'element-plus'
  import { IDepartment } from '../../ts/Department/type'
  import SelectParent from '@/views/Department/SelectParent.vue'
  import {
    Edit,
    Search,
  } from '@element-plus/icons-vue'
  import axios from 'axios'
  import { api } from '../../api/department'

  const selectDialog = ref(false)
  const selectParent = () =>{
    selectDialog.value = true
  }

  const editRow:IDepartment | any = inject('editRow')

  const parent: Array<string> = reactive([])
  let editForm:IDepartment | any = reactive({})

  const emits = defineEmits(['update:modelValue'])

  const handleCancel = () => {    
    emits('update:modelValue', false)
  }
  
  type FormInstance = InstanceType<typeof ElForm>
  const editDepartmentForm = ref<FormInstance>()
  const formRules = reactive({  
    name: [{
        required: true,
        min: 3,
        max: 8,
        message: '部门名称至少3个字符，最多8个字符',
        trigger: ['blur', 'change'],
      }],
  })


  watch(
    () => editRow, () => {
      editForm = editRow
    },
    {deep: true, immediate: true}
  )

  const handleOk =  (form: FormInstance | undefined, editForm: IDepartment) => {
    if (!form) return
    form.validate(async (valid) => {
      if (valid) {
        console.log('通过验证')
        await api.update('/base/dept/update', {data: editForm}) 
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