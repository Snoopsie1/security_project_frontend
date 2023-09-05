import { SmileOutlined, DownloadOutlined, GiftOutlined } from '@ant-design/icons';
import { Menu, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const fullpath = window.location.pathname;
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
    {
      label: 'Customers',
      key: '/customers',
      icon: <SmileOutlined/>
    }
  ];

  useEffect(() => {
    const result = fullpath.split('/');
    setCurrent(('/' + result[1]));
  },[])

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