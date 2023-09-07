import { useEffect, useState } from 'react';
import { Customer } from '../types/customer';
import { getAllCustomers, deleteCustomer, editCustomer} from '../services/customer';
import { Button, Popconfirm, Table } from 'antd';
import { message } from 'antd';

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
    {
      title: 'Edit & Delete',
      dataIndex: 'actions',
      key: 'actions',
      render: (text: string, customer: Customer) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(customer)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this customer?"
            onConfirm={() => handleDelete(customer.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button style={{ backgroundColor: 'red', borderColor: 'red', color: 'white' }}>Delete</Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleEdit = async (customer: Customer) => {
    const newName = prompt('Enter new name:', customer.name);
    const newEmail = prompt('Enter new email:', customer.email);
  
    if (newName !== null && newEmail !== null) {
      const updatedData = {
        name: newName,
        email: newEmail,
      };
  
      const success = await editCustomer(customer.id, updatedData);
  
      if (success) {
        // Check for null before updating the state
        if (customers !== null) {
          const updatedCustomers = customers.map((c) =>
            c.id === customer.id ? { ...c, ...updatedData } : c
          );
          setCustomers(updatedCustomers);
        }
  
        message.success('Customer updated successfully');
      } else {
        message.error('Failed to update customer');
      }
    }
  };
  
  

  const handleDelete = async (customerId: number) => {
    try {
      const success = await deleteCustomer(customerId, 1); // Assuming role_id of admin is 1
      if (success) {
        message.success('Customer deleted successfully');
        // Refresh the customer list or update the UI as needed
      } else {
        message.error('Failed to delete customer');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      message.error('Failed to delete customer');
    }
  };


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