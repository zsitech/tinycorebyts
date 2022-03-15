<template>
  <div class="first">  
  </div>
  <div class="out">  
    <div class="wrap">
        <div class="cube">
            <div class="front"><img src="@images/html5.jpg" class="pic"></div>
            <div class="back"><img src="@images/html5.jpg" class="pic"></div>
            <div class="top"><img src="@images/html5.jpg" class="pic"></div>
            <div class="bottom"><img src="@images/html5.jpg" class="pic"></div>
            <div class="left"><img src="@images/html5.jpg" class="pic"></div>
            <div class="right"><img src="@images/html5.jpg" class="pic"></div>
        </div>
    </div>
    <div class="plane">
      <el-form class="el-form-login" ref="loginFormRef" :model="user" :rules="formRules">
        <h2 style="padding: 0 0 0 0;">{{ $t('login.title') }}</h2>
        <el-form-item prop="name">
          <el-input prefix-icon="User" v-model="user.name" clearable :placeholder="$t('login.form.user')"></el-input>
        </el-form-item>
        <el-form-item prop="passwd">
          <el-input prefix-icon="Lock" v-model="user.passwd" clearable show-password :placeholder="$t('login.form.passwd')"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" 
          @click="login(loginFormRef, user)">{{ $t('login.title') }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { ElForm } from 'element-plus'

const router = useRouter();
type FormInstance = InstanceType<typeof ElForm>
let loginFormRef = ref<FormInstance>()
let user = reactive({
  name: 'admin',
  passwd: '12345678'
})

const formRules = reactive({
  name: [{
          required: true,
          min: 3,
          max: 8,
          message: '用户名至少3个字符，最多8个字符',
          trigger: 'blur',
        }],
  passwd: [{
            required: true,
            min: 8,
            max: 18,
            message: '密码至少8个字符，最多18个字符',
            trigger: ['blur', 'change'],
          }],
})

const login = (form: FormInstance | undefined, user: object) => {
  if (!form) return
  form.validate((valid) => {
    if (valid) {
      console.log('通过验证')
      router.push('/')  
    } else {
      console.log('验证失败')
    }
  })
  
  console.log(form)
  console.log(user)
}

</script>

<style scoped>
  @import '@css/login.css';
</style>
