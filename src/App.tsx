import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Layout from "./components/layout/Layout";
import Order from "./pages/Purchase";
import "./globals.css";
import Customers from "./pages/Customer";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/orders" element={<Order />} />{" "}
          <Route path="/customers" element={<Customers />} />{""}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
