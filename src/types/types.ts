import {RuleObject} from "ant-design-vue/es/form/interface";

enum ToggleTitle {
  'login',
  changePsw,
  'register'
}

interface FormState {
  email:string,
  nickname:string,
  username:string,
  password:string,
  confirmPassword:string
}

interface Login {
  username: string
  password: string
}

interface Register {
  username:string,
  nickname:string,
  password:string,
  icon:string
}

interface themeColor {
  origin: string,
  blue: string,
  lilac:string
}

interface themeType {
  '--theme-color': themeColor
  '--theme-line': themeColor
  '--theme-color2': themeColor
}
interface RequestResponse {
  code:number
  data:string //唯一id
  message:string
}

interface LoginResponse {
  token:string //访问令牌
  refreshToken:string //刷新令牌
  tokenHead:string //访问令牌头前缀
  code?:number,
  message?:string
}

type rulesValueType = [{ required: true, validator: (rule: RuleObject, value: string) => Promise<string | void>, trigger: 'blur' | 'change' }]

interface ruleInterface {
  [key: string]: rulesValueType
}

export {
  ToggleTitle,
  FormState,
  Login,
  themeType,
  themeColor,
  Register,
  RequestResponse,
  ruleInterface,
  LoginResponse
}

