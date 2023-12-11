import { Route, Routes } from 'react-router-dom';
import './CSS/App.css';
import Header from './Components/Header';
import React, { Suspense } from 'react';
import { ProductDetails } from './Components/ProductDetails';

import { ProductProvider } from './Components/ProductContext';
import { CartProvider } from './Components/CartContext';

import Cart from './Components/Cart';
import Home from './Components/Home';
import EmployeeForm from './Components/EmployeeForm';
import { ErrorPage } from './Components/ErrorPage';

const LazyProduct = React.lazy(() => import('./Components/Product'));
function App() {
  return (
    <>
      <ProductProvider>
        <CartProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employee" element={<EmployeeForm />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route
              path="/product/*"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                  <Route path="" element={<LazyProduct />} />
                  </Routes>
                </Suspense>} />
            <Route path="/product/*" element={<LazyProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </CartProvider>
      </ProductProvider>
    </>
  );
}

export default App;