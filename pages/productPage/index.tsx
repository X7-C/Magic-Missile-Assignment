import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../../ts/utils/api";
import { isAuthenticated } from "../../ts/utils/auth";

interface Product {
  id: string;
  title: string;
  description: string;
  discountedPrice: number;
  price: number;
  image: { url: string; alt: string };
}

const ProductPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`https://v2.api.noroff.dev/online-shop/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data.data);
      })
      .catch(() => {});
  }, [id]);
  

  const handleAddToCart = () => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    
    if (product) {
      addToCart(product);
  
      const btn = document.getElementById("product-add-btn");
      if (btn) {
        btn.innerText = "Added!";
        setTimeout(() => (btn.innerText = "Add to Cart"), 1000);
      }
    }
  };
  

  if (!product) return <p className="text-center">Loading product...</p>;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <img 
            src={product.image.url} 
            alt={product.image.alt} 
            className="img-fluid rounded shadow-sm" 
          />
        </div>
        <div className="col-md-6">
          <h2 className="font-weight-bold">{product.title}</h2>
          <p>{product.description}</p>
          <p className="text-muted">Price: <del>${product.price.toFixed(2)}</del></p>
          <p className="text-success">Discounted Price: ${product.discountedPrice.toFixed(2)}</p>
  
          <button 
            id="product-add-btn" 
            className="btn btn-primary" 
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
  
};

export default ProductPage;
