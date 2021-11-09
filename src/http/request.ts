import {RequestResponse, Register, LoginResponse} from "@/types/types.ts";
import {http} from "@/http/axios.ts";
import {AxiosResponse} from "axios";

export const register = async (params: Register): Promise<RequestResponse> => {
  const res:AxiosResponse<RequestResponse> = await http.post('user/user/verifyUserInfo', JSON.stringify(params))
  return res.data
}

export const sendEmailCode = async (params: { email: string, id: string }): Promise<RequestResponse> => {
  const res:AxiosResponse<RequestResponse> = await http.get('user/user/email', {params})
  return res.data
}

export const verifyEmail = async (params: { code: string, id: string }): Promise<RequestResponse> => {
  const res:AxiosResponse<RequestResponse> = await http.get('user/user/verify', {params})
  return res.data
}

export const login = async (params: { username: string, password: string }): Promise<LoginResponse> => {
  const res:AxiosResponse<LoginResponse> = await http.post('user/user/login', JSON.stringify(params))
  console.log(res);
  return res.data
}
