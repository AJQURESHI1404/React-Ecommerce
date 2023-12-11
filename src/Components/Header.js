import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../CSS/Navbar.css';
import Logo from '../Logo/logo.jpg'
import { useCart } from './CartContext';


export default function Header() {
  const { cartState } = useCart();
  const itemCount = cartState.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="container-fluid navbar gradient-custom">

      <Link to="/" className="navbar-brand">
        <div className='logo'>
        <img className=" logo"src={Logo} alt="Logo" size ="60px"/>
        </div>
        <h2>Shop-Cart</h2>
      </Link>

     
      <div className='links'>
        <ul className='nav-links text-decoration-none text-light'>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/employee">Employee</Link></li>
          <li><Link to="/product">Product</Link></li>
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      </div>
      <div>  <Link to="/cart" className="ml-auto">
        <FontAwesomeIcon icon={faShoppingCart} size="2x" color="black" />
        {itemCount > 0 && (
          <span className="badge badge-danger ml-1">{itemCount}</span>
        )}
      </Link>
      </div>

    </nav>
  );
}
