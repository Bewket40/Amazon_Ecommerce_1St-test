import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/CategoryBlock.css';

function CategoryBlock({ title, image, category  }) {

  
  return (
    
    <div className="category-block">
      
      <h3>{title}</h3>
      <img src={image} alt={title} />
      <Link to={`/products?category=${encodeURIComponent(category)}`} className="shop-now-btn">
      Shop now
      
      </Link>
      
    </div>
    
  );
}
export default CategoryBlock

{/* <Link to="/products?category=electronics">Shop Electronics</Link> */}