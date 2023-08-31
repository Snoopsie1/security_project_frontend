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

  const addProduct = () => {
    //TODO: Finish this method
    console.log('ADDING PRODUCT')
  }


  return (
    <div className='w-full p-5'>
      <div className='flex flex-row justify-between mx-5'>
        <h2 className='text-2xl'>Products</h2>
        <Button className='w-40' onClick={() => addProduct()}>Add Product</Button>
      </div>
        <Table dataSource={productsWithKey} columns={columns}/>
    </div>
  )
}

export default Products;