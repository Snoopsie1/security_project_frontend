import React, { ReactNode } from 'react'
import Navbar from './Navbar';

const Layout = ({children}: {children: ReactNode})=> {
  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <Navbar />
        <div>
          {children}
        </div>
      </div>
    </>
  )
}

export default Layout;