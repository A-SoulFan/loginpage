import {ref} from "vue";
import {RuleObject} from "ant-design-vue/es/form/interface";
import {ruleInterface} from "@/types/types";
import {sendEmailCode} from "@/http/request";
import {message} from 'ant-design-vue'

export let isShowTime = ref<boolean>(false) //切换发送验证码的文字
export let currentStep = ref<number>(0) //步骤条进度 0 - 1 - 2
export let sendCodeTime = ref<number>(5) //重新发送验证码时间

// //设置input框的动画
export const bindAnimation = (type: "focus" | "blur", nthEl: number, e?: MouseEvent): void => {
  const target = (e?.target as HTMLInputElement)
  const txt = document.querySelectorAll('.txt')[nthEl] as HTMLElement;
  if (type === 'focus') {
    txt.style.transform = `translateY(${-20}px)`
  } else {
    //输入框没有值的时候才恢复位置
    if (target.value === '') {
      txt.style.transform = `translateY(${0}px)`
    }
  }
}
//设置重新发送验证码时间并发送验证码
export const sendCode = (email: string,id:string): void => {
  if (id) {
    sendEmailCode({email, id}).then(res => {
      if (res.code === 200) {
        message.success(res.message || '发送成功')
      } else {
        message.warning(res.message || '发送失败')
      }
    })
  }
  isShowTime.value = true //显示60s倒计时
  setInterval(() => {
    if (sendCodeTime.value === 0) {
      //时间到0时重新显示回发送验证码
      isShowTime.value = false
      sendCodeTime.value = 5
    } else {
      sendCodeTime.value--
    }
  }, 1000)
}

let psw = ref('')
export const validateEmail = async (rule: RuleObject, value: string): Promise<string | void> => {
  const emailReg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/
  if (value === '') {
    return Promise.reject('请输入邮箱');
  } else {
    if (emailReg.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject('请输入正确的邮箱');
    }
  }
}
export const validatePassword = async (rule: RuleObject, value: string): Promise<string | void> => {
  psw.value = value
  const passwordReg = /^[\w.]{6,20}$/ //匹配6-20位的 字母 数字 下划线 点
  if (value === '') {
    return Promise.reject('请输入密码');
  } else {
    if (passwordReg.test(value)) {
      return Promise.resolve();
    } else {
      return Promise.reject('请输入6-20位字母、数字、下划线点');
    }
  }
}
export const validateConfirmPassword = async (rule: RuleObject, value: string): Promise<string | void> => {
  if (value === '') {
    return Promise.reject('密码不能为空');
  } else {
    if (value !== psw.value) {
      return Promise.reject('密码与上次不一致');
    } else {
      return Promise.resolve();
    }
  }
}
export const validateNickname = async (rule: RuleObject, value: string): Promise<string | void> => {
  const nicknameReg = /^(?:[\u4e00-\u9fa5·a-zA-Z0-9._-]{2,16}$)/ //匹配中文 英文 数字 . _ -
  if (value === '') {
    return Promise.reject('昵称不能为空');
  } else {
    if (!nicknameReg.test(value)) {
      return Promise.reject('昵称2-16位不能含特殊符号(._-除外)');
    } else {
      return Promise.resolve();
    }
  }
}
export const validateUsername = async (rule: RuleObject, value: string): Promise<string | void> => {
  const usernameReg = /^[a-zA-Z0-9]{8,16}$/ //匹配 数字 字母
  if (value === '') {
    return Promise.reject('账号不能为空');
  } else {
    if (!usernameReg.test(value)) {
      return Promise.reject('请输入8-16位数字和字母');
    } else {
      return Promise.resolve();
    }
  }
}

const rules: ruleInterface = {
  email: [{required: true, validator: validateEmail, trigger: 'change'}],
  password: [{required: true, validator: validatePassword, trigger: 'change'}],
  confirmPassword: [{required: true, validator: validateConfirmPassword, trigger: 'change'}],
  username: [{required: true, validator: validateUsername, trigger: 'change'}],
  nickname: [{required: true, validator: validateNickname, trigger: 'change'}],
}

export const loginRules: ruleInterface = {
  username: rules.username,
  password: rules.password,
}

export const registerRules: ruleInterface = rules

export const changePswRules: ruleInterface = {
  email: rules.email,
  password: rules.password,
  confirmPassword: rules.confirmPassword,
}
