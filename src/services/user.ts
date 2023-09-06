import axios, { AxiosError } from "axios";

export const registerUser = async (values: any) => {
  const response = await axios.post('/api/routes/customer.php', {
    action: 'register',
    name: values.name,
    email: values.email,
    password: values.password,
    role_id: values.role,
  }).catch((error: AxiosError) => {
    return error.response;
  })
  return response;
}