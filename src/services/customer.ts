import axios from "axios";
import { Customer } from "../types/customer";

export const getAllCustomers = async () => {
  try {
    const response = await axios.get('api/routes/customer.php');

    if (response.status !== 200) {
      throw new Error(`Failed to fetch customers. Status ${response.status}`);
    }

    const customers: Customer[] = response.data;
    return customers;
  } catch (error) {
    console.error(error);
    return null; 
  }
}

export const getCustomerById = async (customerId: number) => {
  try {
    const response = await fetch(`http://localhost/api/routes/customer.php?id=${customerId}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch customer. Status ${response.status}`);
    }

    const customerData: Customer = await response.json();
    return customerData;
  } catch (error) {
    console.error(error);
    return null; 
  }
};

export const editCustomer = async (customerId: number, updatedData: {name?: string; email?: string }) => {
  try {
    const response = await axios.put(`api/routes/customer.php`, {
      id: customerId,
      name: updatedData.name,
      email: updatedData.email,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response)
    if (response.status === 200) {
      console.log('Customer updated')
      return true; // Successfully edited customer
    } else {
      return false; // Failed to edit customer
    }
  } catch (error) {
    console.error('Error editing customer:', error);
    return false; // Failed to edit customer
  }
};


export const deleteCustomer = async (customerId: number, customerRole: number) => {
  try {
    if (customerRole === 1) {
      const response = await axios.delete(`http://localhost/api/routes/customer.php`, {
        data: {
          id: customerId,
          role_id: customerRole, // Include role_id in the request body
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response);

      if (response.status === 200) {
        console.log('Customer deleted');
        return true; // Successfully deleted customer
      } else {
        return false; // Failed to delete customer
      }
    } else {
      return false; // Unauthorized action
    }
  } catch (error) {
    console.error('Error deleting customer:', error);
    return false; // Failed to delete customer
  }
};



export const createCustomer = async (name: string, email: string, password: string, role_id: number) => {
  try {
    const response = await fetch('http://localhost/api/routes/customer.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role_id }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create customer. Status ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error(error);
    return false; 
  }
};
