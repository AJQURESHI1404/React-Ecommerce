import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext } from './ProductContext';
import { useCart } from './CartContext';

export function ProductDetails() {
  const { id } = useParams();
  const { data } = useContext(ProductContext);
  const { addToCart } = useCart();

  if (!data) {
    return <p>Loading...</p>;
  }

  const product = data.find(item => item.id.toString() === id);

  if (!product) {
    return <p>Product not found</p>;
  }
 

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
        <img src={`${process.env.PUBLIC_URL}/${product.images}`} alt={product.name} />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>Price: Rs. {product.price}</p>
          <p>Rating: {product.rating}</p>
          <p>Description: {product.description}</p>
          <button className='btn btn-warning' onClick={() => addToCart(product)}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}
