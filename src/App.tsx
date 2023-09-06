import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Products from './pages/Products';
import Layout from './components/layout/Layout';
import Order from "./pages/Purchase";
import Login from './pages/Login'; // Import your login component
import Register from './pages/Register'; // Import your register component
import './globals.css';
import { useEffect, useState } from 'react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwt')); // Check for JWT in local storage

  useEffect(() => {

  }, [isAuthenticated]);

  const authed = () => {
    console.log('authenticated', isAuthenticated);
    if (!isAuthenticated) return <Navigate to="/login" />;
    return <Products />;
  };

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
        <Route path="/register" element={isAuthenticated ? <Navigate to="/" /> : <Register />}/>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/"/> : <Login />}/>
          <Route path="/" element={authed()}>
            <Route path="/products" element={<Products />} />
            <Route path="/orders" element={<Order />} /> {/* Skal skiftes til Orders component */}
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
