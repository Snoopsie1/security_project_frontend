import { DownloadOutlined, GiftOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('/');

  const items: MenuProps['items'] = [
    {
      label: 'Products',
      key: '/',
      icon: <GiftOutlined/>
    },
    {
      label: 'Orders',
      key: '/orders',
      icon: <DownloadOutlined/>
    }, 
    // TODO: Tilføj Users
  ];

  const changePage: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    navigate(e.key);
  }

  const centerStyle: MenuProps['style'] = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <Menu onClick={changePage} style={centerStyle} selectedKeys={[current]} mode='horizontal' items={items}/>
  )
}

export default Navbar;