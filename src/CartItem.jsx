

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart); // cart is an array

  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => total + parseFloat(item.cost.substring(1)) * item.quantity, 0)
      .toFixed(2);
  };

  const calculateTotalCost = (item) => {
    return (parseFloat(item.cost.substring(1)) * item.quantity).toFixed(2);
  };

  const handleIncrement = (itemName) => {
    dispatch(updateQuantity({ name: itemName, increment: true }));
  };

  const handleDecrement = (itemName, quantity) => {
    if (quantity > 1) {
      dispatch(updateQuantity({ name: itemName, increment: false }));
    } else {
      dispatch(removeItem({ name: itemName }));
    }
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.length === 0 ? (
          <p style={{ color: 'black' }}>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost}</div>
                <div className="cart-item-quantity">
                  <button onClick={() => handleDecrement(item.name, item.quantity)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item.name)}>+</button>
                </div>
                <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
                <button onClick={() => dispatch(removeItem({ name: item.name }))}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
