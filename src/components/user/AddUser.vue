<template>

  <el-dialog 
    :model-value="`{{dialogVisible}}`" 
    :title="$t('userPage.addDialog.titleAdd')" width="30%" 
    :show-close="false"
    :destroy-on-close="true">    
    <template #default>
       <el-form ref="addUserForm" :model="user" :rules="formRules" label-width="80px">
        <el-form-item :label="$t('userPage.addDialog.code')" prop="code">
          <el-input v-model="user.code" clearable :placeholder="$t('userPage.addDialog.code')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('userPage.addDialog.name')" prop="name">
          <el-input v-model="user.name" clearable :placeholder="$t('userPage.addDialog.name')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('userPage.addDialog.passwd')" prop="passwd">
          <el-input v-model="user.passwd" clearable show-password :placeholder="$t('login.form.passwd')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('userPage.addDialog.empId')" prop="empId">
          <el-input v-model="user.empId" clearable :placeholder="$t('userPage.addDialog.empId')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('userPage.addDialog.deptCode')" prop="deptCode">
          <el-input v-model="user.deptCode" clearable :placeholder="$t('userPage.addDialog.deptCode')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('userPage.addDialog.deptName')" prop="deptName">
          <el-input v-model="user.deptName" clearable :placeholder="$t('userPage.addDialog.deptName')"></el-input>
        </el-form-item>
      </el-form>
    </template>
   
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel()">{{$t('button.cancel')}}</el-button>
        <el-button type="primary" @click="handleOk(addUserForm, user)">{{$t('button.ok')}}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { ElForm } from 'element-plus'
  import { IUser } from '../../views/user/type'

  const emits = defineEmits(['update:modelValue'])
  // defineProps([])
  const handleCancel = () => {
    emits('update:modelValue', false)
  }
  
  const handleOk = (form: FormInstance | undefined, user: IUser) => {
    if (!form) return
    form.validate((valid) => {
      if (valid) {
        console.log('通过验证')
        handleCancel()
      } else {
        console.log('验证失败')
        return
      }
    })

    
  }

type FormInstance = InstanceType<typeof ElForm>
const addUserForm = ref<FormInstance>()
let user:IUser = reactive({
  code: '',
  name: '',
  passwd: '',
  empId: '',
  deptCode: '',
  deptName: ''
})

const formRules = reactive({  
  code: [{
          required: true,
          min: 3,
          max: 8,
          message: '用户编码至少3个字符，最多8个字符',
          trigger: ['blur', 'change'],
        }],
  name: [{
      required: true,
      min: 3,
      max: 8,
      message: '用户名至少3个字符，最多8个字符',
      trigger: ['blur', 'change'],
    }],
  passwd: [{
            required: true,
            min: 8,
            max: 18,
            message: '密码至少8个字符，最多18个字符',
            trigger: ['blur', 'change'],
          }],
  deptCode: [{
            required: true,
            message: '请选择部门',
            trigger: 'blur',
          }]
})

</script>

<style lang="scss">
  .el-dialog__header{
    background-color: #409EFF
  }
</style>