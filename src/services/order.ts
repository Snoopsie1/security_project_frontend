import axios from "axios";

interface RequestConfig<T> {
  url: string;
  headers?: Record<string, string>;
  data?: T | null;
}

export default function PurchaseFethcer() {
  const api = axios.create({
    baseURL: "http://localhost/api/routes/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject;
    }
  );

  async function postPurchase<T>({ url, data }: RequestConfig<T>) {
    return await api.post<T>(url, data);
  }

  async function getPurchase<T>({ url }: RequestConfig<T>) {
    const response = await api.get<T>(url);
    return response.data;
  }

  async function deletePurchase<T>({ url, data }: RequestConfig<T>) {
    return await api.post<T>(url, data);
  }

  return { postPurchase, getPurchase, deletePurchase };
}
