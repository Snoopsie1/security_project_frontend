import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { getAllProducts } from '../services/product';
import { Button, Table } from 'antd';

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
    <div className='w-full mx-4'>
      <div className='flex flex-row justify-between mx-4'>
        <h2 className='text-2xl'>Products</h2>
        <Button type='primary' className={'w-40'}>Add Product</Button>
      </div>
        <Table dataSource={productsWithKey} columns={columns}/>
    </div>
  )
}

export default Products;