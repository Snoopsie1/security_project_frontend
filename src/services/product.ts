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

export const deleteProduct = async (productId: number, customerRole: number) => {
  try {
    if (customerRole === 1) {
      const response = await axios.delete(`http://localhost/api/routes/product.php`, {
        data: {
          id: productId,
          role_id: customerRole, // Include role_id in the request body
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);

      if (response.status === 200) {
        console.log('Product deleted');
        return true; // Successfully deleted customer
      } else {
        return false; // Failed to delete customer
      }
    } else {
      return false; // Unauthorized action
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    return false; // Failed to delete customer
  }
};