import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";

export const api = axios.create({
  baseURL: "https://back-react-production.up.railway.app",
});

const baseURL = "https://back-react-production.up.railway.app";

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface UserData {
  nome: string;
  email: string;
  senha: string;
}

export async function cadastrarUsuario(data: UserData) {
  try {
    const response = await axios.post(`${baseURL}/usuarios`, data);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 500) {
      throw new Error("Email já em utilização");
    }
    throw error;
  }
}

export async function loginUsuario(data: UserData) {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, data);
    const { token } = response.data;
    await AsyncStorage.setItem("userToken", token);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error("Usuário inexistente ou senha incorreta");
    }
    throw error;
  }
}

export async function logout() {
  try {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      await axios.post(
        `${baseURL}/auth/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
    await AsyncStorage.removeItem("userToken");
  } catch (error) {
    console.error("Erro ao fazer logout:", error);
  }
}

export function useCRUD<T>(baseUrl: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | T[] | null>(null);

  const handleRequest = async <D = any>(
    method: "get" | "post" | "put" | "patch" | "delete",
    endpoint: string = "",
    payload?: D,
    config?: AxiosRequestConfig
  ) => {
    setLoading(true);
    setError(null);

    try {
      const response = await api({
        method,
        url: `${baseUrl}${endpoint ? `/${endpoint}` : ""}`,
        data: payload,
        ...config,
      });

      setData(response.data);
      return response.data;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAll = () => handleRequest("get");
  const getById = (id: number | string) => handleRequest("get", String(id));
  const create = <D>(item: D) => handleRequest("post", "", item);
  const update = <D>(id: number | string, item: D) =>
    handleRequest("patch", String(id), item);
  const remove = (id: number | string) => handleRequest("delete", String(id));

  return {
    data,
    loading,
    error,
    getAll,
    getById,
    create,
    update,
    remove,
  };
}
