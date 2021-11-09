<template>
  <formMain :title="ToggleTitle.register" theme="origin">
    <template #headImg>
      <img src="../assets/images/WELLCOME.png" alt="">
    </template>
    <template #logo>
      <img class="logo" style="top: 55px" src="../assets/images/ASF.png" alt/>
    </template>
    <template #form>
      <a-form
          :class="[currentStep === 0 ? 'special-form' : 'form']"
          name="custom-validation"
          ref="formRef"
          :model="formState"
          :rules="registerRules"
          @finish="submit"
      >
        <div v-show="currentStep === 0">
          <a-form-item name="email" has-feedback>
            <a-input
                class="input"
                @focus="bindAnimation('focus', 0)"
                @blur="bindAnimation('blur', 0, $event)"
                v-model:value="formState.email"
                allowClear
                type="emil"
                autocomplete="off"
            />
            <span class="txt">电子邮箱</span>
            <span class="line"></span>
          </a-form-item>
          <a-form-item name="nickname" has-feedback>
            <a-input
                class="input"
                allowClear
                @focus="bindAnimation('focus', 1)"
                @blur="bindAnimation('blur', 1, $event)"
                v-model:value="formState.nickname"
                type="txt"
                autocomplete="off"
            />
            <span class="txt">昵称</span>
            <span class="line"></span>
          </a-form-item>
          <a-form-item name="username" has-feedback>
            <a-input
                class="input"
                allowClear
                @focus="bindAnimation('focus', 2)"
                @blur="bindAnimation('blur', 2, $event)"
                v-model:value="formState.username"
                type="txt"
                autocomplete="off"
            />
            <span class="txt">账号</span>
            <span class="line"></span>
          </a-form-item>
          <a-form-item name="password" has-feedback>
            <a-input-password
                class="input"
                allowClear
                @focus="bindAnimation('focus', 3)"
                @blur="bindAnimation('blur', 3, $event)"
                v-model:value="formState.password"
                type="password"
                autocomplete="off"
            />
            <span class="txt">密码</span>
            <span class="line"></span>
          </a-form-item>
          <a-form-item name="confirmPassword" has-feedback>
            <a-input-password
                class="input"
                allowClear
                @focus="bindAnimation('focus', 4)"
                @blur="bindAnimation('blur', 4, $event)"
                v-model:value="formState.confirmPassword"
                type="password"
                autocomplete="off"
            />
            <span class="txt">确认密码</span>
            <span class="line"></span>
          </a-form-item>
          <a-button class="btn form-btn" html-type="submit">下一步</a-button>
        </div>
        <div v-show="currentStep === 1">
          <h1 class="title">请输入电子邮箱 {{ formState.email }} 收到的验证码</h1>
          <div style="position: relative">
            <a-form-item>
              <a-input
                  class="input"
                  @focus="bindAnimation('focus', 5)"
                  @blur="bindAnimation('blur', 5, $event)"
                  v-model:value="emailCode"
              />
              <span class="txt">请输入邮箱验证码</span>
              <span class="line" style="width: 181px;"></span>
            </a-form-item>
            <a-button type="default" class="sendCode" :disabled="isShowTime"
                      @click.prevent="sendCode(formState.email,id)">
              {{ !isShowTime ? '发送' : '重新发送' }}
              <span v-show="isShowTime">({{ sendCodeTime }}s)</span>
            </a-button>
            <a-button style="bottom:-60px;" class="btn form-btn" @click="verify">下一步</a-button>
          </div>
        </div>
        <div v-show="currentStep===2">
          <h1 class="register-des">恭喜注册成功!</h1>
        </div>
      </a-form>
    </template>
    <template #step>
      <step></step>
    </template>
  </formMain>
</template>

<script lang='ts'>
import {defineComponent, reactive, ref} from 'vue';
import formMain from "@/components/formMain.vue";
import {FormState, ToggleTitle} from '@/types/types'
import {
  sendCode,
  isShowTime,
  currentStep,
  sendCodeTime,
  bindAnimation,
  validateEmail,
  validateUsername,
  validatePassword,
  validateNickname,
  validateConfirmPassword,
  registerRules,
} from '@/utils/mixins'
import step from '@/components/step.vue'
import {register, verifyEmail} from "@/http/request";
import {message} from "ant-design-vue";

export default defineComponent({
  name: 'register',
  components: {
    formMain,
    step
  },
  setup() {
    const formState = reactive<FormState>({
      email: '',
      nickname: '',
      username: '',
      password: '',
      confirmPassword: ''
    })
    let emailCode = ref<string>('') //验证码
    let id = ref<string>('')
    //数据校验通过触发(仅作为第一步骤使用
    const submit = (values: FormState) => {
      currentStep.value = 1
      if (currentStep.value === 1) {
        register({
          nickname: values.nickname,
          username: values.username,
          password: values.password,
          icon: 'default'
        }).then(res => {
          id.value = res.data
        })
      }
    }

    //第二步骤的邮箱验证
    const verify = () => {
      if (id.value) {
        verifyEmail({code: emailCode.value, id: id.value}).then(res => {
          if (res.code === 200) {
            currentStep.value++
          } else {
            message.warning(res.message || '验证码错误')
          }
        })
      } else {
        message.error('验证失败')
      }
    }
    return {
      ToggleTitle,
      formState,
      bindAnimation,
      currentStep,
      sendCode,
      sendCodeTime,
      isShowTime,
      registerRules,
      validateConfirmPassword,
      validateNickname,
      validatePassword,
      validateUsername,
      validateEmail,
      submit,
      verify,
      emailCode,
      id
    }
  }
})
</script>

<style scoped>
</style>
