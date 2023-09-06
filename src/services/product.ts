import axios from "axios";
import { Product } from "../types/product";

export const getAllProducts = async () => {
  const response = await axios.get('/api/routes/product.php?');

  if (!response.status) {
    throw new Error(`Failed to fetch products. Status ${response.status}`);
  }

  const products: Product[] = await response.data;
  return products;
}