import { DownloadOutlined, GiftOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Menu, MenuProps } from 'antd';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const fullpath = window.location.pathname;
  const [current, setCurrent] = useState('/');

  const handleLogOut = () => {
    localStorage.removeItem('jwt');
  }

  const items: MenuProps['items'] = [
    {
      label: 'Products',
      key: '/products',
      icon: <GiftOutlined/>
    },
    {
      label: 'Purchases',
      key: '/purchases',
      icon: <DownloadOutlined/>
    }, 
    // TODO: Tilføj Users
    {
      label: (
        <Button icon={<LogoutOutlined/>} onClick={handleLogOut}/>
      ),
      key: '/',
    },
  ];

  useEffect(() => {
    const result = fullpath.split('/');
    setCurrent(('/' + result[1]));
  },[])

  const changePage: MenuProps['onClick'] = (e) => {
    console.log(e.key);
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