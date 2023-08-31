import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Products from './pages/Products';
import Layout from './components/layout/Layout';
import Foo from './pages/Foo';
import Login from './pages/Login'; // Import your login component
import Register from './pages/Register'; // Import your register component
import './globals.css';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('jwt'); // Check for JWT in local storage

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {!isAuthenticated ? (
            // If user is not logged in, show login and register
            <>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          ) : (
            // If user is logged in, show products and orders
            <>
              <Route path="/products" element={<Products />} />
              <Route path="/purchases" element={<Foo />} /> {/* Skal skiftes til Orders component */}
            </>
          )}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
