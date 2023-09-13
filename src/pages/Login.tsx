import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

import axios from "axios";
import useCustomerStore from "../store/customer.store";
import { CustomerJWT } from "../types/customer";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const setCustomer = useCustomerStore((state) => state.setCustomer);

  const onLogin = async (values: any) => {
    try {
      const response = await axios.post("/api/routes/customer.php", {
        action: "login",
        email: values.email,
        password: values.password,
      });

      const token = response.data.jwt;

      if (token) {
        try {
          const decodedToken: CustomerJWT = jwt(token);
          setCustomer({
            id: decodedToken.user_id,
            name: decodedToken.user_name,
            email: decodedToken.user_email,
            password: decodedToken.user_password,
            role_id: decodedToken.user_role,
          });
        } catch (error) {
          console.error("Error decoding JWT: ", error);
        }
        localStorage.setItem("jwt", token); // Save JWT to local storage
        navigate("/products");
        window.location.reload();
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error("Failed:", errorInfo);
  };

  type FieldType = {
    email?: string;
    password?: string;
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
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
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <div className="flex flex-row ml-28 gap-x-20">
          <Form.Item>
            <Button htmlType="submit">Submit</Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={() => navigate("/register")}>Register</Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Login;
