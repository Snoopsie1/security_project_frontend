import { type Product } from "./product";

export interface Purchase {
  id: number;
  products: Product[];
}
