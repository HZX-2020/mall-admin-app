<template>
<a-form-model class="login-form" ref="loginForm" :model="loginForm" :rules="rules" v-bind="layout">
    <a-form-model-item has-feedback label="邮箱" prop="email">
      <a-input v-model="loginForm.email" type="email" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="密码" prop="password">
      <a-input v-model="loginForm.password" type="password" autocomplete="off" />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary"
      @click="submitForm('loginForm')">
        提交
      </a-button>
      <a-button style="margin-left: 10px" @click="resetForm('loginForm')">
        重置
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import api from '@/api/user';

export default {
  data() {
    const emailReg = /^[\w-]+@[\w.-]+.com$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱！'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback(new Error('邮箱格式不正确！'));
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码！'));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        email: '',
        password: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  created() {
    document.onkeydown = (e) => {
      // e = window.event || e;
      if (this.$route.path === '/login' && (e.code === 'Enter' || e.code === 'enter')) {
      // 验证在登录界面和按得键是回车键enter
        this.submitForm('loginForm');// 登录函数
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.login(this.loginForm).then((resp) => {
            // 登陆成功后保存用户名
            this.$store.dispatch('setUserInfo', resp);
            //  登陆成功后跳转到首页
            this.$router.push({
              name: 'Home',
            });
          }).catch((error) => {
            // 弹出错误信息 ant-design的方法
            this.$message.error(error);
          });
          return true;
        }
        // console.log('error submit!!');
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style>
@import url('~@/assets/css/login.less');

</style>
