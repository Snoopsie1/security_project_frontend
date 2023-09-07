import { useEffect, useState } from 'react';
import { Product } from '../types/product';
import { getAllProducts } from '../services/product';
import { Button, Form, Input, Modal, Table } from 'antd';
import useCustomerStore from '../store/customer.store';
import { useForm } from 'antd/es/form/Form';

const Products = () => {

  /* - - - - - GLOBAL STATE - - - - - */
  const customer = useCustomerStore((state) => state.customer);
  /* - - - - - LOCAL STATE - - - - - */
  const [isSubmittable, setIsSubmittable] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [form] = useForm();

  const values = Form.useWatch([], form);

  useEffect(() => {
    getAllProducts().then(products => setProducts(products));
  }, []);

  useEffect(() => {
    form.validateFields({validateOnly: true}).then(
      () => {
        setIsSubmittable(true);
      },
      () => {
        setIsSubmittable(false);
      },
    );
  }, [values]);

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

  const showModal = () => {
    if (customer?.roleId === 1) {
      setIsOpen(true);
    } 
  }

  const cancelModal = () => {
    if (customer?.roleId === 1) {
      setIsOpen(false);
    }
  }

  const onSubmit = () => {
    console.log('Received Values: ', values);
    form.resetFields();
    setIsOpen(false);
  }


  return (
    <div className='w-full p-5'>
      <div className='flex flex-row justify-between mx-5'>
        <h2 className='text-2xl'>Products</h2>
        { customer?.id === 1 && <Button className='w-40' onClick={() => showModal()}>Add Product</Button>}
      </div>
        <Table dataSource={productsWithKey} columns={columns}/>
        {/* Modal */}
        <Modal
          title='Add Product'
          open={isOpen}
          onCancel={cancelModal}
          footer={null}
          >
            <Form
            name='basic'
            form={form}
            style={{ maxWidth: 600 }}
            onFinish={onSubmit}
            >
              <Form.Item 
                name='name'
                label='Name'
                rules={[{ required: true, message: 'Please enter a name!'}]}
              >
                <Input/>
              </Form.Item>
              <Form.Item 
                name='price'
                label='Price'
                rules={[
                  { required: true, 
                    pattern: /^[0-9]*$/,
                    message: 'Please enter a valid price (numbers only)!',}
                ]}
              >
                <Input/>
                </Form.Item>
                <div className='flex justify-end'>
                <Form.Item className='m-1'>
                  <Button onClick={cancelModal} danger>
                    Cancel
                  </Button>
                </Form.Item>
                <Form.Item className='m-1'>
                  <Button htmlType='submit' disabled={!isSubmittable}>
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </Form>
        </Modal> 
    </div>
  )
}

export default Products;