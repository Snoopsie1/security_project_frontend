import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


//TODO: Lav logout som dræber token
const Login: React.FC = () => {
  const navigate = useNavigate();
  
  const onLogin = async (values: any) => {
    console.log(values);
    try {
      const response = await axios.post('/api/routes/customer.php', {
        action: 'login',
        email: values.email,
        password: values.password,
      });
      
      console.log(response.data); 
      const { token } = response.data;

      if (token) {
        localStorage.setItem('jwt', token); // Save JWT to local storage
        navigate('/'); // Redirect to home or authenticated route
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    email?: string;
    password?: string;
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onLogin}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <div className='flex flex-row ml-28 gap-x-20'> 
        <Form.Item>
          <Button htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Button onClick={() => navigate('/register')}>Register</Button>
        </Form.Item>

      </div>
    </Form>
  )
}  

export default Login;