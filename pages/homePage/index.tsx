import React, { useState, useEffect } from "react";
import { addToCart } from "../../ts/utils/api";
import { isAuthenticated } from "../../ts/utils/auth";
import { Link, useNavigate } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  description: string;
  discountedPrice: number;
  image: { url: string; alt: string };
}

const Homepage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://v2.api.noroff.dev/online-shop")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data);
      })
      .catch(() => {});
  }, []);
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    addToCart(product);

    const btn = document.getElementById(`add-${product.id}`);
    if (btn) {
      btn.innerText = "Added!";
      setTimeout(() => (btn.innerText = "Add to Cart"), 1000);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Welcome to the Store!</h1>
      <input
        type="text"
        placeholder="Search products..."
        className="form-control my-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
              <img
                src={product.image.url}
                alt={product.image.alt}
                className="card-img-top"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="text-success fw-bold">
                  ${product.discountedPrice.toFixed(2)}
                </p>
                <Link to={`/product/${product.id}`} className="btn btn-info mb-2">
                  View Product
                </Link>
                <button
                  id={`add-${product.id}`}
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
