import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Products from './pages/Products';
import Layout from './components/layout/Layout';
import Foo from './pages/Foo';
import Login from './pages/Login'; // Import your login component
import Register from './pages/Register'; // Import your register component
import './globals.css';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('jwt'); // Check for JWT in local storage

  const authed = () => {
    if (!isAuthenticated) return <Navigate to="/login" />;
    console.log(isAuthenticated);
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
            <Route path="/purchases" element={<Foo />} /> {/* Skal skiftes til Orders component */}
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
