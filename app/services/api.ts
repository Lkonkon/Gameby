import axios from "axios";
const baseURL = "http://10.0.2.2:3000";

export interface UserData {
  nome: string;
  email: string;
  senha: string;
}

export async function cadastrarUsuario(data: UserData) {
  const response = await axios.post(`${baseURL}/usuarios`, data);
  return response.data;
}

export async function loginUsuario(data: UserData) {
  const response = await axios.post(`${baseURL}/auth/login`, data);
  console.log(response.data);
  return response.data;
}
