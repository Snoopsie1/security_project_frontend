import axios, { AxiosError } from "axios";
import { Product } from "../types/product";

export const getAllProducts = async () => {
  const response = await axios.get('/api/routes/product.php?');

  if (!response.status) {
    throw new Error(`Failed to fetch products. Status ${response.status}`);
  }

  const products: Product[] = await response.data;
  return products;
}

export const addProduct = async (values: any, customerRole: number) => {
  const response = await axios.post('/api/routes/product.php', {
    name: values.name,
    price: values.price,
    role: customerRole,
  }).catch((error: AxiosError) => {
    return error.response;
  })
  return response;
}