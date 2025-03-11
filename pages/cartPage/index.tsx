import React, { useState, useEffect } from "react";
import { getCart, removeFromCart, clearCart } from "../../ts/utils/api";
import { Link, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../ts/utils/auth";

const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<any[]>(getCart());

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (id: string) => {
    removeFromCart(id);
    setCart(getCart());
  };

  const handleCheckout = () => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    clearCart();
    navigate("/checkout-success");
  };

  if (cart.length === 0) {
    return <p className="text-center text-muted mt-5">Your cart is empty!</p>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Cart</h2>
      <div className="row">
        <div className="col-md-8">
          {cart.map((item) => (
            <div key={item.id} className="card mb-3 p-3 shadow-sm">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h5 className="font-weight-bold">{item.title} - {item.quantity}x</h5>
                  <p className="text-success">${(item.discountedPrice * item.quantity).toFixed(2)}</p>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => handleRemove(item.id)}>
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h4 className="text-center">$ Order Summary</h4>
            <ul className="list-group list-group-flush">
              {cart.map((item) => (
                <li key={item.id} className="list-group-item">
                  <strong>{item.title}</strong> - {item.quantity}x - <span className="text-success">${item.discountedPrice.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <h5 className="mt-3 text-primary text-center">
              Total: <span className="font-weight-bold">${cart.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0).toFixed(2)}</span>
            </h5>
            <button className="btn btn-success btn-block mt-3" onClick={handleCheckout}>
            Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
