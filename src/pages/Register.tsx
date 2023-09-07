import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/user';

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [submittable, setSubmittable] = useState(false);
  const [doesEmailExist, setDoesEmailExist] = useState(false);
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
    const result = await registerUser(values);
    if (result?.data.status === 1) {
      navigate('/login');
    } else if (result?.data.status === 0) {
      setDoesEmailExist(true);
      setSubmittable(false);
    }
  };

  return (
    <div className='h-full w-full flex items-center justify-center'>
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
        <Form.Item 
          name={"email"}
          label={ doesEmailExist ? "Fail" : "Email"}
          rules={[{ required: true }]}
          validateStatus={ doesEmailExist ? 'error' : ''}
          help={ doesEmailExist ? 'Customer already exists. Try another email.' : ''}
        >
          <Input id="error"/>
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
      </div>
  );
};

export default Register;