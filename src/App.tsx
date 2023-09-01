import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import Layout from "./components/layout/Layout";
import Order from "./pages/Purchase";
import "./globals.css";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/orders" element={<Order />} />{" "}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
