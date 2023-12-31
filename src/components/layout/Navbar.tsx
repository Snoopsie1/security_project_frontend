import {
  SmileOutlined,
  DownloadOutlined,
  GiftOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Menu, MenuProps } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCustomerStore from "../../store/customer.store";

const Navbar = () => {
  const navigate = useNavigate();
  const fullpath = window.location.pathname;
  const [current, setCurrent] = useState('/products');
  const resetCustomer = useCustomerStore((state) => state.resetState);

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
    resetCustomer();
    navigate('/login');
    window.location.reload();
  };

  const items: MenuProps["items"] = [
    {
      label: "Products",
      key: "/products",
      icon: <GiftOutlined />,
    },
    {
      label: "Purchases",
      key: "/orders",
      icon: <DownloadOutlined />,
    },
    {
      label: "Customers",
      key: "/customers",
      icon: <SmileOutlined />,
    },
    {
      label: <Button icon={<LogoutOutlined />} onClick={handleLogOut} />,
      key: "/",
    },
  ];

  useEffect(() => {
    const result = fullpath.split("/");
    setCurrent("/" + result[1]);
  }, []);

  const changePage: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  };

  const centerStyle: MenuProps["style"] = {
    position: "relative",
    display: "flex",
    justifyContent: "center",
  };

  return (
    <Menu
      onClick={changePage}
      style={centerStyle}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Navbar;
