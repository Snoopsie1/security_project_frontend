import { useEffect, useState } from 'react';
import { Customer } from '../types/customer';
import { getAllCustomers} from '../services/customer';
import { Button, Table } from 'antd';

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[] | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customerData = await getAllCustomers();
        setCustomers(customerData || []); // Handle null or undefined response
      } catch (error) {
        console.error('Error fetching customer data:', error);
        // Handle the error gracefully, e.g., show an error message to the user
      }
    };
  
    fetchCustomers();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  if (customers === null) {
    return <div>Loading customers...</div>;
  }

  const customersWithKey = customers.map((customer) => ({
    ...customer,
    key: customer.id.toString(),
  }));

  

  return (
    <div className='w-full p-5'>
      <div className='flex flex-row justify-between mx-5'>
        <h2 className='text-2xl'>Customer</h2>
      </div>
        <Table dataSource={customersWithKey} columns={columns}/>
    </div>
  )
}

export default Customers;