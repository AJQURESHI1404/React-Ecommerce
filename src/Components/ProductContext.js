// ProductContext.js
import React, { createContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { CartProvider } from './CartContext';

const initialState = {
  loading: true,
  error: null,
  data: null,
};

const URL=" http://localhost:4200/product";

const productReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    case 'FETCH_ERROR':
      return {
        loading: false,
        error: action.payload,
        data: null,
      };
    default:
      return state;
  }
};

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(URL);
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };

    fetchData();
  }, []);

  return (
    <ProductContext.Provider value={state}>
    <CartProvider>{children}</CartProvider>
  </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
