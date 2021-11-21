<template>
  <div>
    <!--    表单容器-->
    <formMain :form-state="formState" :title="ToggleTitle.login" theme="blue">
      <!--      头部图片-->
      <template #headImg>
        <img src="../assets/images/SIGNIN.png" alt="">
      </template>
      <!--      logo-->
      <template #logo>
        <img class="logo" src="../assets/images/ASF3.png" alt/>
      </template>
      <!--      表单-->
      <template #form>
        <a-form
            name="custom-validation"
            ref="formRef"
            class="form"
            :model="formState"
            :rules="loginRules"
            @finish="submit"
        >
          <a-form-item name="username" has-feedback>
            <a-input
                class="input"
                allowClear
                @focus="bindAnimation('focus', 0)"
                @blur="bindAnimation('blur', 0, $event)"
                v-model:value="formState.username"
                type="text"
                autocomplete="off"
            />
            <span class="txt">账号</span>
            <span class="line"></span>
          </a-form-item>
          <a-form-item name="password" has-feedback>
            <a-input-password
                class="input"
                allowClear
                @focus="bindAnimation('focus', 1)"
                @blur="bindAnimation('blur', 1, $event)"
                v-model:value="formState.password"
                type="password"
                autocomplete="off"
            />
            <span class="txt">密码</span>
            <span class="line"></span>
          </a-form-item>
          <a-form-item style="background-color: unset;">
            <a-button type="primary" class="login-btn" html-type="submit">登陆</a-button>
          </a-form-item>
          <!--          <router-link to="/changePsw" class="changePsw">忘记密码?</router-link>-->
          <a class="changePsw" @click="Tips">忘记密码?</a>
        </a-form>
      </template>
    </formMain>
  </div>
</template>
<script lang='ts'>
import {defineComponent, reactive, ref} from 'vue';
import {Login, ToggleTitle} from "@/types/types";
import formMain from '../components/formMain.vue'
import {login} from '@/http/request'
import {bindAnimation, loginRules, validateUsername, validatePassword} from "@/utils/mixins";
import {message} from "ant-design-vue";

export default defineComponent({
  name: 'Login',
  components: {
    formMain
  },
  setup() {

    let title = ref<ToggleTitle>(ToggleTitle.register)

    const formState = reactive<Login>({
      username: '',
      password: ''
    })

    //数据校验通过触发
    const submit = (values: Login): void => {
      login(values).then(res => {
        if (res.code === 200) {
          message.success('登陆成功')
          document.cookie = `asoulFanToken=${res.data.token}`
        } else {
          message.error(res.message || '用户名或密码错误')
        }
      })
    }
    const Tips = () => {
      message.warning('功能暂未开放,敬请期待!')
    }
    return {
      title,
      formState,
      bindAnimation,
      ToggleTitle,
      submit,
      loginRules,
      validateUsername,
      validatePassword,
      Tips
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
