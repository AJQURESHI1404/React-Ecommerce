import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
    items: [],
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const existingItemIndex = state.items.findIndex((item) => item.id === action.payload.id);

            if (existingItemIndex !== -1) {
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex].quantity += 1;
                return { items: updatedItems };
            } else {
                return {
                    items: [...state.items, { ...action.payload, quantity: 1 }],
                };
            }

        case 'REMOVE_FROM_CART':
            const updatedItems = state.items.filter((item) => item.id !== action.payload);
            return { items: updatedItems };

        case 'REMOVE_ALL_FROM_CART':
            return { items: [] };

        case 'INCREMENT_QUANTITY':
            const incrementedItems = state.items.map((item) =>
                item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
            );
            return { items: incrementedItems };

        case 'DECREMENT_QUANTITY':
            const decrementedItems = state.items.map((item) =>
                item.id === action.payload ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
            );
            return { items: decrementedItems };

        default:
            return state;
    }
};

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartState, dispatch] = useReducer(cartReducer, initialState);

    const addToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    const removeFromCart = (productId) => {
        dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    };

    const clearCart = () => {
        dispatch({ type: 'REMOVE_ALL_FROM_CART' });
    };

    return (
        <CartContext.Provider value={{ cartState, dispatch, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export { CartProvider, useCart };
