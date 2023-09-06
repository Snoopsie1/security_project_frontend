import React, { ReactNode } from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem("jwt");

  return (
    <>
      <div className="h-screen w-full flex flex-col">
        {isAuthenticated && <Navbar />}
        <div className="h-full w-full flex justify-center mt-10">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
