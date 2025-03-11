import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccessPage: React.FC = () => {
  return (
    <div className="container mt-5 text-center">
      <h2 className="text-success">Congratulations, Your Order is Confirmed!</h2>
      <p>Thank you for your purchase. Your order has been successfully placed.</p>
      <Link to="/" className="btn btn-primary mt-3">Back to Store</Link>
    </div>
  );
};

export default CheckoutSuccessPage;
