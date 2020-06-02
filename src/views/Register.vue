<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack" />
    <div class="register-pannel">
      <van-field
        v-model="username"
        type="text"
        label="用户名"
        placeholder="请输入用户名"
        required
        @click-icon="username==''"
        :error-message="usernameErrorMsg"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />
      <div class="register-button">
        <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
import url from "@/api/configApi.js";
export default {
  data() {
    return {
      username: "",
      password: "",
      openLoading: false,
      usernameErrorMsg: "",
      passwordErrorMsg: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    axiosRegisterUser() {
      this.openLoading = true;
      axios({
        url: url.registerUser,
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(response => {
          if (response.data.code == 200) {
            Toast.success("注册成功");
            this.$router.push("/login");
          } else {
            console.log(response.data.message);
            Toast.fail("注册失败");
            this.openLoading = false;
          }
          console.log(response.data.code);
          this.openLoading = false;
        })
        .catch(error => {
          console.log(error);
          Toast.fail("注册失败");
        });
    },
    checkForm() {
      let isOk = true;
      if (this.username.length < 5) {
        this.usernameErrorMsg = "用户名不能小于5位";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能少于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return isOk;
    },
    registerAction() {
      this.checkForm() && this.axiosRegisterUser();
    }
  }
};
</script>

<style>
.register-pannel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.regiter-button {
  padding-top: 10px;
}
</style>