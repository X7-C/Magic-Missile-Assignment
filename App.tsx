import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Homepage from "./pages/homePage/index";
import ProductPage from "./pages/productPage/index";
import CartPage from "./pages/cartPage/index";
import CheckoutSuccessPage from "./pages/checkoutSuccessPage/index";
import ContactPage from "./pages/contactPage/index";
import LoginPage from "./pages/loginPage/index";
import RegisterPage from "./pages/registerPage/index";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
