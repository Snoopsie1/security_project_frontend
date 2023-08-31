import { Customer } from "../types/customer";

export const getAllCustomers = async () => {
  try {
  const response = await fetch('http://localhost/api/routes/customer.php?');

  if (!response.ok) {
    throw new Error(`Failed to fetch customers. Status ${response.status}`);
  }

  const customers: Customer[] = await response.json();
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

export const deleteCustomer = async (customerId: number, customerRole: number) => {
  try {
    if (customerRole === 1) {
      const response = await fetch(`http://localhost/api/routes/customer.php?id=${customerId}&customerRole=${customerRole}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Failed to delete customer. Status ${response.status}`);
      }

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
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
