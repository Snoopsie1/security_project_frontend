import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState(false);
  const navigate = useNavigate();
  
  const values = Form.useWatch([], form);
  
  const { Option } = Select;
  
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  useEffect(() => {
    form.validateFields({validateOnly: true}).then(
      () => {
        setSubmittable(true);
      },
      () => {
        setSubmittable(false);
      },
    );
  }, [values]);

  const onRegister = async (values: any) => {
    console.log(values);
    try {
      const response = await axios.post('http://localhost/api/routes/customer.php', {
        action: 'register',
        name: values.name,
        email: values.email,
        password: values.password,
        role_id: values.role,
      });

      console.log(response.data); // Handle the response from the server
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Form
      {...layout}
      form={form}
      name="control-hooks"
      onFinish={onRegister}
      style={{ maxWidth: 600 }}
    >
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="role" label="Role" rules={[{ required: true }]}>
        <Select
          allowClear
        >
          <Option value="1">Admin</Option>
          <Option value="2">Customer</Option>
        </Select>
      </Form.Item>
      <Form.Item {...tailLayout}>
        <div className='absolute inset-y-0 right-0 space-x-6'>
        <Button htmlType="submit" onClick={() => navigate('/')}>
          Back
        </Button>
        <Button htmlType="submit" disabled={!submittable}>
          Register
        </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default Register;