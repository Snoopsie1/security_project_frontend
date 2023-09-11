import { useEffect, useState } from 'react';
import { Customer, CustomerJWT } from '../types/customer';
import { getAllCustomers, deleteCustomer, editCustomer} from '../services/customer';
import { Button, Popconfirm, Table } from 'antd';
import jwt from 'jwt-decode'
import { message } from 'antd';
import jwtDecode from 'jwt-decode';

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[] | null>(null);
  const [currentCustomer, setCurrentCustomer] = useState<Customer | null>(null);
  
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customerData = await getAllCustomers();
        setCustomers(customerData || []); // Handle null or undefined response
  
        // Retrieve the JWT token from local storage
        const token = localStorage.getItem('jwt');
  
        if (token) {
          try {
            // Decode the JWT token to get user information
            const decodedToken: CustomerJWT = jwtDecode(token);
  
            // Use the user information from the token to find the current customer
            if (customerData && customerData.length > 0) {
              const loggedInCustomer = customerData.find(customer => customer.id === decodedToken.user_id);
  
              if (loggedInCustomer) {
                setCurrentCustomer(loggedInCustomer);
              }
            }
          } catch (error) {
            console.error('Error decoding JWT: ', error);
          }
        }
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
            <Button style={{backgroundColor: 'blue', color: 'white'}} onClick={() => handleEdit(customer)}>
              Edit
            </Button>
          <Popconfirm
            title="Are you sure you want to delete this customer?"
            onConfirm={() => handleDelete(customer.id, customer.roleId)}
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
  
  

  const handleDelete = async (customerId: number, customerRole: number) => {
    if (customerRole === 1) {
      // Show a confirmation prompt to confirm the deletion
      const confirmDeletion = window.confirm('Are you sure you want to delete this customer?');
  
      if (confirmDeletion) {
        try {
          await deleteCustomer(customerId, customerRole); // Use customerRole to check permissions
          // You can optionally refresh the customer list or update the UI as needed
        } catch (error) {
          console.error('Error deleting customer:', error);
        }
      }
    } else {
      // Display a message indicating that only admin can delete customers
      alert('Only admin users can delete customers.');
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
     <div className="text-center my-4">
        {currentCustomer && (
         <h1 className="text-xl">Logged in as: {currentCustomer.name}</h1>
         )}
        </div>
      <div className='flex flex-row justify-between mx-5'>
        <h2 className='text-2xl'>Customer</h2>
      </div>
        <Table dataSource={customersWithKey} columns={columns}/>
    </div>
  )
}

export default Customers;