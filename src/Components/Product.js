import React, { useContext, useState } from 'react';
import { ProductContext } from './ProductContext';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import "../CSS/Product.css"

export default function Product() {
  const { addToCart } = useCart();
  const productContext = useContext(ProductContext);

  const [searchTerm, setSearchTerm] = useState('');

  if (!productContext) {
   
    return <p>Loading...</p>;
  }

  const { loading = true, error = null, data = null } = productContext;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  const filteredProducts = data.filter((item) =>
  item.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <input
          className='search-input'
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {filteredProducts.map((item, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100">
            <Link to={`/product/${item.id}`}>
              <img  className="text-center"src={item.images} alt={item.name} />
             
              </Link>
             
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">Rs.{item.price}</p>
                <p className="card-text">{item.rating}</p>
                <p className="card-text">{item.description}</p>
                <button className='btn btn-warning' onClick={() => addToCart(item)}>Add To Cart</button>
                <Link to={`/product/${item.id}`}>
                <button className='btn btn-success'>More Info</button>
                </Link>
              </div>
            </div>
          </div>
          
           
        ))}
        
      </div>
    </div>
    
  );
}