import { Product } from "../types/product";

export const getAllProducts = async () => {
  const response = await fetch('http://localhost/api/routes/product.php?');

  if (!response.ok) {
    throw new Error(`Failed to fetch products. Status ${response.status}`);
  }

  const products: Product[] = await response.json();
  return products;
}