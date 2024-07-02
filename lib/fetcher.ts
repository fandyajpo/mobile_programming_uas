import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const client: AxiosInstance = axios.create({
  baseURL: String("http://localhost:8081/"),
  timeout: 5000,
});

export const fetcher = async <T>(url: string, r: AxiosRequestConfig) => {
  const rr = await client(url, r);
  return {
    status: true,
    data: rr.data,
    statusText: rr.statusText,
    code: rr.status,
  };
};
