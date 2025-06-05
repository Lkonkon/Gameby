import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";


export const api = axios.create({
  baseURL: "http://[::1]:3000",
});

const baseURL = "http://[::1]:3000";
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
