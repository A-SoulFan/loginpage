<template>
  <div>
    <formMain theme="lilac" :title="ToggleTitle.changePsw">
      <template #headImg>
        <img src="../assets/images/FINFPSW.png" alt="">
      </template>
      <template #logo>
        <img class="logo" src="../assets/images/ASF2.png" alt="">
      </template>
      <template #form>
        <a-form
            name="custom-validation"
            ref="formRef"
            :model="formState"
            class="form"
            :rules="rules"
            @finish="handleFinish"
        >
          <div v-show="currentStep===0" style="margin-bottom: 90px">
            <a-form-item name="email" has-feedback>
              <a-input
                  class="input"
                  @focus="bindAnimation('focus', 0)"
                  @blur="bindAnimation('blur', 0, $event)"
                  v-model:value="formState.email"
                  type="emil"
                  autocomplete="off"
              />
              <span class="txt">请输入注册的电子邮箱</span>
              <span class="line"></span>
            </a-form-item>
          </div>
          <div v-show="currentStep===1">
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
              <span class="txt">请输入新密码</span>
              <span class="line"></span>
            </a-form-item>

            <a-form-item name="confirmPassword" has-feedback>
              <a-input-password
                  class="input"
                  allowClear
                  @focus="bindAnimation('focus', 2)"
                  @blur="bindAnimation('blur', 2, $event)"
                  v-model:value="formState.confirmPassword"
                  type="password"
                  autocomplete="off"
              />
              <span class="txt">确认密码</span>
              <span class="line"></span>
            </a-form-item>
          </div>
          <div v-show="currentStep===2">
            <h1 class="changePsw-des">修改密码成功!</h1>
          </div>
          <a-button v-if="currentStep!==2" class="btn form-btn" html-type="submit">下一步</a-button>
        </a-form>
      </template>
      <template #step>
        <step :changePsw="true"></step>
      </template>
    </formMain>
  </div>
</template>

<script lang='ts'>
import {defineComponent, reactive} from 'vue'
import formMain from '../components/formMain.vue'
import {FormState, ruleInterface, ToggleTitle} from '@/types/types'
import {
  bindAnimation,
  currentStep,
  validatePassword,
  validateConfirmPassword,
  validateEmail,
  changePswRules
} from '@/utils/mixins'
import step from '@/components/step.vue'

export default defineComponent({
  name: 'changePassword',
  components: {
    formMain,
    step
  },
  setup() {
    const formState = reactive<Pick<FormState, 'email' | 'password' | 'confirmPassword'>>({
      email: '',
      password: '',
      confirmPassword: ''
    })

    //数据校验通过触发
    const handleFinish = (values: FormState) => {
      console.log('finish:', values)
      currentStep.value++
      if (currentStep.value === 1) {
        if (rules.email) {
          delete rules.email
        }
        rules.password = changePswRules.password
        rules.confirmPassword = changePswRules.confirmPassword
      }
    }
    let rules: ruleInterface = reactive({email: changePswRules.email})

    return {
      formState,
      ToggleTitle,
      bindAnimation,
      currentStep,
      rules,
      validatePassword,
      validateConfirmPassword,
      validateEmail,
      handleFinish
    }
  }
})
</script>

<style scoped>

</style>
