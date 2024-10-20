import axios, { AxiosResponse } from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use((response: AxiosResponse) => {
  return response.data?.data ?? response.data;
});

export const httpService = {
  get: async <T>(url: string, params?: any): Promise<T> => {
    return await axiosInstance.get(url, { params });
  },
  post: async <T, U>(url: string, data: U): Promise<T> => {
    return await axiosInstance.post(url, data);
  },
  put: async <T, U>(url: string, data: U): Promise<T> => {
    return await axiosInstance.put(url, data);
  },
  delete: async <T>(url: string): Promise<T> => {
    return await axiosInstance.delete(url);
  },
};
