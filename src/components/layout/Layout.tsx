import React, { ReactNode } from 'react'
import Navbar from './Navbar';

const Layout = ({children}: {children: ReactNode})=> {
  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <Navbar />
        <div className='relative flex flex-grow'>
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout;