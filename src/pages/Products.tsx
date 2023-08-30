import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { getAllProducts } from '../services/product';
import { Table } from 'antd';

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getAllProducts().then(products => setProducts(products));
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
  ];

  const productsWithKey = products.map(product => ({
    ...product,
    key: product.id.toString(),
  }));


  return (
    <div>
     <Table dataSource={productsWithKey} columns={columns}/>
    </div>
  )
}

export default Products;