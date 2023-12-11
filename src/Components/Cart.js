import React from 'react';
import { useCart } from './CartContext';

  const Cart = () => {
    const { cartState, removeFromCart, clearCart, dispatch } = useCart();
   

  const handleIncrement = (productId) => {
    dispatch({ type: 'INCREMENT_QUANTITY', payload: productId });
  };

  const handleDecrement = (productId) => {
    dispatch({ type: 'DECREMENT_QUANTITY', payload: productId });
  };

  const calculateTotal = () => {
    const total = cartState.items.reduce((acc, item) => {
      const itemPrice = parseFloat(item.price) || 0;
      const itemQuantity = item.quantity || 0;
      return acc + itemPrice * itemQuantity;
    }, 0);
    return total.toFixed(2);
  };

  return (
    <div>
      <h2>Your Cart</h2>
      <table className="table">
        <thead>
          {/* ... Your table header ... */}
        </thead>
        <tbody>
          {cartState.items.map((item) => (
            <tr key={item.id}>
              <td>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handleDecrement(item.id)}
                >
                  -
                </button>{' '}
                {item.quantity}{' '}
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handleIncrement(item.id)}
                >
                  +
                </button>
              </td>
      <td>{item.name}</td>
      <td>Rs.{item.price}</td>
      <td>{item.quantity}</td>
      <td>{(item.price * item.quantity)}</td>
      <td>
        <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>
          Remove
        </button>
      </td>
      </tr>
          ))}
          <tr>
            <td colSpan="4" align="right">
              Total:
            </td>
            <td colSpan="2" align="center">
              Rs.{calculateTotal()}
            </td>
          </tr>
        </tbody>
      </table>
      <button className="btn btn-danger" onClick={clearCart}>
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;