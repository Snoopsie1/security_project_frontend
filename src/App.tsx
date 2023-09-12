import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import Layout from "./components/layout/Layout";
import Order from "./pages/Purchase";
import Login from "./pages/Login"; // Import your login component
import Register from "./pages/Register"; // Import your register component
import Customers from "./pages/Customer";
import "./globals.css";
import { useState } from "react";
import useCustomerStore from "./store/customer.store";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("jwt")); // Check for JWT in local storage
  const customer = useCustomerStore((state) => state.customer);

  //Demo for at vise den finder og binder en customer
  console.log('customer: ', customer);

  const authed = () => {
    console.log("authenticated", isAuthenticated);
    if (!isAuthenticated) return <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/products" /> : <Register />}
          />
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/products" /> : <Login />}
          />
          <Route path="/" element={authed()}>
            <Route path="/" element={<Products/>}/>
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Order />} />
            <Route path="/customers" element={<Customers />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
